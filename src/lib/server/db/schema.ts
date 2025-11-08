// schema.ts
import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const processes = pgTable('processes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  processId: uuid('process_id').references(() => processes.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type', { enum: ['approval', 'document', 'task'] }).notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const processRuns = pgTable('process_runs', {
  id: uuid('id').defaultRandom().primaryKey(),
  processId: uuid('process_id').references(() => processes.id).notNull(),
  status: text('status', { enum: ['in_progress', 'completed', 'cancelled'] }).notNull().default('in_progress'),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export const taskDependencies = pgTable('task_dependencies', {
  id: uuid('id').defaultRandom().primaryKey(),
  taskId: uuid('task_id').references(() => tasks.id, { onDelete: 'cascade' }).notNull(),
  dependsOnTaskId: uuid('depends_on_task_id').references(() => tasks.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const taskCompletions = pgTable('task_completions', {
  id: uuid('id').defaultRandom().primaryKey(),
  runId: uuid('run_id').references(() => processRuns.id, { onDelete: 'cascade' }).notNull(),
  taskId: uuid('task_id').references(() => tasks.id).notNull(),
  completedBy: text('completed_by'), // For now just a string, add users table later
  status: text('status', { enum: ['pending', 'completed'] }).notNull().default('pending'),
  notes: text('notes'),
  completedAt: timestamp('completed_at'),
});
