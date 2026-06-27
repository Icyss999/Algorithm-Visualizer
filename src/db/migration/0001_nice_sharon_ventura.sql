CREATE TYPE "public"."template_type" AS ENUM('bars', 'array', 'grid', 'graph', 'tree');--> statement-breakpoint
CREATE TABLE "algorithm" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"name" text NOT NULL,
	"template" "template_type" NOT NULL,
	"timeComplexity" text NOT NULL,
	"spaceComplexity" text NOT NULL,
	"code" text NOT NULL,
	"explanation" text NOT NULL,
	"steps" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "algorithm" ADD CONSTRAINT "algorithm_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;