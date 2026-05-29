import { Router, type IRouter } from "express";
import { eq, gte } from "drizzle-orm";
import { db, leadsTable, leadEventsTable, settingsTable } from "@workspace/db";
import { CreateLeadBody, TrackEventBody } from "@workspace/api-zod";
import { computeLeadScore, isHotLead } from "../lib/leadScore";
import { notifyJesse, sendToCrm } from "../lib/notify";
import { rateLimit } from "../lib/rateLimit";

const router: IRouter = Router();

const leadLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 15 });

router.post("/leads", leadLimiter, async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const body = parsed.data;

  // Honeypot: silently accept but discard bot submissions.
  if (body.company && body.company.trim() !== "") {
    res.status(201).json({ id: 0, ok: true, leadScore: 0 });
    return;
  }

  // Consent is mandatory — never persist a lead without explicit opt-in.
  if (body.consentContact !== true) {
    res.status(400).json({ error: "Consent to be contacted is required." });
    return;
  }

  const ipAddress =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    null;
  const userAgent = req.headers["user-agent"] ?? null;

  // Duplicate detection: same phone or email within last 24h.
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recent = await db
    .select({ id: leadsTable.id, phone: leadsTable.phone, email: leadsTable.email })
    .from(leadsTable)
    .where(gte(leadsTable.createdAt, since));
  const normalizedPhone = body.phone.replace(/\D/g, "");
  const dupe = recent.find(
    (r) =>
      r.phone.replace(/\D/g, "") === normalizedPhone ||
      (body.email && r.email && r.email.toLowerCase() === body.email.toLowerCase()),
  );

  const leadScore = computeLeadScore(body);
  const hot = isHotLead(leadScore, body);

  const [lead] = await db
    .insert(leadsTable)
    .values({
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email ?? null,
      state: body.state,
      zip: body.zip ?? null,
      ageRange: body.ageRange ?? null,
      veteranStatus: body.veteranStatus ?? null,
      branch: body.branch ?? null,
      primaryGoal: body.primaryGoal ?? null,
      beneficiaryType: body.beneficiaryType ?? null,
      reasonForInterest: body.reasonForInterest ?? null,
      productInterest: body.productInterest ?? null,
      desiredCoverageRange: body.desiredCoverageRange ?? null,
      existingCoverage: body.existingCoverage ?? null,
      wantsPolicyReview: body.wantsPolicyReview ?? null,
      contactPreference: body.contactPreference ?? null,
      bestContactTime: body.bestContactTime ?? null,
      tobaccoStatus: body.tobaccoStatus ?? null,
      generalHealthRange: body.generalHealthRange ?? null,
      comfortWithCall: body.comfortWithCall ?? null,
      consentContact: body.consentContact,
      consentText: body.consentText ?? null,
      consentTimestamp: body.consentContact ? new Date() : null,
      ipAddress,
      userAgent,
      landingPage: body.landingPage ?? null,
      referrer: body.referrer ?? null,
      deviceType: body.deviceType ?? null,
      utmSource: body.utmSource ?? null,
      utmMedium: body.utmMedium ?? null,
      utmCampaign: body.utmCampaign ?? null,
      utmContent: body.utmContent ?? null,
      utmTerm: body.utmTerm ?? null,
      gclid: body.gclid ?? null,
      gbraid: body.gbraid ?? null,
      wbraid: body.wbraid ?? null,
      fbclid: body.fbclid ?? null,
      msclkid: body.msclkid ?? null,
      leadScore,
      status: hot ? "Hot / Call Now" : "New",
    })
    .returning();

  await db.insert(leadEventsTable).values({
    leadId: lead.id,
    eventType: "lead_created",
    eventData: dupe ? `possible_duplicate_of:${dupe.id}` : null,
  });

  // Fire-and-forget notification.
  notifyJesse(lead)
    .then(async (result) => {
      await db
        .update(leadsTable)
        .set({
          notificationSent: result.sent,
          notificationError: result.error ?? null,
        })
        .where(eq(leadsTable.id, lead.id));
    })
    .catch((err) => req.log.error({ err }, "Notification failed"));

  // Optional CRM webhook.
  const [crmSetting] = await db
    .select()
    .from(settingsTable)
    .where(eq(settingsTable.key, "crm_webhook_url"));
  if (crmSetting?.value) {
    sendToCrm(crmSetting.value, lead)
      .then(async (result) => {
        await db
          .update(leadsTable)
          .set({
            crmSyncStatus: result.ok ? "synced" : "failed",
            crmSyncError: result.ok ? null : result.message,
          })
          .where(eq(leadsTable.id, lead.id));
      })
      .catch((err) => req.log.error({ err }, "CRM sync failed"));
  }

  res.status(201).json({ id: lead.id, ok: true, leadScore });
});

router.post("/events", async (req, res): Promise<void> => {
  const parsed = TrackEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  await db.insert(leadEventsTable).values({
    leadId: parsed.data.leadId ?? null,
    eventType: parsed.data.eventType,
    eventData: parsed.data.eventData ?? null,
  });
  res.status(201).json({ ok: true });
});

export default router;
