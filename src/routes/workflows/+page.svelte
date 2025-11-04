<script lang="ts">
	import { deleteWorkflow, getWorkflows } from '$lib/data.remote';
	import AddWorkflowModal from './AddWorkflowModal.svelte';

	const handleDelete = async (id: string) => {
		await deleteWorkflow(id);
		await getWorkflows().refresh();
	};
</script>

<h1 class="title">Workflows</h1>
<div class="my-4 border-b border-primary/20"></div>

<ul class="flex flex-col gap-4">
	{#each await getWorkflows() as workflow}
		<li>
			<div class="card border border-base-200 bg-base-100 shadow-sm">
				<div class="card-body">
					<div class="flex items-center justify-between">
						<p class="">
							{workflow.name}
						</p>
						<div class="">
							<a class="btn btn-outline btn-primary" href={`/workflows/${workflow.id}`}>Go to</a>
							<button
								class="btn btn-outline btn-error"
								onclick={async () => await handleDelete(workflow.id)}>Delete</button
							>
						</div>
					</div>
				</div>
			</div>
		</li>
	{/each}
</ul>

{#if (await getWorkflows()).length === 0}
	<p>No workflow in database!</p>
{/if}

<AddWorkflowModal />
