<script lang="ts">
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import { selected } from './WorkflowDesigner.svelte';
	import { twMerge } from 'tailwind-merge';

	let props: NodeProps = $props();

	let conditionalStyle = $derived.by(() => {
		if (selected.current === props.id) {
			return 'border-dashed animate-border-spin';
		}
		return 'border-solid';
	});

	const isSelected = $derived(selected.current === props.id);
</script>

<Handle type="source" position={Position.Bottom} isConnectable={false} />

<div
	class="relative flex min-w-2xs items-center justify-center rounded-lg bg-violet-300 px-12 py-8"
>
	<svg
		class="pointer-events-none absolute inset-0 rounded-lg stroke-black"
		width="100%"
		height="100%"
	>
		<rect
			class={{ 'dashed-border': isSelected }}
			x="1"
			y="1"
			width="calc(100% - 2px)"
			height="calc(100% - 2px)"
			rx="8"
			ry="8"
			fill="none"
			stroke-width={isSelected ? '3' : '2'}
			stroke-dasharray={isSelected ? '10 4' : null}
			stroke-dashoffset={isSelected ? '0' : null}
		/>
	</svg>
	<div class="relative text-lg font-bold">START</div>
</div>

<style>
	.dashed-border {
		animation: dash-move 1s linear infinite;
	}

	@keyframes dash-move {
		from {
			stroke-dashoffset: 0;
		}
		to {
			stroke-dashoffset: -14;
		}
	}
</style>
