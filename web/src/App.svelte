<script lang="ts">
    import UploadIcon from '$lib/icons/UploadIcon.svelte';
    import appState from '$lib/stores/appState';
    import DropzoneOverlay from './components/DropzoneOverlay.svelte';
    import FileEntry from './components/FileEntry.svelte';
    import Logo from './components/Logo.svelte';

    let files: FileList;

    function handleFiles(ev: CustomEvent<FileList>) {
        files = ev.detail;
        appState.set('pick-format');
    }
</script>

<main>
    <Logo />
    {#if $appState.startsWith('no-files')}
        <div id="prompt">
            <UploadIcon />
            <h2>Click anywhere or drop files here to start</h2>
        </div>
        <DropzoneOverlay on:files={handleFiles} />
    {:else}
        <div id="file-list">
            {#each files as file}
                <FileEntry {file} />
            {/each}
        </div>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #prompt {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        margin-top: 9rem;
    }

    #prompt h2 {
        font-weight: 600;
    }

    #file-list {
        margin-top: 4rem;
        display: grid;
        grid-template-columns: 2rem 1fr auto;
        align-items: center;
        row-gap: 1.5rem;
    }
</style>
