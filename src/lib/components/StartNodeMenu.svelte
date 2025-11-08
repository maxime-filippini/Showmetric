<script lang="ts">
	import type { Node } from '@xyflow/svelte';

	type NodeData = {
		id: string;
		description: string;
	};
	let { node }: { node: Node } = $props();

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
</div>
