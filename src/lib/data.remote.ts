import { db } from "$lib/server/db"
import { processes, tasks, taskDependencies } from "$lib/server/db/schema"
import { command, form, query } from '$app/server';
import { z } from "zod"
import { error, fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";



export const getWorkflowById = query(z.string(), async (id: string) => {

  try {
    const [workflow] = await db.select().from(processes).where(eq(processes.id, id)).limit(1);
    const steps = await db.select().from(tasks).where(eq(tasks.processId, id));

    if (workflow) {
      return { ...workflow, steps }
    }

    return redirect(303, "/workflows/404")
  } catch {
    return redirect(303, "/workflows/404")
  }
})

export const deleteWorkflow = command(z.string(), async (id: string) => {
  const [workflow] = await db.select().from(processes).where(eq(processes.id, id)).limit(1)

  if (workflow) {
    await db.delete(processes).where(eq(processes.id, id))
  }

})

export const getWorkflows = query(async () => {
  return await db.select().from(processes)
})


const insertWorkflowSchema = z.object({
  name: z.string().nonempty(),
  description: z.string()
})

export const createNewWorkflow = form(insertWorkflowSchema, async ({ name, description }) => {
  const [workflow] = await db.insert(processes).values({ name, description }).returning({ id: processes.id })
  redirect(303, `/workflows/${workflow.id}`);
})

const insertStepSchema = z.object({
  workflowId: z.uuid(),
  name: z.string().nonempty(),
  description: z.string(),
  type: z.enum(['approval', 'document', 'task']),
  order: z.enum(['1', '2', '3']),
  dependsOn: z.array(z.uuid()).optional()
})

export const createStep = form(insertStepSchema, async (data) => {
  const { dependsOn, ...stepData } = data;
  const toWrite = { ...stepData, order: parseInt(stepData.order) }
  const [step] = await db.insert(tasks).values(toWrite).returning({ id: tasks.id })

  if (dependsOn && dependsOn.length > 0) {
    await db.insert(taskDependencies).values(
      dependsOn.map(dependsOnStepId => ({
        stepId: step.id,
        dependsOnStepId
      }))
    );
  }

  redirect(303, `/workflows/${data.workflowId}/steps/${step.id}`);
})


export const getSteps = query(z.string(), async (id: string) => {
  let steps = await db.select().from(tasks).where(eq(tasks.processId, id))
  return steps
})
