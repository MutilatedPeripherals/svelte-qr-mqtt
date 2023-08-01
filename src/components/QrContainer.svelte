<script lang="ts">
    let qrContainer: HTMLElement

    export let alternativeBackground: boolean;
    export let url: string

    function initQr() {
        // @ts-ignore
        let QRCode = window["QRCode"]
        new QRCode(qrContainer, {
            text: url,
            width: 128,
            height: 128,
            colorDark: alternativeBackground ? "#FFFFFF" : "#000000",
            colorLight: alternativeBackground ? "#000000" : "#FFFFFF",
            correctLevel: QRCode.CorrectLevel.H
        })
    }
</script>

<svelte:head>
    <script type="text/javascript" src="./qrcode.min.js" on:load={() => initQr()}/>
</svelte:head>

<div class="qrCodeInner"
     bind:this={qrContainer}
     on:click={() => alternativeBackground = !alternativeBackground}></div>