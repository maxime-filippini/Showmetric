// schema.ts
import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const workflows = pgTable('workflows', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const workflowSteps = pgTable('workflow_steps', {
  id: uuid('id').defaultRandom().primaryKey(),
  workflowId: uuid('workflow_id').references(() => workflows.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type', { enum: ['approval', 'document', 'task'] }).notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const workflowRuns = pgTable('workflow_runs', {
  id: uuid('id').defaultRandom().primaryKey(),
  workflowId: uuid('workflow_id').references(() => workflows.id).notNull(),
  status: text('status', { enum: ['in_progress', 'completed', 'cancelled'] }).notNull().default('in_progress'),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export const stepDependencies = pgTable('step_dependencies', {
  id: uuid('id').defaultRandom().primaryKey(),
  stepId: uuid('step_id').references(() => workflowSteps.id, { onDelete: 'cascade' }).notNull(),
  dependsOnStepId: uuid('depends_on_step_id').references(() => workflowSteps.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const stepCompletions = pgTable('step_completions', {
  id: uuid('id').defaultRandom().primaryKey(),
  runId: uuid('run_id').references(() => workflowRuns.id, { onDelete: 'cascade' }).notNull(),
  stepId: uuid('step_id').references(() => workflowSteps.id).notNull(),
  completedBy: text('completed_by'), // For now just a string, add users table later
  status: text('status', { enum: ['pending', 'completed'] }).notNull().default('pending'),
  notes: text('notes'),
  completedAt: timestamp('completed_at'),
});
