<script lang="ts">
	import { createNewWorkflow } from '$lib/data.remote';

	let dialog: HTMLDialogElement;
</script>

<button class="btn my-4 btn-primary" onclick={() => dialog.showModal()}>Add a step</button>
<dialog bind:this={dialog} class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">✕</button>
		</form>
		<h3 class="text-lg font-bold">Add a step</h3>
		<form {...createNewWorkflow}>
			<fieldset class="fieldset">
				<label class="label" for="name">Name</label>
				<input
					class="input w-full"
					placeholder="Your step's name"
					{...createNewWorkflow.fields.name.as('text')}
				/>
				<label class="label" for="description">Description</label>
				<input
					class="input w-full"
					placeholder="Description"
					{...createNewWorkflow.fields.description.as('text')}
				/>
				<button class="btn mt-4 btn-neutral" type="submit">Create</button>
			</fieldset>
		</form>
	</div>
</dialog>
