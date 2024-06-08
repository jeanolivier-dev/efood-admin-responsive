import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, connection } from "./dbConnection";

async function main() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  await connection.end();
  return;
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
