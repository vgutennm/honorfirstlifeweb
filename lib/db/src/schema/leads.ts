import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),

  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  state: text("state").notNull(),
  zip: text("zip"),

  ageRange: text("age_range"),
  veteranStatus: text("veteran_status"),
  branch: text("branch"),
  primaryGoal: text("primary_goal"),
  beneficiaryType: text("beneficiary_type"),
  reasonForInterest: text("reason_for_interest"),
  productInterest: text("product_interest"),
  desiredCoverageRange: text("desired_coverage_range"),
  existingCoverage: text("existing_coverage"),
  wantsPolicyReview: text("wants_policy_review"),
  contactPreference: text("contact_preference"),
  bestContactTime: text("best_contact_time"),
  tobaccoStatus: text("tobacco_status"),
  generalHealthRange: text("general_health_range"),
  comfortWithCall: text("comfort_with_call"),

  consentContact: boolean("consent_contact").notNull().default(false),
  consentText: text("consent_text"),
  consentTimestamp: timestamp("consent_timestamp", { withTimezone: true }),

  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  landingPage: text("landing_page"),
  referrer: text("referrer"),
  deviceType: text("device_type"),

  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  gclid: text("gclid"),
  gbraid: text("gbraid"),
  wbraid: text("wbraid"),
  fbclid: text("fbclid"),
  msclkid: text("msclkid"),

  leadScore: integer("lead_score").notNull().default(0),
  status: text("status").notNull().default("New"),
  adminNotes: text("admin_notes"),
  leadQuality: text("lead_quality"),
  outcome: text("outcome"),

  crmSyncStatus: text("crm_sync_status"),
  crmSyncError: text("crm_sync_error"),
  notificationSent: boolean("notification_sent").notNull().default(false),
  notificationError: text("notification_error"),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
