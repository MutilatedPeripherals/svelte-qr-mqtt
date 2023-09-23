<script lang="ts">
    import uuid from "react-uuid";
    import get_mqtt_client from "src/services/mqtt";
    import {buildHandheldUrl, buildTopic} from "src/services/utils";
    import Lyrics from "src/components/Lyrics.svelte";
    import GithubSvg from "src/components/GithubSvg.svelte";
    import {TOGGLE_BACKGROUND_MESSAGE, TOGGLE_GRAVITY_MESSAGE} from "src/services/constants";
    import {MqttPayload} from "src/models/MqttPayload";

    const id: string = (import.meta.env.VITE_DEBUG) ? "test123" : uuid();

    let alternativeBackground = false
    let gravityEnabled = false

    get_mqtt_client().then(client => {
        client.subscribe_topic(
            buildTopic(id),
            (pkt: { json: () => any; }) => {
                let parsed: MqttPayload = MqttPayload.fromJson(pkt.json());

                if (import.meta.env.VITE_DEBUG) {
                    console.log(parsed)
                }

                switch (parsed.message) {
                    case TOGGLE_BACKGROUND_MESSAGE:
                        alternativeBackground = !alternativeBackground
                        break;
                    case TOGGLE_GRAVITY_MESSAGE:
                        gravityEnabled = !gravityEnabled
                        break;
                }
            }
        )
    })
</script>

<div class={`home ${alternativeBackground ? "alternative-bg" : ""}`}>
    {#if alternativeBackground}
        <div class="alternative-bg-background"/>
    {/if}
    <Lyrics
            bind:alternativeBackground
            bind:gravityEnabled
            url={buildHandheldUrl(id)}
    />
    <div class="home__footer">
        <div class="can-can-bc">
            <a class={`${alternativeBackground ? "alternative-bg" : ""}`}
               href="https://www.youtube.com/@pichudequito/videos"
               target="_blank">Band:
                Can Can
                (Ecuador)</a>
        </div>
        <div class="github-link">
            <a class={`${alternativeBackground ? "alternative-bg" : ""}`}
               href="https://github.com/linomp/svelte-qr-mqtt"
               target="_blank">
                <GithubSvg/>
            </a>
        </div>
    </div>

</div>