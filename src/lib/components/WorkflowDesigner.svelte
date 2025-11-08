<script module>
	class Selected {
		current: string | undefined = $state(undefined);
	}
	export const selected = new Selected();
</script>

<script lang="ts">
	import {
		SvelteFlow,
		type Edge,
		type Node,
		MiniMap,
		Controls,
		useSvelteFlow
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import { onMount } from 'svelte';

	import StartNodeMenu from './StartNodeMenu.svelte';
	import { WorkflowState, type LayoutOptions } from './workflow.svelte';
	import TaskNodeMenu from './TaskNodeMenu.svelte';
	import WorkflowMenu from './WorkflowMenu.svelte';
	type Props = {
		initialNodes: Node[];
		initialEdges: Edge[];
		graphOptions: LayoutOptions;
	};

	const { fitView } = useSvelteFlow();

	let { initialNodes, initialEdges }: Props = $props();

	let workflowState = new WorkflowState(initialNodes, initialEdges, fitView, {
		layout: {
			direction: 'TD'
		}
	});

	let selectedNode = $derived(workflowState.findNode(selected.current));

	onMount(async () => {
		await workflowState.applyLayout();
	});
</script>

<div class="flex h-screen w-full">
	<div class="grow bg-base-200 py-8 pr-4 pl-8">
		<div
			style="width: 100%; height: 100%;"
			class="overflow-hidden rounded-lg border border-primary bg-amber-400"
		>
			<SvelteFlow
				{...workflowState}
				defaultEdgeOptions={{
					selectable: false
				}}
				proOptions={{ hideAttribution: true }}
				nodesDraggable={false}
				nodesConnectable={false}
				onnodeclick={({ node }) => {
					selected.current = node.id;
				}}
				onpaneclick={() => {
					selected.current = undefined;
				}}
			>
				<MiniMap nodeStrokeWidth={3} />
				<Controls showLock={false} />
			</SvelteFlow>
		</div>
	</div>
	<!-- The context menu -->
	<div class="h-full w-[20%] bg-base-200 py-8 pr-8 pl-4">
		<div class="flex h-full flex-col gap-8 rounded-lg border border-primary bg-white p-8">
			{#if selectedNode?.type === 'startNode'}
				<StartNodeMenu node={selectedNode} />
			{:else if selectedNode?.type === 'taskNode'}
				<TaskNodeMenu node={selectedNode} {workflowState} />
			{:else}
				<WorkflowMenu {workflowState} />
			{/if}
		</div>
	</div>
</div>

<style>
	:global(.svelte-flow__handle) {
		visibility: hidden;
	}
</style>
