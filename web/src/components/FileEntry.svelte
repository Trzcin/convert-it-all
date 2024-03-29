<script lang="ts">
    import FileIcon from '$lib/icons/FileIcon.svelte';
    import type { FormatCategory } from '$lib/formats';

    export let category: FormatCategory;
    export let name: string;
    export let size: string;
</script>

<FileIcon {category} />
<p>{name}</p>
<span>{size}</span>

<style>
    p {
        font-weight: 600;
        margin-left: 0.75rem;
    }

    span {
        margin-left: 1rem;
        font-weight: 400;
        color: var(--gray);
    }
</style>
