<script lang="ts">
    import get_mqtt_client from "../services/mqtt";
    import {buildTopic} from "../services/utils";
    import {querystring} from "svelte-spa-router";

    const params = new URLSearchParams($querystring);
    const id = params.get('id') ?? "test123";

    function sendMessage() {
        get_mqtt_client().then(client => {
            client.json_send(
                buildTopic(id),
                {
                    note: "toggle-background",
                    live: new Date().toISOString()
                })
        })
    }
</script>

<div class="handheld">
    <button on:click={sendMessage}>
        Action 1
    </button>
    <button on:click={() => alert("Not implemented!")}>
        Action 2
    </button>
</div>