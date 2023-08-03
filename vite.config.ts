import {defineConfig} from 'vite'
import {nodePolyfills} from "vite-plugin-node-polyfills";
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";
import {svelte} from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/svelte-qr-mqtt",
    plugins: [
        nodePolyfills({
            protocolImports: true,
        }),
        NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true
        }),
        svelte({hot: !process.env.VITEST})
    ],
    build: {
        target: 'esnext'
    }
})
