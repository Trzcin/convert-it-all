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
    import JSZip from 'jszip';

    let conversions: Conversion[] = [];
    let category: FormatCategory | undefined;
    let pickedFormat: Format | undefined;
    let zipUrl: string | undefined;
    let uploadError = false;

    $: {
        handlePickFormat(pickedFormat);
    }

    function handlePickFormat(format: Format | undefined) {
        if (format === undefined) {
            return;
        }

        conversions.forEach((c) => URL.revokeObjectURL(c.url!));
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
                url: undefined,
                data: undefined,
            };
        });
        category = files[0].type.split('/')[0] as FormatCategory;
        appState.set('pick-format');
    }

    async function convert() {
        const converter = getConverter(category!);
        try {
            await converter.init();
            appState.set('converting');
        } catch (_) {
            appState.set('load-module.error');
        }

        for (let i = 0; i < conversions.length; i++) {
            converter.onProgress = (progress) => {
                conversions[i].progress = progress;
            };

            try {
                await converter.convert(conversions[i], pickedFormat!);
                conversions[i] = conversions[i];
            } catch (error) {
                conversions[i].error = 'Error';
                console.error(error);
            }
        }

        appState.set('done');
    }

    function restart() {
        conversions.forEach((c) => URL.revokeObjectURL(c.url!));
        if (zipUrl) {
            URL.revokeObjectURL(zipUrl);
        }
        conversions = [];
        pickedFormat = undefined;
        category = undefined;
        appState.set('no-files');
    }

    async function downloadZip() {
        const zip = new JSZip();
        for (const conv of conversions) {
            zip.file(
                conv.file.name.split('.')[0] + '.' + pickedFormat?.ext,
                conv.data,
            );
        }
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        const zipLink = document.createElement('a');
        zipUrl = URL.createObjectURL(zipBlob);
        zipLink.href = zipUrl;
        zipLink.download = 'converted.zip';
        zipLink.click();
    }
</script>

<main>
    <Logo />
    {#if $appState.startsWith('no-files')}
        <div id="prompt">
            {#if uploadError}
                <h2 class="error">Files need to have the same category</h2>
            {:else}
                <UploadIcon />
                <h2>Click anywhere or drop files here to start</h2>
            {/if}
        </div>
        <DropzoneOverlay on:files={handleFiles} bind:uploadError />
    {:else}
        <FileInfo {category} {conversions} {pickedFormat} />

        {#if $appState === 'load-module'}
            <p id="module-status">
                Downloading the {category} conversion module ...
            </p>
        {:else if $appState === 'load-module.error'}
            <p id="module-status" class="error">
                Could not load {category} conversion module
            </p>
        {/if}

        {#if $appState === 'done'}
            <div id="btns">
                {#if conversions.length > 1}
                    <button class="btn reload accent" on:click={downloadZip}
                        >Download all (.zip)</button
                    >
                {/if}
                <button class="btn reload" on:click={restart}
                    >Convert more files</button
                >
            </div>
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
        gap: 1rem;
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

    .error {
        color: var(--destructive);
    }

    #btns {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .reload {
        font-size: 1rem;
        font-weight: 600;
        padding: 0.75rem 1.5rem;
    }

    .accent {
        color: var(--accent);
    }

    .accent:hover {
        outline: 2px solid var(--accent);
    }
</style>
