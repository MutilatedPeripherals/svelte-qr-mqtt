<script lang="ts">
    import {onMount} from "svelte";
    import * as PIXI from "pixi.js";

    onMount(async () => {
        var app = new PIXI.Application();
        var renderer = await PIXI.autoDetectRenderer(
            window.innerWidth,
            window.innerHeight
        );
        console.log("renderer", renderer);

        await app.init({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "pink",
        });
        console.log("app", app.canvas);

        document.getElementById("canvas-container")?.appendChild(app.canvas);

        let helloText = new PIXI.Text("Hello World", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: 0x000000,
            align: "center",
        });
        helloText.x = app.screen.width / 2;
        helloText.y = app.screen.height / 2;
        helloText.anchor.set(0.5); // Center anchor point
        app.stage.addChild(helloText);
    });

</script>

<div id="canvas-container"></div>