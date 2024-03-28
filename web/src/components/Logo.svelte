<script>
    import MainIcon from '$lib/icons/MainIcon.svelte';
    import appState from '$lib/stores/appState';

    $: displayRow = !$appState.startsWith('no-files');
</script>

<div class:row={displayRow}>
    <MainIcon --size={displayRow ? '3rem' : '7.5rem'} />
    <h1>Convert It All</h1>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-top: 7.5rem;
    }

    .row {
        flex-direction: row;
        margin-top: 2rem;
    }

    h1 {
        font-size: 3rem;
        font-weight: 800;
    }

    .row h1 {
        font-size: 2rem;
    }
</style>
