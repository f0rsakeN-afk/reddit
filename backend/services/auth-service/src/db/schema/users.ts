import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { passwordCredentials } from "./credentials";
import { emailVerificationTokens } from "./emailVerificationTokens";
import { passwordResetTokens } from "./passwordResetTokens";
import { securityEvents } from "./securityEvents";
import { sessions } from "./sessions";

export const userStatusEnum = pgEnum("user_status", [
  "ACTIVE",
  "SUSPENDED",
  "DELETED",
]);

export const roleEnum = pgEnum("role", ["USER", "MODERATOR", "ADMIN"]);

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  firstName: varchar({ length: 25 }).notNull(),
  lastName: varchar({ length: 25 }).notNull(),
  email: varchar({ length: 200 }).notNull().unique(),
  status: userStatusEnum("status").notNull().default("ACTIVE"),
  role: roleEnum("role").notNull().default("USER"),
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
  suspendedAt: timestamp("suspended_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  passwordCredentials: one(passwordCredentials, {
    fields: [users.id],
    references: [passwordCredentials.userId],
  }),
  sessions: many(sessions),
  passwordResetTokens: many(passwordResetTokens),
  emailVerificationTokens: many(emailVerificationTokens),
  securityEvents: many(securityEvents),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
