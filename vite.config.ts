import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'node:path';

export default defineConfig({
    plugins: [solidPlugin()],
    base: './',
    build: {
        target: 'esnext',
        outDir: path.resolve(__dirname, './dist'),
        // dist/styles/*.css 由 gulp build:style 产出，vite 不重新生成，watch 构建不能清空目录
        emptyOutDir: false,
        lib: {
            entry: path.resolve(__dirname, './src/components/index.tsx'),
            name: 'Aether'
        },
        rollupOptions: {
            context: 'globalThis',
            preserveEntrySignatures: 'strict',
            external: ['solid-js', 'solid-js/web', 'solid-js/store', 'countup.js', 'tinycolor2', 'aether-icons/feather', 'aether-icons/f7', 'cui-virtual-list', 'dayjs'],
            output: [
                {
                    format: 'es',
                    exports: 'named',
                    sourcemap: false,
                    entryFileNames: 'aether-ui.min.esm.js',
                    chunkFileNames: '[name].js',
                    assetFileNames: '[name].[ext]',
                    inlineDynamicImports: false,
                    manualChunks: undefined,
                }
            ]
        }
    },
    resolve: {
        conditions: ['development', 'browser'],
        alias: {
            // 'solid-vue-router': path.resolve('./src/solid-router'),
            // 'cui-virtual-list': path.resolve('./cui-virtual-list'),
            '@': path.resolve('./src')
        }
    },
    server: {
        port: 5173,
        host: '0.0.0.0',
        proxy: {
            '/test': {
                target: 'http://localhost:18080/'
            },
        }
    },
});
