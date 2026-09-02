import { SignJWT, jwtVerify } from "jose";
import { config } from "../../config/env";

const secret = new TextEncoder().encode(config.ACCESS_TOKEN_SECRET);

export type AccessTokenPayload = { sub: string; sessionId: String };

export async function createAccessToken(
  payload: AccessTokenPayload,
): Promise<string> {
  return new SignJWT({ sessionId: payload.sessionId })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(config.ACCESS_TOKEN_EXPIRES_IN)
    .sign(secret);
}

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });

  if (!payload.sub || typeof payload.sub !== "string") {
    throw new Error("Invalid access token subject");
  }

  if (!payload.sessionId || typeof payload.sessionId !== "string") {
    throw new Error("Invalid access token session");
  }

  return {
    sub: payload.sub,
    sessionId: payload.sessionId,
  };
}
