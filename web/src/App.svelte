<script lang="ts">
    import type { Format, FormatCategory } from '$lib/formats';
    import UploadIcon from '$lib/icons/UploadIcon.svelte';
    import appState from '$lib/stores/appState';
    import DropzoneOverlay from './components/DropzoneOverlay.svelte';
    import FileInfo from './components/FileInfo.svelte';
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
        appState.set('load-module');
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
        <FileInfo {category} {files} {pickedFormat} />
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
</style>
