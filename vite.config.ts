import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {nodePolyfills} from "vite-plugin-node-polyfills";
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";
import {svelte} from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/react-qr-mqtt/",
    plugins: [react(),
        nodePolyfills({
            protocolImports: true,
        }),
        NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true
        }),
    svelte({hot: !process.env.VITEST})],
    build: {
        target: 'esnext'
    }
})
