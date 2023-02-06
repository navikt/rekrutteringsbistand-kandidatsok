import { defineConfig, loadEnv, ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

type Proxy = Record<string, string | ProxyOptions>;

const eksterneBiblioteker = [
    'react',
    'react-dom',
    'react-router-dom',
    'history',
    '@navikt/ds-react',
    '@navikt/ds-css',
    '@navikt/ds-icons',
    '@navikt/navspa',
];

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    const proxyTilEs = (fraPath: string, tilPath: string): Proxy => ({
        [fraPath]: {
            target: `${env.OPEN_SEARCH_URI}/veilederkandidat_current` + tilPath,
            changeOrigin: true,
            rewrite: (path: string) => path.replace(fraPath, ''),
            auth: `${env.OPEN_SEARCH_USERNAME}:${env.OPEN_SEARCH_PASSWORD}`,
        },
    });

    const proxy = {
        ...proxyTilEs('/kandidatsok-proxy', '/_search'),
        ...proxyTilEs('/kandidatsok-hent-kandidat', '/_doc'),
        ...proxyTilEs('/kandidatsok-hent-forklaring', '/_explain'),
    };

    return {
        appType: 'custom',
        server: {
            port: 3005,
            proxy,
        },
        build: {
            sourcemap: true,
            copyPublicDir: false,
            manifest: 'asset-manifest.json',
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                external: [],
            },
        },
        plugins: [react(), svgrPlugin()],
    };
});
