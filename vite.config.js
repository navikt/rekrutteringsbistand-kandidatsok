import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const viteConfig = defineConfig({
    plugins: [react()],
    base: '/rekrutteringsbistand-kandidatsok/',
    server: {
        port: 3005,
    },
    preview: {
        port: 3005,
    },
    build: {
        manifest: 'asset-manifest.json',
        outDir: 'build',
        sourcemap: true,
        rollupOptions: {
            input: '/src/index.tsx',
        },
    },
});

export default viteConfig;
