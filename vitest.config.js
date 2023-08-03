import { defineConfig } from 'vitest/config'
import {svelte} from "@sveltejs/vite-plugin-svelte";
import path from "path";

// TODO: check if this is still necessary once fully migrated to Svelte
export default defineConfig({
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src')
        }
    },
    plugins: [
        svelte({hot: !process.env.VITEST})
    ],
    test: {
        include: ['**/*.test.ts'],
        globals: true,
        environment: 'jsdom'
    },
})