import { Router, type IRouter } from "express";
import { and, desc, eq, gte, lte, or, ilike, sql } from "drizzle-orm";
import { db, leadsTable, leadEventsTable, type Lead } from "@workspace/db";
import {
  AdminLoginBody,
  ListLeadsQueryParams,
  GetLeadParams,
  UpdateLeadParams,
  UpdateLeadBody,
  TestCrmWebhookBody,
} from "@workspace/api-zod";
import {
  ADMIN_COOKIE,
  cookieOptions,
  createSessionToken,
  getAdminPassword,
  verifySessionToken,
} from "../lib/session";
import { requireAdmin } from "../middlewares/requireAdmin";
import { rateLimit } from "../lib/rateLimit";
import { sendToCrm } from "../lib/notify";

const router: IRouter = Router();

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

router.post("/admin/login", loginLimiter, async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  if (parsed.data.password !== getAdminPassword()) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  res.cookie(ADMIN_COOKIE, createSessionToken(), cookieOptions());
  res.json({ authenticated: true });
});

router.post("/admin/logout", (_req, res): void => {
  res.clearCookie(ADMIN_COOKIE, { path: "/" });
  res.json({ ok: true });
});

router.get("/admin/me", (req, res): void => {
  const authenticated = verifySessionToken(req.cookies?.[ADMIN_COOKIE]);
  res.json({ authenticated });
});

router.get("/admin/stats", requireAdmin, async (_req, res): Promise<void> => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startOfWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [todayRow] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(leadsTable)
    .where(gte(leadsTable.createdAt, startOfDay));
  const [weekRow] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(leadsTable)
    .where(gte(leadsTable.createdAt, startOfWeek));
  const [totalRow] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(leadsTable);
  const [hotRow] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(leadsTable)
    .where(eq(leadsTable.status, "Hot / Call Now"));
  const [asapRow] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(leadsTable)
    .where(ilike(leadsTable.bestContactTime, "%asap%"));
  const [callsRow] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(leadEventsTable)
    .where(eq(leadEventsTable.eventType, "click_to_call"));
  const [textsRow] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(leadEventsTable)
    .where(eq(leadEventsTable.eventType, "click_to_text"));

  const breakdown = await db
    .select({
      status: leadsTable.status,
      count: sql<number>`count(*)::int`,
    })
    .from(leadsTable)
    .groupBy(leadsTable.status);

  res.json({
    leadsToday: todayRow?.c ?? 0,
    leadsThisWeek: weekRow?.c ?? 0,
    hotLeads: hotRow?.c ?? 0,
    asapCalls: asapRow?.c ?? 0,
    totalLeads: totalRow?.c ?? 0,
    callsClicked: callsRow?.c ?? 0,
    textsClicked: textsRow?.c ?? 0,
    statusBreakdown: breakdown.map((b) => ({ status: b.status, count: b.count })),
  });
});

function buildLeadFilters(q: {
  status?: string;
  state?: string;
  productInterest?: string;
  minScore?: number;
  fromDate?: string;
  toDate?: string;
  search?: string;
}) {
  const conditions = [];
  if (q.status) conditions.push(eq(leadsTable.status, q.status));
  if (q.state) conditions.push(eq(leadsTable.state, q.state.toUpperCase()));
  if (q.productInterest)
    conditions.push(eq(leadsTable.productInterest, q.productInterest));
  if (typeof q.minScore === "number")
    conditions.push(gte(leadsTable.leadScore, q.minScore));
  if (q.fromDate) {
    const from = new Date(q.fromDate);
    if (!Number.isNaN(from.getTime())) {
      conditions.push(gte(leadsTable.createdAt, from));
    }
  }
  if (q.toDate) {
    const to = new Date(q.toDate);
    if (!Number.isNaN(to.getTime())) {
      to.setHours(23, 59, 59, 999);
      conditions.push(lte(leadsTable.createdAt, to));
    }
  }
  if (q.search) {
    const term = `%${q.search}%`;
    const searchCond = or(
      ilike(leadsTable.firstName, term),
      ilike(leadsTable.lastName, term),
      ilike(leadsTable.phone, term),
      ilike(leadsTable.email, term),
    );
    if (searchCond) conditions.push(searchCond);
  }
  return conditions;
}

router.get("/admin/leads", requireAdmin, async (req, res): Promise<void> => {
  const parsed = ListLeadsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const conditions = buildLeadFilters(parsed.data);
  const rows = await db
    .select()
    .from(leadsTable)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(leadsTable.createdAt))
    .limit(500);
  res.json(rows);
});

router.get("/admin/export", requireAdmin, async (req, res): Promise<void> => {
  const parsed = ListLeadsQueryParams.safeParse(req.query);
  const conditions = parsed.success ? buildLeadFilters(parsed.data) : [];
  const rows = await db
    .select()
    .from(leadsTable)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(leadsTable.createdAt));

  const columns: (keyof Lead)[] = [
    "id",
    "createdAt",
    "firstName",
    "lastName",
    "phone",
    "email",
    "state",
    "zip",
    "ageRange",
    "veteranStatus",
    "branch",
    "primaryGoal",
    "beneficiaryType",
    "reasonForInterest",
    "productInterest",
    "desiredCoverageRange",
    "existingCoverage",
    "wantsPolicyReview",
    "contactPreference",
    "bestContactTime",
    "tobaccoStatus",
    "generalHealthRange",
    "comfortWithCall",
    "consentContact",
    "consentTimestamp",
    "leadScore",
    "status",
    "leadQuality",
    "outcome",
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmContent",
    "utmTerm",
    "gclid",
    "gbraid",
    "wbraid",
    "fbclid",
    "msclkid",
    "landingPage",
    "referrer",
  ];

  const escape = (val: unknown): string => {
    if (val === null || val === undefined) return "";
    const s = val instanceof Date ? val.toISOString() : String(val);
    return `"${s.replace(/"/g, '""')}"`;
  };

  const header = columns.join(",");
  const lines = rows.map((row) =>
    columns.map((c) => escape(row[c])).join(","),
  );
  const csv = [header, ...lines].join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="honor-first-life-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
  );
  res.send(csv);
});

router.get("/admin/leads/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = GetLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [lead] = await db
    .select()
    .from(leadsTable)
    .where(eq(leadsTable.id, params.data.id));
  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  const events = await db
    .select()
    .from(leadEventsTable)
    .where(eq(leadEventsTable.leadId, lead.id))
    .orderBy(desc(leadEventsTable.createdAt));
  res.json({ lead, events });
});

router.patch("/admin/leads/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const updates: Record<string, unknown> = {};
  if (parsed.data.status !== undefined) updates.status = parsed.data.status;
  if (parsed.data.adminNotes !== undefined)
    updates.adminNotes = parsed.data.adminNotes;
  if (parsed.data.leadQuality !== undefined)
    updates.leadQuality = parsed.data.leadQuality;
  if (parsed.data.outcome !== undefined) updates.outcome = parsed.data.outcome;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No fields to update." });
    return;
  }

  const [lead] = await db
    .update(leadsTable)
    .set(updates)
    .where(eq(leadsTable.id, params.data.id))
    .returning();
  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  await db.insert(leadEventsTable).values({
    leadId: lead.id,
    eventType: "admin_update",
    eventData: JSON.stringify(updates),
  });
  res.json(lead);
});

router.delete("/admin/leads/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = GetLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(leadEventsTable).where(eq(leadEventsTable.leadId, params.data.id));
  const [deleted] = await db
    .delete(leadsTable)
    .where(eq(leadsTable.id, params.data.id))
    .returning();
  if (!deleted) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  res.json({ ok: true });
});

router.post(
  "/admin/webhooks/crm-test",
  requireAdmin,
  async (req, res): Promise<void> => {
    const parsed = TestCrmWebhookBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }
    const result = await sendToCrm(parsed.data.webhookUrl, {
      test: true,
      source: "Honor First Life",
      sentAt: new Date().toISOString(),
    });
    res.json({
      ok: result.ok,
      statusCode: result.statusCode,
      message: result.message,
    });
  },
);

export default router;
