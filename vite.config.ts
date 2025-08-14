import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    environmentMatchGlobs: [
      ['**/*.test.tsx', 'jsdom'],
    ],
    coverage: {
      provider: 'v8',
      reporter: [['text', { skipFull: false }]],
      reportsDirectory: 'coverage',
      clean: true,
      cleanOnRerun: true, all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'server.{js,ts}',
        'src/entry-client.tsx',
        'src/entry-server.tsx',
        'src/**/index.ts',
        'src/types/**/*',
        'src/vite-env.d.ts'
      ],
    },
  },
})
