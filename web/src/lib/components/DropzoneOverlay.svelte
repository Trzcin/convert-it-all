<script lang="ts">
    import appState from '$lib/stores/appState';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher<{ files: FileList }>();

    let fileInput: HTMLInputElement;
    export let uploadError = false;

    function handleDrop(ev: DragEvent) {
        if (!ev.dataTransfer || ev.dataTransfer.files.length === 0) {
            return;
        }

        const category = ev.dataTransfer.files[0].type.split('/')[0];
        for (const file of ev.dataTransfer.files) {
            if (file.type.split('/')[0] !== category) {
                uploadError = true;
                return;
            }
        }

        dispatch('files', ev.dataTransfer.files);
    }

    function handleFileSelect() {
        if (!fileInput.files || fileInput.files.length === 0) {
            appState.set('no-files');
            return;
        }

        const category = fileInput.files[0].type.split('/')[0];
        for (const file of fileInput.files) {
            if (file.type.split('/')[0] !== category) {
                uploadError = true;
                return;
            }
        }

        dispatch('files', fileInput.files);
    }
</script>

<button
    on:click={() => fileInput.click()}
    on:dragover|preventDefault={() => appState.set('no-files.dragging')}
    on:dragleave={() => appState.set('no-files')}
    on:drop|preventDefault={handleDrop}
></button>
<input
    type="file"
    multiple
    bind:this={fileInput}
    on:change={handleFileSelect}
/>
<div
    class="glow"
    class:accent-glow={$appState === 'no-files.dragging'}
    class:destructive-glow={uploadError}
></div>

<style>
    button {
        opacity: 0;
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        cursor: pointer;
    }

    .glow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        transition: box-shadow 0.3s ease-in-out;
    }

    .accent-glow {
        box-shadow: inset var(--accent) 0 0 24px 8px;
    }

    .destructive-glow {
        box-shadow: inset var(--destructive) 0 0 24px 8px;
    }

    input {
        display: none;
    }
</style>
