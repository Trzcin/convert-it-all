<script lang="ts">
    import type { Format, FormatCategory } from '$lib/formats';
    import UploadIcon from '$lib/icons/UploadIcon.svelte';
    import appState from '$lib/stores/appState';
    import DropzoneOverlay from './components/DropzoneOverlay.svelte';
    import FileEntry from './components/FileEntry.svelte';
    import FormatPicker from './components/FormatPicker.svelte';
    import Logo from './components/Logo.svelte';

    let files: FileList;
    let category: FormatCategory;
    let pickedFormat: Format;

    $: {
        handlePickFormat(pickedFormat);
    }

    function handlePickFormat(format: Format) {
        if (format === undefined) {
            return;
        }

        console.log(format);
    }

    function handleFiles(ev: CustomEvent<FileList>) {
        files = ev.detail;
        category = files[0].type.split('/')[0] as FormatCategory;
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
            {#each files as file (file.name)}
                <FileEntry {file} />
            {/each}
        </div>
        <FormatPicker {category} {files} bind:pickedFormat />
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
