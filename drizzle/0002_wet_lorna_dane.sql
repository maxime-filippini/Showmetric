ALTER TABLE "workflow_runs" RENAME TO "process_runs";--> statement-breakpoint
ALTER TABLE "workflows" RENAME TO "processes";--> statement-breakpoint
ALTER TABLE "step_completions" RENAME TO "task_completions";--> statement-breakpoint
ALTER TABLE "step_dependencies" RENAME TO "task_dependencies";--> statement-breakpoint
ALTER TABLE "workflow_steps" RENAME TO "tasks";--> statement-breakpoint
ALTER TABLE "task_completions" RENAME COLUMN "step_id" TO "task_id";--> statement-breakpoint
ALTER TABLE "task_dependencies" RENAME COLUMN "step_id" TO "task_id";--> statement-breakpoint
ALTER TABLE "task_dependencies" RENAME COLUMN "depends_on_step_id" TO "depends_on_task_id";--> statement-breakpoint
ALTER TABLE "process_runs" RENAME COLUMN "workflow_id" TO "process_id";--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "workflow_id" TO "process_id";--> statement-breakpoint
ALTER TABLE "task_completions" DROP CONSTRAINT "step_completions_run_id_workflow_runs_id_fk";
--> statement-breakpoint
ALTER TABLE "task_completions" DROP CONSTRAINT "step_completions_step_id_workflow_steps_id_fk";
--> statement-breakpoint
ALTER TABLE "task_dependencies" DROP CONSTRAINT "step_dependencies_step_id_workflow_steps_id_fk";
--> statement-breakpoint
ALTER TABLE "task_dependencies" DROP CONSTRAINT "step_dependencies_depends_on_step_id_workflow_steps_id_fk";
--> statement-breakpoint
ALTER TABLE "process_runs" DROP CONSTRAINT "workflow_runs_workflow_id_workflows_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "workflow_steps_workflow_id_workflows_id_fk";
--> statement-breakpoint
ALTER TABLE "task_completions" ADD CONSTRAINT "task_completions_run_id_process_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."process_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_completions" ADD CONSTRAINT "task_completions_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_dependencies" ADD CONSTRAINT "task_dependencies_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_dependencies" ADD CONSTRAINT "task_dependencies_depends_on_task_id_tasks_id_fk" FOREIGN KEY ("depends_on_task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "process_runs" ADD CONSTRAINT "process_runs_process_id_processes_id_fk" FOREIGN KEY ("process_id") REFERENCES "public"."processes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_process_id_processes_id_fk" FOREIGN KEY ("process_id") REFERENCES "public"."processes"("id") ON DELETE cascade ON UPDATE no action;