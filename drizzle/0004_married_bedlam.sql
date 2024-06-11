ALTER TABLE "Tables" RENAME TO "Table";--> statement-breakpoint
ALTER TABLE "Table" DROP CONSTRAINT "Tables_table_id_unique";--> statement-breakpoint
ALTER TABLE "Order" DROP CONSTRAINT "Order_table_id_Tables_table_id_fk";
--> statement-breakpoint
ALTER TABLE "Table" DROP CONSTRAINT "Tables_user_id_Dishes_dishe_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_table_id_Table_table_id_fk" FOREIGN KEY ("table_id") REFERENCES "public"."Table"("table_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Table" ADD CONSTRAINT "Table_user_id_Dishes_dishe_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Dishes"("dishe_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Table" ADD CONSTRAINT "Table_table_id_unique" UNIQUE("table_id");