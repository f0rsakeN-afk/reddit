import { varchar } from "drizzle-orm/cockroach-core";
import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

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
