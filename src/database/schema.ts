import {
  pgTable,
  boolean,
  varchar,
  text,
  timestamp,
  integer,
  uuid,
} from "drizzle-orm/pg-core";

export const Users = pgTable("Users", {
  user_id: uuid("user_id").primaryKey().unique().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password").notNull(),
  phone: text("phone").notNull(),
  address: varchar("address").notNull(),
  image: varchar("image"),
  role: text("role").$type<"admin" | "client">().default("client"),
  is_active: boolean("is_active").default(true),
  has_accepted: boolean("has_accepted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
export type UserType = typeof Users.$inferSelect;

export const Menu = pgTable("Menu", {
  menu_id: uuid("menu_id").primaryKey().unique().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }).notNull(),
  image: varchar("image"),
  user_id: uuid("user_id")
    .notNull()
    .references(() => Users.user_id),
  created_at: timestamp("created_at").defaultNow(),
});

export type MenuType = typeof Menu.$inferSelect;

export const Dishes = pgTable("Dishes", {
  dishe_id: uuid("dishe_id").primaryKey().unique().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }).notNull(),
  price: integer("price").notNull(),
  is_active: boolean("is_active").default(true),
  image: varchar("image"),
  menu_id: uuid("menu_id")
    .notNull()
    .references(() => Menu.menu_id),
  created_at: timestamp("created_at").defaultNow(),
});

export type DisheType = typeof Dishes.$inferSelect;

export const Tables = pgTable("Tables", {
  table_id: uuid("table_id").primaryKey().unique().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  qr_code: varchar("qr_code"),
  user_id: uuid("user_id")
    .notNull()
    .references(() => Dishes.dishe_id),
  created_at: timestamp("created_at").defaultNow(),
});

export type TablesType = typeof Tables.$inferSelect;

export const Orders = pgTable("Orders", {
  order_id: uuid("order_id").primaryKey().unique().notNull(),
  status: varchar("status").notNull(),
  table_id: uuid("table_id")
    .notNull()
    .references(() => Tables.table_id),
  dishes_id: uuid("dishes_id")
    .notNull()
    .references(() => Dishes.dishe_id),
  amount: integer("amount").notNull(),
});

export type OrderType = typeof Orders.$inferSelect;
