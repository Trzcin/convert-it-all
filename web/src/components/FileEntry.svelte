<script lang="ts">
    import DocumentIcon from '$lib/icons/DocumentIcon.svelte';
    import ImageIcon from '$lib/icons/ImageIcon.svelte';
    import VideoIcon from '$lib/icons/VideoIcon.svelte';

    export let file: File;

    const fileSizeFormatter = Intl.NumberFormat('en', {
        notation: 'compact',
        style: 'unit',
        unit: 'byte',
        unitDisplay: 'narrow',
    });

    $: type = file.type.split('/')[0];
</script>

{#if type === 'image'}
    <ImageIcon />
{:else if type === 'video'}
    <VideoIcon />
{:else}
    <DocumentIcon />
{/if}
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
