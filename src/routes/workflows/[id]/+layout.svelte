<script lang="ts">
	import { page } from '$app/state';
	import { getWorkflowById } from '$lib/data.remote';
	import { ArrowLeft } from 'lucide-svelte';

	const query = $derived(getWorkflowById(page.params.id ?? ''));
	let { children } = $props();

	console.log({ id: page.params.id });
</script>

<div class="flex w-full justify-between">
	<h1 class="title">{(await query).name}</h1>
	<a href="/workflows">
		<div class="flex items-center justify-center gap-2">
			<ArrowLeft />
			<span>Back to workflows</span>
		</div>
	</a>
</div>
<div class="my-4 border-b border-primary/20"></div>

{@render children()}
