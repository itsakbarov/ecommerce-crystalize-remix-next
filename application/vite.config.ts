import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    publicDir: 'public',
    build: {
        target: 'esnext',
        outDir: 'build',
        manifest: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/entry.client.tsx'),
            },
        },
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 8002,
    },
    esbuild: {
        jsx: 'transform',
        jsxFactory: 'jsx',
        jsxFragment: 'Fragment',
        jsxImportSource: '@remix-run/component',
    },
});
