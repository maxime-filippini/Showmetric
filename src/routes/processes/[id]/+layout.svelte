<script lang="ts">
	import { page } from '$app/state';
	import { getProcessById } from '$lib/data.remote';
	import { ArrowLeft } from 'lucide-svelte';

	const getProcess = $derived(getProcessById(page.params.id ?? ''));
	let { children } = $props();

	console.log({ id: page.params.id });
</script>

<div class="flex w-full justify-between">
	<h1 class="title">{(await getProcess).name}</h1>
	<a href="/processes">
		<div class="flex items-center justify-center gap-2">
			<ArrowLeft />
			<span>Back to processes</span>
		</div>
	</a>
</div>
<div class="my-4 border-b border-primary/20"></div>

{@render children()}
