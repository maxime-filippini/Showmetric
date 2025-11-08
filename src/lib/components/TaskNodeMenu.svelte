<script lang="ts">
	import type { Node } from '@xyflow/svelte';
	import AddDependentTaskModal from './AddDependentTaskModal.svelte';
	import type { WorkflowState } from './workflow.svelte';

	type NodeData = {
		id: string;
		description: string;
	};
	let { node, workflowState }: { node: Node; workflowState: WorkflowState } = $props();

	let nodeData = $derived<NodeData>(node.data as NodeData);
</script>

<h2 class="text-xl font-semibold">{node.id}</h2>
<div class="flex flex-col gap-4 text-sm">
	<div class="flex flex-col gap-2">
		<p class="font-bold">Description</p>
		<p class="rounded-lg bg-slate-100 p-2 text-sm break-all">
			{nodeData.description}
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<p class="font-bold">Type</p>
		<p class="rounded-lg bg-slate-100 p-2 text-sm break-all">{node.type}</p>
	</div>
</div>
<button class="btn btn-primary">Edit</button>
<AddDependentTaskModal
	onsubmit={({ id, description }) =>
		workflowState.addDependentNode(node.id, { id, description, type: 'taskNode' })}
/>
<button class="btn btn-error" onclick={() => workflowState.removeNode(node.id)}>Delete </button>
<button class="btn btn-primary" onclick={() => workflowState.addFinishNode(node.id)}
	>Add finish</button
>
