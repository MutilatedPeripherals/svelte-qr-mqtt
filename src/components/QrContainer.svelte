<script lang="ts">
    import * as QRCode from 'qrcode'
    import {onMount} from "svelte";
    import type {QRCodeRenderersOptions} from "qrcode";

    export let alternativeBackground: boolean;
    export let url: string

    let canvas: HTMLElement
    let mounted = false

    $: if (mounted) {
        mounted = true
        QRCode.toCanvas(canvas, url, opts(alternativeBackground))
    }

    onMount(() => {
        QRCode.toCanvas(canvas, url, opts(alternativeBackground))
        mounted = true
    })

    function opts(alternativeBackground: boolean): QRCodeRenderersOptions {
        return {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 128,
            color: {
                dark: alternativeBackground ? "#FFFFFF" : "#000000",
                light: alternativeBackground ? "#000000" : "#FFFFFF"
            }
        }
    }
</script>

<canvas bind:this={canvas}
        on:click={() => alternativeBackground = !alternativeBackground}/>