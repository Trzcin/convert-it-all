<script lang="ts">
    import type { FormatCategory } from '$lib/formats';
    import ImageIcon from './ImageIcon.svelte';
    import VideoIcon from './VideoIcon.svelte';
    import DocumentIcon from './DocumentIcon.svelte';
    import AudioIcon from './AudioIcon.svelte';
    import ApplicationIcon from './ApplicationIcon.svelte';

    export let category: FormatCategory | undefined;
</script>

{#if category === 'image'}
    <ImageIcon />
{:else if category === 'video'}
    <VideoIcon />
{:else if category === 'audio'}
    <AudioIcon />
{:else if category === 'application'}
    <ApplicationIcon />
{:else}
    <DocumentIcon />
{/if}
