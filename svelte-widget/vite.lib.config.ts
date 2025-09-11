import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'dist/lib',
    lib: {
      entry: 'src/embed.ts',
      name: 'CgmTir',
      fileName: (format) => `cgm-tir.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        globals: {}
      }
    }
  }
})

