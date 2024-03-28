<script lang="ts">
    import UploadIcon from '$lib/icons/UploadIcon.svelte';
    import Logo from './components/Logo.svelte';
</script>

<Logo />
<div id="prompt">
    <UploadIcon />
    <h2>Click anywhere or drop files here to start</h2>
</div>

<style>
    #prompt {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        margin-top: 9rem;
    }
</style>
