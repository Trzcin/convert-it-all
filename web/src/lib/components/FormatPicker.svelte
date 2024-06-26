<script lang="ts">
    import type { Conversion } from '$lib/conversion';
    import {
        outputFormats,
        type FormatCategory,
        type Format,
        extraCategories,
    } from '$lib/formats';
    import FileIcon from '$lib/icons/FileIcon.svelte';

    export let category: FormatCategory | undefined;
    export let conversions: Conversion[];
    export let pickedFormat: Format | undefined;

    let searchText = '';

    $: extensions = conversions.map((c) => c.file.name.split('.')[1]);
    $: formats = outputFormats.filter(
        (f) =>
            (f.category === category ||
                extraCategories[category!].includes(f.category)) &&
            !extensions.includes(f.ext) &&
            f.name.includes(searchText),
    );
</script>

<h2>Pick a format</h2>
<input type="search" placeholder="Search" bind:value={searchText} />
<div id="formats-grid">
    {#each formats as format (format.name)}
        <button
            class="btn"
            class:selected={format === pickedFormat}
            on:click={() => (pickedFormat = format)}
        >
            <FileIcon category={format.category} />
            <p>{format.name}</p>
            <span>(.{format.ext})</span>
        </button>
    {/each}
</div>

<style>
    h2 {
        margin-top: 4rem;
        font-size: 2rem;
        font-weight: 800;
    }

    input {
        background: transparent;
        border-radius: 8px;
        border: 2px solid var(--gray);
        width: 18rem;
        height: 3rem;
        font-size: 1rem;
        padding: 0 1rem;
        color: var(--secondary);
        margin-top: 1rem;
    }

    input::placeholder {
        color: var(--gray);
    }

    #formats-grid {
        display: flex;
        column-gap: 4rem;
        row-gap: 2rem;
        width: 100%;
        flex-wrap: wrap;
        padding: 0 5rem;
        width: fit-content;
        margin: 2.5rem auto;
        justify-content: center;
    }

    button {
        width: 18rem;
        height: 5rem;
        gap: 0.5rem;
        font-size: 1rem;
    }

    button p {
        font-weight: 600;
    }

    button span {
        font-weight: 400;
        color: var(--gray);
    }

    .selected {
        --color: var(--accent);
        outline: 2px solid var(--accent);
    }

    .selected p {
        color: var(--accent);
    }
</style>
