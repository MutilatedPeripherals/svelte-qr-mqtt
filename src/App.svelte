<script lang="ts">
    import {Route, Router} from 'svelte-navigator'
    import uuid from "react-uuid";
    import Home from "./components/Home.svelte";

    let id: string = (import.meta.env.VITE_DEBUG) ? "test123" : uuid();
</script>

<svelte:head>
    <title>react-qr-mqtt</title>
</svelte:head>

<Router primary={false}>
    <div>
        <Route path="/react-qr-mqtt/*">
            <Route path="/">
                {#await import('./components/Home.svelte')}
                    Loading...
                {:then home}
                    <svelte:component this={home.default} {id}/>
                {/await}
            </Route>
            <Route path="/handheld">
                {#await import('./components/Handheld.svelte')}
                    Loading...
                {:then handheldPage}
                    <svelte:component this={handheldPage.default}/>
                {/await}
            </Route>
        </Route>
        <Route>
            {#await import('./components/Home.svelte')}
                Loading...
            {:then home}
                <svelte:component this={home.default} {id}/>
            {/await}
        </Route>
    </div>
</Router>
