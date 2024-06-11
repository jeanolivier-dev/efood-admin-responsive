CREATE TABLE IF NOT EXISTS "Dishes" (
	"dishe_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(512) NOT NULL,
	"price" integer NOT NULL,
	"is_active" boolean DEFAULT true,
	"image" varchar,
	"menu_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "Dishes_dishe_id_unique" UNIQUE("dishe_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Menu" (
	"menu_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(512) NOT NULL,
	"image" varchar,
	"user_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "Menu_menu_id_unique" UNIQUE("menu_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Order" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"status" varchar NOT NULL,
	"table_id" serial NOT NULL,
	"dishes_id" serial NOT NULL,
	"amount" integer NOT NULL,
	CONSTRAINT "Order_order_id_unique" UNIQUE("order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tables" (
	"table_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"qr_code" varchar,
	"user_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "Tables_table_id_unique" UNIQUE("table_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Dishes" ADD CONSTRAINT "Dishes_menu_id_Menu_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."Menu"("menu_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Menu" ADD CONSTRAINT "Menu_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_table_id_Tables_table_id_fk" FOREIGN KEY ("table_id") REFERENCES "public"."Tables"("table_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_dishes_id_Dishes_dishe_id_fk" FOREIGN KEY ("dishes_id") REFERENCES "public"."Dishes"("dishe_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tables" ADD CONSTRAINT "Tables_user_id_Dishes_dishe_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Dishes"("dishe_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;