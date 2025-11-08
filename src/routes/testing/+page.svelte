<script lang="ts">
	import { MarkerType, SvelteFlowProvider, type Edge, type Node } from '@xyflow/svelte';

	import WorkflowDesigner from '$lib/components/WorkflowDesigner.svelte';

	let initialNodes: Node[] = [
		{ id: 'start', position: { x: 0, y: 0 }, data: {}, type: 'startNode' },
		{
			id: '1',
			position: { x: 0, y: 0 },
			data: {
				id: 'first-task',
				description:
					'This is the first task with a long description, kind of, lorem ipsum yadda yadda yadda yadda yadda yadda',
				type: 'document'
			},
			type: 'taskNode'
		}
		// { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }, type: 'taskNode' },
		// { id: '3', position: { x: 200, y: 300 }, data: { label: '3' }, type: 'taskNode' },
		// { id: '4', position: { x: 300, y: 300 }, data: { label: '4' }, type: 'taskNode' }
	];

	let initialEdges: Edge[] = [
		{
			id: 'e1-2',
			source: 'start',
			target: '1',
			type: 'bezier',
			style: 'stroke: #000000;',
			markerEnd: { type: MarkerType.ArrowClosed, color: '#000000' }
		}
		// { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
		// { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' }
	];
</script>

<SvelteFlowProvider>
	<WorkflowDesigner {initialNodes} {initialEdges} graphOptions={{ direction: 'TD' }} />
</SvelteFlowProvider>
