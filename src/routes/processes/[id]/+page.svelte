<script lang="ts">
	import { page } from '$app/state';
	import { getProcessById } from '$lib/data.remote';
	import AddStepModal from './AddStepModal.svelte';

	const getProcess = $derived(getProcessById(page.params.id ?? ''));
</script>

<p class="my-8">
	This is a process. Here we're going to be putting metadata for the process as a whole.
</p>

<div class="my-4 border-b border-primary/20"></div>

<h2 class="title my-8 w-full">Steps</h2>
<div class="my-8"></div>

{#if (await getProcess).tasks.length === 0}
	<p>No steps.</p>
{/if}

<ul class="flex flex-col gap-8">
	{#each (await getProcess).tasks as task}
		<li>
			<div class="card border border-base-200 bg-base-100 shadow-sm">
				<div class="card-body">
					<div class="flex items-center justify-between">
						<p class="">
							{task.name}
						</p>
						<div class="">
							<a
								class="btn btn-outline btn-primary"
								href={`/workflows/${(await getProcess).id}/tasks/${task.id}`}
							>
								Go to
							</a>
						</div>
					</div>
				</div>
			</div>
		</li>
	{/each}
</ul>

<AddStepModal process={await getProcess} />
