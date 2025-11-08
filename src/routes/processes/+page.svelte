<script lang="ts">
	import { deleteProcess, getProcesses } from '$lib/data.remote';
	import AddProcessModal from './AddProcessModal.svelte';

	const handleDelete = async (id: string) => {
		await deleteProcess(id);
		await getProcesses().refresh();
	};
</script>

<h1 class="title">Processes</h1>
<div class="my-4 border-b border-primary/20"></div>

<ul class="flex flex-col gap-4">
	{#each await getProcesses() as process}
		<li>
			<div class="card border border-base-200 bg-base-100 shadow-sm">
				<div class="card-body">
					<div class="flex items-center justify-between">
						<p class="">
							{process.name}
						</p>
						<div class="">
							<a class="btn btn-outline btn-primary" href={`/processes/${process.id}`}>Go to</a>
							<button
								class="btn btn-outline btn-error"
								onclick={async () => await handleDelete(process.id)}>Delete</button
							>
						</div>
					</div>
				</div>
			</div>
		</li>
	{/each}
</ul>

{#if (await getProcesses()).length === 0}
	<p>No workflow in database!</p>
{/if}

<AddProcessModal />
