import express from "express";
import { config } from "./config/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const app = express();
const PORT = config.PORT;

const pool = new Pool({
  connectionString: config.DATABASE_URL!,
});

const db = drizzle({ client: pool });

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

    /* close db connections */
    //await prisma.$disconnect();

    /* close redis */
    //await redis.quit();

    /* kill workers */
    //await worker.close()

    console.log("Everything shut down.");
    process.exit(0);
  });

  //a timer can keep the node event loop alive
  // so here unref tells not to keep entire process alive just because
  // this timer exists
  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10_000).unref();
};

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
