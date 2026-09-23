import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from '@svgr/rollup'
import { SANITY_PROJECTS, sanityUpstream } from './src/services/sanity.js'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
        svgo: true,
        svgoConfig: {
          plugins: [
            { name: 'removeTitle', active: false },
            { name: 'removeDesc', active: false },
            { name: 'prefixIds', params: { prefix: 'svg-' } },
          ],
        },
      },
    }),
    react(),
  ],
  server: {
    // Mirrors the /api/sanity/* rewrites in vercel.json
    proxy: Object.fromEntries(
      Object.entries(SANITY_PROJECTS).map(([key, config]) => {
        const upstream = new URL(sanityUpstream(config))
        return [
          `/api/sanity/${key}`,
          {
            target: upstream.origin,
            changeOrigin: true,
            rewrite: (p) => p.replace(`/api/sanity/${key}`, upstream.pathname),
          },
        ]
      })
    ),
  },
  build: {
    sourcemap: true,
  },
  base: '/',
})
