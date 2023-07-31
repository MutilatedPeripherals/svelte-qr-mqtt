<script lang="ts">
    let qrContainer: HTMLElement

    function initQr() {
        // @ts-ignore
        let QRCode = window["QRCode"]
        new QRCode(qrContainer, {
            text: "https://www.google.com",
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        })
    }
</script>

<svelte:head>
    <script type="text/javascript" src="./src/assets/qrcode.min.js" on:load={() => initQr()} />
</svelte:head>

<div bind:this={qrContainer}/>