ALTER TABLE "Tables" DROP CONSTRAINT "Tables_user_id_Dishes_dishe_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tables" ADD CONSTRAINT "Tables_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
