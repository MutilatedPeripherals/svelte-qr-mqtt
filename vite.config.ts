import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {nodePolyfills} from "vite-plugin-node-polyfills";
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        nodePolyfills({
            protocolImports: true,
        }),
        NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true
        }),
    ],
    build: {
        target: 'esnext'
    }
})
