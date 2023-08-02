<script lang="ts">
    import Router from 'svelte-spa-router'
    import {routes} from "./routes";
</script>

<svelte:head>
    <title>svelte-qr-mqtt</title>
</svelte:head>

<Router {routes}/>