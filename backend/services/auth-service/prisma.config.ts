import { config } from "./src/config/env";
import { definePrismaConfig } from "@prisma/cli-engine";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/db/prisma/contract.prisma",
    db: {
      connection: config.DATABASE_URL,
    },
  }),
});
