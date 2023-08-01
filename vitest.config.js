import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config'
import {svelte} from "@sveltejs/vite-plugin-svelte";

// TODO: check if this is still necessary once fully migrated to Svelte
export default defineConfig({
    plugins: [
        react(),
        svelte({hot: !process.env.VITEST})
    ],
    test: {
        include: ['**/*.test.tsx'],
        globals: true,
        environment: 'jsdom'
    },
})