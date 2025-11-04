CREATE TABLE "step_dependencies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"step_id" uuid NOT NULL,
	"depends_on_step_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "step_dependencies" ADD CONSTRAINT "step_dependencies_step_id_workflow_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."workflow_steps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "step_dependencies" ADD CONSTRAINT "step_dependencies_depends_on_step_id_workflow_steps_id_fk" FOREIGN KEY ("depends_on_step_id") REFERENCES "public"."workflow_steps"("id") ON DELETE cascade ON UPDATE no action;