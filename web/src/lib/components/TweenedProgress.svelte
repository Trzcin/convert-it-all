<script lang="ts">
    import { tweened } from 'svelte/motion';

    export let value = 0;

    const progress = tweened(value);
    $: progress.set(value);
</script>

<progress value={$progress}></progress>

<style>
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
