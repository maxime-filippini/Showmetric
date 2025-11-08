import { db } from "$lib/server/db"
import { processes, tasks, taskDependencies } from "$lib/server/db/schema"
import { command, form, query } from '$app/server';
import { z } from "zod"
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";



export const getProcessById = query(z.string(), async (id: string) => {
  try {
    const [process] = await db.select().from(processes).where(eq(processes.id, id)).limit(1);
    const tasks_ = await db.select().from(tasks).where(eq(tasks.processId, id));

    if (process) {
      return { ...process, tasks: tasks_ }
    }

    return redirect(303, "/processes/404")
  } catch {
    return redirect(303, "/processes/404")
  }
})

export const deleteProcess = command(z.string(), async (id: string) => {
  const [process] = await db.select().from(processes).where(eq(processes.id, id)).limit(1)

  if (process) {
    await db.delete(processes).where(eq(processes.id, id))
  }

})

export const getProcesses = query(async () => {
  return await db.select().from(processes)
})


const insertProcessSchema = z.object({
  name: z.string().nonempty(),
  description: z.string()
})

export const createNewProcess = form(insertProcessSchema, async ({ name, description }) => {
  const [workflow] = await db.insert(processes).values({ name, description }).returning({ id: processes.id })
  redirect(303, `/processes/${workflow.id}`);
})

const insertTaskSchema = z.object({
  taskId: z.uuid(),
  name: z.string().nonempty(),
  description: z.string(),
  type: z.enum(['approval', 'document', 'task']),
  order: z.enum(['1', '2', '3']),
  dependsOn: z.array(z.uuid()).optional()
})

export const createTask = form(insertTaskSchema, async (data) => {
  const { dependsOn, ...taskData } = data;
  const toWrite = { ...taskData, order: parseInt(taskData.order) }
  const [task] = await db.insert(tasks).values(toWrite).returning({ id: tasks.id })

  if (dependsOn && dependsOn.length > 0) {
    await db.insert(taskDependencies).values(
      dependsOn.map(dependsOnStepId => ({
        stepId: task.id,
        dependsOnStepId
      }))
    );
  }

  redirect(303, `/processes/${data.taskId}/tasks/${task.id}`);
})


export const getTasks = query(z.string(), async (id: string) => {
  return await db.select().from(tasks).where(eq(tasks.processId, id))
})
