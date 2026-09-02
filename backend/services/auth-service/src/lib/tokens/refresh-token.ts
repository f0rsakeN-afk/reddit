import { randomBytes } from "node:crypto";
import { config } from "../../config/env";

export function generateRefreshToken(): string {
  return randomBytes(64).toString("base64url");
}

export function getRefreshTokenExpiry(): Date {
  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + config.REFRESH_TOKEN_EXPIRES_IN);

  return expiresAt;
}
