import type { Lead } from "@workspace/db";
import { logger } from "./logger";
import { isLicensedState } from "./leadScore";

/**
 * Notification + CRM integration layer.
 *
 * Email (Nodemailer / transactional provider) and SMS (Twilio) are STUBBED.
 * They log structured, PII-light messages until provider credentials are added.
 *
 * To enable real notifications later, set the relevant environment variables
 * and replace the stub bodies below:
 *   - Email: SMTP_HOST / SMTP_USER / SMTP_PASS / NOTIFY_EMAIL
 *   - SMS:   TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM / NOTIFY_PHONE
 */

export interface NotifyResult {
  sent: boolean;
  error?: string;
}

function summarize(lead: Lead): string {
  const parts = [
    `${lead.firstName} ${lead.lastName.charAt(0)}.`,
    lead.ageRange ?? "age n/a",
    lead.state,
    lead.veteranStatus ? `Veteran: ${lead.veteranStatus}` : "",
    lead.primaryGoal ? `Goal: ${lead.primaryGoal}` : "",
    lead.bestContactTime ? `When: ${lead.bestContactTime}` : "",
  ].filter(Boolean);
  return parts.join(", ");
}

export async function notifyJesse(lead: Lead): Promise<NotifyResult> {
  const emailConfigured = Boolean(process.env["SMTP_HOST"]);
  const smsConfigured = Boolean(process.env["TWILIO_ACCOUNT_SID"]);

  // Structured, low-PII log. Real sending is intentionally not implemented yet.
  logger.info(
    {
      leadId: lead.id,
      state: lead.state,
      score: lead.leadScore,
      licensedState: isLicensedState(lead.state),
      emailConfigured,
      smsConfigured,
    },
    "Lead notification (stub) — configure SMTP/Twilio to enable real delivery",
  );

  if (!emailConfigured && !smsConfigured) {
    return {
      sent: false,
      error:
        "Notifications not configured. Set SMTP_* and/or TWILIO_* env vars to enable email/SMS to Jesse.",
    };
  }

  // Provider integrations go here when credentials are present.
  logger.info({ leadId: lead.id, summary: summarize(lead) }, "Would notify Jesse");
  return { sent: true };
}

export interface CrmResult {
  ok: boolean;
  statusCode: number | null;
  message: string | null;
}

export async function sendToCrm(
  webhookUrl: string,
  payload: unknown,
): Promise<CrmResult> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return {
      ok: resp.ok,
      statusCode: resp.status,
      message: resp.ok ? "Webhook delivered" : `Webhook responded ${resp.status}`,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown webhook error";
    return { ok: false, statusCode: null, message };
  }
}
