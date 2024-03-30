<script lang="ts">
    import { getConverter } from '$lib/converters/converter';
    import type { Format, FormatCategory } from '$lib/formats';
    import UploadIcon from '$lib/icons/UploadIcon.svelte';
    import appState from '$lib/stores/appState';
    import DropzoneOverlay from '$lib/components/DropzoneOverlay.svelte';
    import FileInfo from '$lib/components/FileInfo.svelte';
    import FormatPicker from '$lib/components/FormatPicker.svelte';
    import Logo from '$lib/components/Logo.svelte';
    import type { Conversion } from '$lib/conversion';

    let conversions: Conversion[] = [];
    let category: FormatCategory;
    let pickedFormat: Format;

    $: {
        handlePickFormat(pickedFormat);
    }

    function handlePickFormat(format: Format) {
        if (format === undefined) {
            return;
        }

        appState.set('load-module');
        convert();
    }

    function handleFiles(ev: CustomEvent<FileList>) {
        const files = ev.detail;
        conversions = Array.from(files).map((f) => {
            return {
                file: f,
                error: undefined,
                progress: 0,
                outputSize: undefined,
            };
        });
        category = files[0].type.split('/')[0] as FormatCategory;
        appState.set('pick-format');
    }

    async function convert() {
        const converter = getConverter(category);
        try {
            await converter.init();
            appState.set('converting');
        } catch (error) {
            console.error(error);
        }

        for (let i = 0; i < conversions.length; i++) {
            converter.onProgress = (progress) => {
                conversions[i].progress = progress;
            };

            try {
                const url = await converter.convert(
                    conversions[i],
                    pickedFormat,
                );
                conversions[i] = conversions[i];
                console.log(url);
            } catch (_) {
                conversions[i].error = 'Error';
            }
        }

        appState.set('done');
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
        <FileInfo {category} {conversions} {pickedFormat} />
        {#if $appState.startsWith('load-module')}
            <p id="module-status">
                Downloading the {category} conversion module ...
            </p>
        {/if}
        <FormatPicker {category} {conversions} bind:pickedFormat />
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

    #module-status {
        font-size: 1rem;
        font-weight: 600;
        color: var(--gray);
        margin-top: 1.5rem;
    }
</style>
