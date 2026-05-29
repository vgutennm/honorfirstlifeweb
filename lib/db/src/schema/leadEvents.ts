import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadEventsTable = pgTable("lead_events", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id"),
  eventType: text("event_type").notNull(),
  eventData: text("event_data"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertLeadEventSchema = createInsertSchema(leadEventsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertLeadEvent = z.infer<typeof insertLeadEventSchema>;
export type LeadEvent = typeof leadEventsTable.$inferSelect;
