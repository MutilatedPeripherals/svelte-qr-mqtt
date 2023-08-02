<script lang="ts">
    import get_mqtt_client from "../services/mqtt.js";
    import {buildHandheldUrl, buildTopic} from "../services/utils";
    import Lyrics from "./Lyrics.svelte";
    import uuid from "react-uuid";

    const id: string = (import.meta.env.VITE_DEBUG) ? "test123" : uuid();

    let alternativeBackground = false

    get_mqtt_client().then(client => {
        client.subscribe_topic(
            buildTopic(id),
            (pkt: { json: () => any; }) => {
                let parsed = pkt.json()
                if (parsed.note === "toggle-background") {
                    alternativeBackground = !alternativeBackground
                }
            })
    })
</script>

<div class={`home ${alternativeBackground ? "alternative-bg" : ""}`}>
    {#if alternativeBackground}
        <div class="alternative-bg-background"/>
    {/if}
    <Lyrics
            bind:alternativeBackground
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
               href="https://github.com/linomp/react-qr-mqtt"
               target="_blank"><i
                    class="fab fa-github"></i></a>
        </div>
    </div>

</div>