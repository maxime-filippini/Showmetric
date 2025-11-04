
import { eq, type InferSelectModel } from "drizzle-orm"
import { workflows, workflowSteps } from "./server/db/schema"
import { db } from "./server/db";

const selectWorkflowWithSteps = async (id: string) => {
  const [workflow] = await db.select().from(workflows).where(eq(workflows.id, id)).limit(1);
  const steps = await db.select().from(workflowSteps).where(eq(workflowSteps.workflowId, id));
  return { ...workflow, steps }
}

export type Workflow = InferSelectModel<typeof workflows>
export type WorkflowWithSteps = Awaited<ReturnType<typeof selectWorkflowWithSteps>>
