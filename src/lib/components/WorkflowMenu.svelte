<script lang="ts">
	import type { WorkflowState } from './workflow.svelte';

	let { workflowState }: { workflowState: WorkflowState } = $props();
</script>

<h2 class="text-xl font-semibold">Available steps</h2>
<ul class="list-inside list-disc">
	{#each workflowState.nodes as node}
		<li class="">
			{node.id}
		</li>
	{/each}
</ul>
<button class="btn btn-primary">Add task</button>
