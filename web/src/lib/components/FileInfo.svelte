<script lang="ts">
    import type { Conversion } from '$lib/conversion';
    import type { Format, FormatCategory } from '$lib/formats';
    import appState from '$lib/stores/appState';
    import FileEntry from './FileEntry.svelte';
    import TweenedProgress from './TweenedProgress.svelte';

    export let conversions: Conversion[];
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
    {#each conversions as conv (conv.file.name)}
        <FileEntry
            {category}
            name={conv.file.name}
            size={fileSizeFormatter.format(conv.file.size)}
        />
    {/each}
    {#if $appState !== 'pick-format'}
        {#each conversions as conv (conv.file.name)}
            <TweenedProgress
                value={conv.progress}
                error={conv.error !== undefined}
            />
            {#if conv.error !== undefined}
                <p class="error">{conv.error}</p>
                <span></span>
                <span></span>
            {:else}
                <FileEntry
                    category={pickedFormat.category}
                    name={conv.file.name.split('.')[0] + '.' + pickedFormat.ext}
                    size={conv.outputSize === undefined
                        ? '...'
                        : fileSizeFormatter.format(conv.outputSize)}
                />
            {/if}
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

    .error {
        font-size: 1rem;
        font-weight: 600;
        color: var(--destructive);
    }
</style>
