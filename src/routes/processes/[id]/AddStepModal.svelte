<script lang="ts">
	import { createTask } from '$lib/data.remote';
	import type { ProcessWithSteps } from '$lib/types';

	let dialog: HTMLDialogElement;

	type Props = {
		process: ProcessWithSteps;
	};
	let { process }: Props = $props();
</script>

<button class="btn my-4 btn-primary" onclick={() => dialog.showModal()}>Add a step</button>
<dialog bind:this={dialog} class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">✕</button>
		</form>
		<h3 class="text-lg font-bold">Add a step</h3>
		<form {...createTask}>
			<fieldset class="fieldset">
				<input type="hidden" name="processId" value={process.id} />
				<label class="label" for="name">Name</label>
				<input
					class="input w-full"
					placeholder="Your task's name"
					{...createTask.fields.name.as('text')}
				/>
				<label class="label" for="description">Description</label>
				<input
					class="input w-full"
					placeholder="Description"
					{...createTask.fields.description.as('text')}
				/>
				<label class="label" for="type">Type</label>
				<select {...createTask.fields.type.as('select')} class="select w-full">
					<option>approval</option>
					<option>document</option>
					<option>task</option>
				</select>
				<label class="label" for="order">Order</label>
				<select {...createTask.fields.order.as('select')} class="select w-full">
					<option>1</option>
					<option>2</option>
					<option>3</option>
				</select>
				<label class="label" for="dependsOn">Depends on</label>
				<select
					{...createTask.fields.dependsOn.as('select multiple')}
					multiple
					class="select w-full"
				>
					{#each process.tasks as step}
						<option value={step.id}>{step.name} ({step.id})</option>
					{/each}
				</select>

				<button class="btn mt-4 btn-neutral" type="submit">Create</button>
			</fieldset>
		</form>
	</div>
</dialog>
