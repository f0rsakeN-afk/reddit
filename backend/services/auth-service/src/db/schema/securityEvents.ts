import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  uuid,
  timestamp,
  jsonb,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const securityEventTypeEnum = pgEnum("security_event_type", [
  "LOGIN_SUCCESS",
  "LOGIN_FAILED",
  "LOGOUT",
  "LOGOUT_ALL",
  "TOKEN_REFRESH",
  "TOKEN_REUSE_DETECTED",
  "PASSWORD_CHANGED",
  "PASSWORD_RESET_REQUESTED",
  "PASSWORD_RESET_COMPLETED",
  "EMAIL_VERIFICATION_REQUESTED",
  "EMAIL_VERIFIED",
  "SESSION_REVOKED",
]);

export const securityEvents = pgTable(
  "security_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id").references(() => users.id, {
      onDelete: "set null",
    }),

    type: securityEventTypeEnum("type").notNull(),

    ipAddress: varchar("ip_address", {
      length: 45,
    }),

    userAgent: varchar("user_agent", {
      length: 1024,
    }),

    metadata: jsonb("metadata"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },

  (table) => [
    index("security_events_user_id_idx").on(table.userId),

    index("security_events_type_idx").on(table.type),

    index("security_events_created_at_idx").on(table.createdAt),
  ],
);

export const securityEventsRelations = relations(securityEvents, ({ one }) => ({
  user: one(users, {
    fields: [securityEvents.userId],
    references: [users.id],
  }),
}));

export type SecurityEvent = typeof securityEvents.$inferSelect;
export type NewSecurityEvent = typeof securityEvents.$inferInsert;
