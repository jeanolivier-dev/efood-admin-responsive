import {
  serial,
  pgTable,
  boolean,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const Users = pgTable("Users", {
  user_id: serial("user_id").primaryKey().unique().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password").notNull(),
  phone: text("phone").notNull(),
  address: varchar("address").notNull(),
  image: varchar("image"),
  role: text("role").$type<"admin" | "client">().default("client"),
  is_active: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});
export type UserType = typeof Users.$inferSelect;
