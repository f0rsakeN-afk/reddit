import express from "express";
import { config } from "./config/env";
import { pool } from "./db";

const app = express();
const PORT = config.PORT;

app.get("/health", (req, res) => {
  res.send("ok");
});

const server = app.listen(PORT, () => {
  console.log(`${config.SERVICE_NAME} listening on port ${PORT}...`);
});

const shutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    console.log("HTTP server closed.");

    await pool.end();
    console.log("Database connections closed.");

    console.log("Everything shut down.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10_000).unref();
};

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
