import pino from "pino";

type LoggerOptions = {
  serviceName: string;
  environment: "development" | "test" | "production";
  level?: pino.Level;
};

export function createLogger(options: LoggerOptions) {
  const isProduction = options.environment === "production";

  return pino({
    level: options.level ?? (isProduction ? "info" : "debug"),

    base: {
      service: options.serviceName,
      environment: options.environment,
    },

    redact: {
      paths: [
        "password",
        "token",
        "accessToken",
        "refreshToken",
        "authorization",
        "cookie",
        "clientSecret",
      ],
      censor: "[REDACTED]",
    },

    transport: isProduction
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        },
  });
}
