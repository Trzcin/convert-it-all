<script lang="ts">
    import FileIcon from '$lib/icons/FileIcon.svelte';
    import type { FormatCategory } from '$lib/formats';
    import DownloadIcon from '$lib/icons/DownloadIcon.svelte';

    export let category: FormatCategory;
    export let name: string;
    export let size: string;
    export let url: string | undefined = undefined;
</script>

<FileIcon {category} />
<p>
    {#if url !== undefined}
        <a href={url}>{name}</a>
    {:else}
        {name}
    {/if}
</p>
<span>
    {size}
    {#if url !== undefined}
        <a href={url} download={name} class="btn"><DownloadIcon /></a>
    {/if}
</span>

<style>
    p {
        font-weight: 600;
        margin-left: 0.75rem;
    }

    span {
        margin-left: 1rem;
        font-weight: 400;
        color: var(--gray);
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    a {
        color: var(--secondary);
    }

    a.btn {
        padding: 0.5rem;
    }

    a.btn:hover {
        outline: 2px solid var(--accent);
    }
</style>
