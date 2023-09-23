<script lang="ts">
    import {querystring} from "svelte-spa-router";
    import get_mqtt_client from "src/services/mqtt";
    import {buildTopic} from "src/services/utils";
    import {TOGGLE_BACKGROUND_MESSAGE, TOGGLE_GRAVITY_MESSAGE} from "src/services/constants";
    import {MqttPayload} from "src/models/MqttPayload";

    const params = new URLSearchParams($querystring);
    const id = params.get('id') ?? "test123";
    const topic = buildTopic(id);

    let client: any

    get_mqtt_client().then(response => {
        client = response
    })

    const sendToggleBackgroundMessage = () => {
        client.json_send(
            topic,
            new MqttPayload(TOGGLE_BACKGROUND_MESSAGE).toJson()
        )
    }

    const sendToggleGravityMessage = () => {
        client.json_send(
            topic,
            new MqttPayload(TOGGLE_GRAVITY_MESSAGE).toJson()
        )
    }
</script>

<div class="handheld">
    {#if client}
        <button on:click={sendToggleBackgroundMessage}>
            Action 1
        </button>
        <button on:click={sendToggleGravityMessage}>
            Action 2
        </button>
    {:else }
        Loading...
    {/if}
</div>