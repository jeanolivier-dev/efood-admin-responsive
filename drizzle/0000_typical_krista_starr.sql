CREATE TABLE IF NOT EXISTS "Users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar NOT NULL,
	"phone" text NOT NULL,
	"address" varchar NOT NULL,
	"image" varchar,
	"role" text DEFAULT 'client',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "Users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
