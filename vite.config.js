import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), ViteAliases()],
  build: {
    manifest: true,
    chunkSizeWarningLimit: 1000,
    target: ['es2020']
  },
  esbuild: {
    // avoid manual import React
    jsxInject: 'import React from \'react\''
  }
})
