import { randomUUID } from "node:crypto";
import {
  createAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiry,
  hashToken,
} from "../lib/tokens";

class TokenService {}

export const tokenService = new TokenService();
