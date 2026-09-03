import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { emailVerificationTokens } from "./emailVerificationTokens";
import { passwordCredentials } from "./credentials";
import { passwordResetTokens } from "./passwordResetTokens";
import { refreshTokens } from "./refreshTokens";
import { securityEvents } from "./securityEvents";
import { sessions } from "./sessions";
import { users } from "./users";

export const insertUserSchema = createInsertSchema(users, {
  firstName: (s) => s.min(1).max(25),
  lastName: (s) => s.min(1).max(25),
  email: (s) => s.email().max(200),
});
export const selectUserSchema = createSelectSchema(users);

export const insertPasswordCredentialSchema = createInsertSchema(
  passwordCredentials,
  {
    passwordHash: (s) => s.min(1),
  },
);
export const selectPasswordCredentialSchema =
  createSelectSchema(passwordCredentials);

export const insertSessionSchema = createInsertSchema(sessions, {
  userAgent: (s) => s.max(1024).optional(),
  ipAddress: (s) => s.max(45).optional(),
});
export const selectSessionSchema = createSelectSchema(sessions);

export const insertRefreshTokenSchema = createInsertSchema(refreshTokens, {
  tokenHash: (s) => s.length(64),
});
export const selectRefreshTokenSchema = createSelectSchema(refreshTokens);

export const insertPasswordResetTokenSchema = createInsertSchema(
  passwordResetTokens,
  {
    tokenHash: (s) => s.length(64),
  },
);
export const selectPasswordResetTokenSchema =
  createSelectSchema(passwordResetTokens);

export const insertEmailVerificationTokenSchema = createInsertSchema(
  emailVerificationTokens,
  {
    tokenHash: (s) => s.length(64),
  },
);
export const selectEmailVerificationTokenSchema =
  createSelectSchema(emailVerificationTokens);

export const insertSecurityEventSchema = createInsertSchema(securityEvents, {
  userAgent: (s) => s.max(1024).optional(),
  ipAddress: (s) => s.max(45).optional(),
});
export const selectSecurityEventSchema = createSelectSchema(securityEvents);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type SelectSession = z.infer<typeof selectSessionSchema>;
export type InsertRefreshToken = z.infer<typeof insertRefreshTokenSchema>;
export type SelectRefreshToken = z.infer<typeof selectRefreshTokenSchema>;
