
import { eq, type InferSelectModel } from "drizzle-orm"
import { processes, tasks } from "./server/db/schema"
import { db } from "./server/db";

const selectProcessWithSteps = async (id: string) => {
  const [workflow] = await db.select().from(processes).where(eq(processes.id, id)).limit(1);
  const tasks_ = await db.select().from(tasks).where(eq(tasks.processId, id));
  return { ...workflow, tasks: tasks_ }
}

export type Process = InferSelectModel<typeof processes>
export type ProcessWithSteps = Awaited<ReturnType<typeof selectProcessWithSteps>>
