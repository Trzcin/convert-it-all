<script lang="ts">
    import { tweened } from 'svelte/motion';

    export let value = 0;
    export let error = false;

    const progress = tweened(value);
    $: progress.set(value);
</script>

<progress class:error value={error ? 1 : $progress}></progress>

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

    .error::-webkit-progress-value {
        background: var(--destructive);
    }
    .error::-moz-progress-bar {
        background: var(--destructive);
    }
</style>
