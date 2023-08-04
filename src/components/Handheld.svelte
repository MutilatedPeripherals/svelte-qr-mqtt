<script lang="ts">
    import {querystring} from "svelte-spa-router";
    import get_mqtt_client from "src/services/mqtt";
    import {buildTopic} from "src/services/utils";

    const params = new URLSearchParams($querystring);
    const id = params.get('id') ?? "test123";

    let client: any
    get_mqtt_client().then(response => {
        client = response
    })

    function sendMessage() {
        client.json_send(
            buildTopic(id),
            {
                note: "toggle-background",
                live: new Date().toISOString()
            })
    }
</script>

<div class="handheld">
    {#if client}
        <button on:click={sendMessage}>
            Action 1
        </button>
        <button on:click={() => alert("Not implemented!")}>
            Action 2
        </button>
    {:else }
        Loading...
    {/if}
</div>