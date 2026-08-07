import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';

// Qwik's plugin derives its build target ('client' | 'ssr' | 'lib') from Vite's
// `mode`, not from a plugin option — invoke via `vite build --mode lib`.
export default defineConfig({
  plugins: [qwikVite()],
  build: {
    target: 'es2020',
    outDir: 'dist',
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: () => 'index.qwik.mjs',
    },
    rollupOptions: {
      external: ['@builder.io/qwik'],
    },
  },
});
