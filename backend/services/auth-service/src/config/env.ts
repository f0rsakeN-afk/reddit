import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  SERVICE_NAME: z.string().min(1).default("auth-service"),

  PORT: z.coerce.number().int().positive().default(5001),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  REDIS_URL: z.string().min(1, "REDIS_URL is required"),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),

  ACCESS_TOKEN_SECRET: z
    .string()
    .min(32, "ACCESS_TOKEN_SECRET must be at least 32 characters."),

  ACCESS_TOKEN_EXPIRES_IN: z.string().default("15m"),

  REFRESH_TOKEN_EXPIRES_IN: z.coerce.number().int().positive().default(30),
});

const parsedENV = envSchema.safeParse(process.env);

if (!parsedENV.success) {
  console.error("Invalid environment variables:");

  console.error(z.prettifyError(parsedENV.error));

  process.exit(1);
}

export const config = parsedENV.data;
