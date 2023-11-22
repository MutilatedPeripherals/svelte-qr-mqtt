<script lang="ts">
  import QrContainer from "src/components/QrContainer.svelte";
  import { onMount } from "svelte";

  export let alternativeBackground: boolean;
  export let gravityEnabled: boolean;
  export let url: string;

  // Source: https://stackoverflow.com/a/74678958/8522453
  let timeoutIds: number[] = [];
  let refs: HTMLDivElement[] = [];

  // TODO: this feels weird; do we need to manually create a ref for every element that we want to affect with gravity?
  let lyricsRef: HTMLDivElement | null;
  let qrRef: HTMLDivElement | null;
  onMount(async () => {
    refs = [lyricsRef!!, qrRef!!];
  });

  $: {
    if (gravityEnabled) {
      for (let ref of refs) {
        let id: number = setTimeout(function () {
          ref.style.marginTop = "1000px";
        }, 100) as unknown as number;
        timeoutIds.push(id);
      }
    } else {
      for (let id of timeoutIds) {
        clearTimeout(id);
      }
      for (let ref of refs) {
        ref.style.marginTop = "0px";
      }
    }
  }
</script>

<div>
  <h1>Caos</h1>
  <div
    class={`qrContainer ${gravityEnabled ? "gravity-affected-object" : ""}`}
    bind:this={qrRef}
  >
    <QrContainer bind:alternativeBackground {url} />
  </div>

  <div
    class={gravityEnabled ? "gravity-affected-object" : ""}
    bind:this={lyricsRef}
  >
    <p>
      De pronto todo cambia y ellos llaman a decirme <br />
      Señor debe hacer, lo que solía hacer<br />
      Y no se parece en nada a lo que usted viene<br />
      Haciendo desde tiempo atrás, algún tiempo atrás<br />
    </p>
    <p>
      Y hoy le llame a contarle que tengo respuestas<br />
      A preguntas que no entiendo bien<br />
      Hoy abri el agua caliente y luego la fría<br />
      Y no sabe usted lo que encontré
    </p>
    <p>
      De pronto desespero pues dicen que el comunismo<br />
      No esta nada bien, en la pelicula de ayer<br />
      Si esto es Cuba o Venezuela<br />
      o la Rusia setentera que vamos a hacer<br />
      Nos bombardearan también?
    </p>
    <p>
      Y hoy le llame a contarle que tengo<br />
      Respuestas a preguntas que no entiendo bien<br />
      Hoy abrí el agua caliente y luego la fría<br />
      Y no sabe usted lo que encontré<br />
      Y hoy lei en Hotmail que Bill Gates me daria<br />
      Un centavo por cada email que enviara<br />
      Viajando en el bus oi opiniones y pues las robe<br />
      Que más iba a hacer? Que más iba a hacer?
    </p>
    <p>
      De pronto Dios, de quienes claman<br />
      Ser sus hijos se olvidó y aquí estoy yo<br />
      Adoptado en un orfanato de ateos<br />
      Me dejo y al salir me confesó
    </p>
    <p>
      Lo siento pero ya debo renunciar<br />
      En ustedes confiare<br />
      Para el mundo guiar
    </p>
    <p>
      Lo siento pero ya debe renunciar<br />
      En nosotros confió ya para el mundo guiar
    </p>
    <p>
      De pronto Dios, de quienes claman<br />
      Ser sus hijos se olvidó y aquí estoy yo<br />
      Adoptado, en un orfanato de ateos me dejo<br />
      Y aquí estoy yo...
    </p>
  </div>
</div>

<style>
  .qrContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
