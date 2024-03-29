<script lang="ts">
    import FileIcon from '$lib/icons/FileIcon.svelte';
    import type { FormatCategory } from '$lib/formats';

    export let file: File;

    const fileSizeFormatter = Intl.NumberFormat('en', {
        notation: 'compact',
        style: 'unit',
        unit: 'byte',
        unitDisplay: 'narrow',
    });

    $: category = file.type.split('/')[0] as FormatCategory;
</script>

<FileIcon {category} />
<p>{file.name}</p>
<span>{fileSizeFormatter.format(file.size)}</span>

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
