import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    environmentMatchGlobs: [
      ['**/*.test.tsx', 'jsdom'],
    ],
    coverage: {
      provider: 'v8',                
      reporter: [['text', { skipFull: false }]], 
      reportsDirectory: 'coverage',  
      clean: true,
      cleanOnRerun: true,
    },
  },
})
