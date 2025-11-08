<script lang="ts">
	let dialog: HTMLDialogElement;
	let idElement: HTMLInputElement;

	type Props = {
		onsubmit: ({ id, description }: { id: string; description: string }) => void;
	};

	let { onsubmit }: Props = $props();

	let id = $state<string>('');
	let description = $state<string>('');
</script>

<button
	class="btn btn-primary"
	onclick={async () => {
		dialog.showModal();
		idElement.focus();
	}}>Add dependent task</button
>
<dialog bind:this={dialog} class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">✕</button>
		</form>
		<h3 class="text-lg font-bold">Add a step</h3>
		<form
			onsubmit={(e: SubmitEvent) => {
				e.preventDefault();
				onsubmit({ id, description });
				dialog.close();
				id = '';
			}}
		>
			<fieldset class="fieldset">
				<label class="label" for="id">ID</label>
				<input bind:this={idElement} type="text" name="id" class="input w-full" bind:value={id} />
				<label class="label mt-4" for="description">Description</label>
				<textarea name="id" class="input textarea w-full" bind:value={description}></textarea>
				<button class="btn mt-4 btn-neutral" type="submit"> Create </button>
			</fieldset>
		</form>
	</div>
</dialog>
