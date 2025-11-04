<script lang="ts">
	import { page } from '$app/state';
	import { getWorkflowById } from '$lib/data.remote';
	import AddStepModal from './AddStepModal.svelte';

	const getWorkflow = $derived(getWorkflowById(page.params.id ?? ''));
</script>

<p class="my-8">
	This is a workflow. Here we're going to be putting metadata for the workflow as a whole.
</p>

<div class="my-4 border-b border-primary/20"></div>

<h2 class="title my-8 w-full">Steps</h2>
<div class="my-8"></div>

{#if (await getWorkflow).steps.length === 0}
	<p>No steps.</p>
{/if}

<ul class="flex flex-col gap-8">
	{#each (await getWorkflow).steps as step}
		<li>
			<div class="card border border-base-200 bg-base-100 shadow-sm">
				<div class="card-body">
					<div class="flex items-center justify-between">
						<p class="">
							{step.name}
						</p>
						<div class="">
							<a
								class="btn btn-outline btn-primary"
								href={`/workflows/${(await getWorkflow).id}/steps/${step.id}`}>Go to</a
							>
						</div>
					</div>
				</div>
			</div>
		</li>
	{/each}
</ul>

<AddStepModal workflow={await getWorkflow} />
