import { defineConfig } from "drizzle-kit";
import "dotenv/config";

if (!process.env.NEXT_PUBLIC_DATABASE_URI)
  throw new Error("DATABASE_URL is not set");

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // "postgresql" | "mysql"
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URI,
  },
});
