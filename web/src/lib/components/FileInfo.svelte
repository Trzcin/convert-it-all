<script lang="ts">
    import type { Format, FormatCategory } from '$lib/formats';
    import appState from '$lib/stores/appState';
    import FileEntry from './FileEntry.svelte';

    export let files: FileList;
    export let category: FormatCategory;
    export let pickedFormat: Format;

    const fileSizeFormatter = Intl.NumberFormat('en', {
        notation: 'compact',
        style: 'unit',
        unit: 'byte',
        unitDisplay: 'narrow',
    });
</script>

<div class="file-list" class:expanded={$appState !== 'pick-format'}>
    {#each files as file (file.name)}
        <FileEntry
            {category}
            name={file.name}
            size={fileSizeFormatter.format(file.size)}
        />
    {/each}
    {#if $appState !== 'pick-format'}
        {#each files as file (file.name)}
            <progress value={0}></progress>
            <FileEntry
                {category}
                name={file.name.split('.')[0] + '.' + pickedFormat.ext}
                size="..."
            />
        {/each}
    {/if}
</div>

<style>
    .file-list {
        margin-top: 4rem;
        display: grid;
        grid-template-columns: 2rem auto auto;
        align-items: center;
        row-gap: 1.5rem;
    }

    .expanded {
        grid-template-columns: 2rem auto auto auto 2rem auto auto;
    }

    progress {
        margin: 0 2.5rem;
        background-color: var(--gray);
        height: 0.25rem;
    }

    progress::-webkit-progress-value {
        background: var(--accent);
    }
    progress::-moz-progress-bar {
        background: var(--accent);
    }
</style>
