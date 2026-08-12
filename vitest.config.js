import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.js',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
      },
      include: ['src/**/*.{test,spec}.{js,jsx}'],
      exclude: ['node_modules', 'dist', 'e2e', 'selenium'],
    },
  })
)
