import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../config/env";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });
export { pool };
