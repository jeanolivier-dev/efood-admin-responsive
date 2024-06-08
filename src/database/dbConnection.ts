import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const CONNECTION_STRING = process.env.NEXT_PUBLIC_DATABASE_URI ?? "";

export const connection = new Pool({
  connectionString: CONNECTION_STRING,
});
export const db = drizzle(connection, { schema });
