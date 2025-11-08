<script lang="ts">
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import { selected } from './WorkflowDesigner.svelte';

	let props: NodeProps = $props();

	type TaskData = {
		id: string;
		description: string;
		type: string;
	};

	let data = $derived(props.data as TaskData);
	const isSelected = $derived(selected.current === props.id);

	$inspect(selected.current);
</script>

<div class="w-2xs rounded-md bg-white px-2 py-2">
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
			stroke-width={isSelected ? '2' : '2'}
			stroke-dasharray={isSelected ? '10 4' : null}
			stroke-dashoffset={isSelected ? '0' : null}
		/>
	</svg>
	<div class="flex flex-col gap-2">
		<div class="flex items-center justify-between gap-16 text-xs">
			<p class="rounded bg-violet-200 px-2 py-1 font-mono">{data.id}</p>

			<div class="rounded bg-violet-200 p-1">
				{#if data.type === 'document'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
						/>
					</svg>
				{:else}
					<p>{data.type}</p>
				{/if}
			</div>
		</div>
		<p
			class="mb-2 rounded bg-slate-100 p-4 text-sm break-all text-stone-400 italic
"
		>
			{data.description.slice(0, 100) + (data.description.length >= 100 ? '...' : '')}
		</p>
	</div>
	<Handle type="target" position={Position.Top} />
	<Handle type="source" position={Position.Bottom} />
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
