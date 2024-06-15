ALTER TABLE "Order" RENAME TO "Orders";--> statement-breakpoint
ALTER TABLE "Orders" DROP CONSTRAINT "Order_order_id_unique";--> statement-breakpoint
ALTER TABLE "Orders" DROP CONSTRAINT "Order_table_id_Tables_table_id_fk";
--> statement-breakpoint
ALTER TABLE "Orders" DROP CONSTRAINT "Order_dishes_id_Dishes_dishe_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Orders" ADD CONSTRAINT "Orders_table_id_Tables_table_id_fk" FOREIGN KEY ("table_id") REFERENCES "public"."Tables"("table_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Orders" ADD CONSTRAINT "Orders_dishes_id_Dishes_dishe_id_fk" FOREIGN KEY ("dishes_id") REFERENCES "public"."Dishes"("dishe_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_order_id_unique" UNIQUE("order_id");