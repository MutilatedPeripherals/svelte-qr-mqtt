<script lang="ts">
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";
  import * as Matter from "matter-js";

  let engine = Matter.Engine.create();
  let world = engine.world;
  console.log("engine", engine);
  let render = Matter.Render.create({
    element: document.body,
    engine: engine,
  });

  onMount(async () => {
    const sceneContainer = document.getElementById("canvas-container");
    const canvasWidth = sceneContainer.offsetWidth;
    const canvasHeight = sceneContainer.offsetHeight;
    console.log("scence container", sceneContainer);
    var app = new PIXI.Application();
    var renderer = await PIXI.autoDetectRenderer(
      window.innerWidth,
      window.innerHeight
    );

    await app.init({
      transparent: true,
      resizeTo: sceneContainer,
    });

    document.getElementById("canvas-container")?.appendChild(app.canvas);

    let helloText = new PIXI.Text("Hello World how are you", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: "red",
      align: "center",
    });

    helloText.x = app.screen.width / 2;
    helloText.y = 300;
    helloText.anchor.set(0.5); // Center anchor point
    app.stage.addChild(helloText);

    let goodByeText = new PIXI.Text("Goodbye World", {
      fontFamily: "Comic Sans MS",
      fontSize: 24,
      fill: "red",
      align: "center",
    });
    goodByeText.x = app.screen.width / 2 + 50;
    goodByeText.y = 350;
    goodByeText.anchor.set(0.5); // Center anchor point
    app.stage.addChild(goodByeText);

    let textBody = Matter.Bodies.rectangle(
      helloText.x,
      300,
      helloText.width,
      helloText.height,
      {
        render: {
          fillStyle: "blue", // This will color the body red. You can use any CSS color value here.
        },
      }
    );

    Matter.Body.rotate(textBody, Math.PI / 4); // PI/4 radians is 45 degrees

    let textBody2 = Matter.Bodies.rectangle(
      goodByeText.x,
      300,
      goodByeText.width,
      goodByeText.height,
      {
        render: {
          fillStyle: "blue", // This will color the body red. You can use any CSS color value here.
        },
      }
    );
    Matter.Body.rotate(textBody2, Math.PI / 3); // PI/4 radians is 45 degrees

    console.log("asdf", canvasHeight, canvasWidth);
    Matter.World.addBody(world, textBody);
    Matter.World.addBody(world, textBody2);
    const wallBottom = Matter.Bodies.rectangle(
      canvasWidth / 2,
      500,
      canvasWidth,
      10,
      {
        isStatic: true,
        render: {
          fillStyle: "red", // Replace 'yourColor' with the color you want, e.g., '#FF0000' for red
          strokeStyle: "red",
          lineWidth: 1,
        },
      }
    );
    Matter.World.addBody(world, wallBottom);
    console.log("el wall bottom", wallBottom);

    let y = 0;
    let velocity = 0;
    let gravity = 0.0001; // Adjust gravity to your liking

    app.ticker.add((delta) => {
      console.log(textBody.position.y);
      helloText.y = textBody.position.y;
      helloText.x = textBody.position.x;
      helloText.rotation = textBody.angle;

      goodByeText.y = textBody2.position.y;
      goodByeText.x = textBody2.position.x;
      goodByeText.rotation = textBody2.angle;
    });
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: Matter.Mouse.create(document.getElementById("canvas-container")),
    });

    Matter.World.add(engine.world, mouseConstraint);
    // Run the engine
    Matter.Engine.run(engine);
    // Run the renderer
    //Matter.Render.run(render);
  });
</script>

<div id="canvas-container" />
