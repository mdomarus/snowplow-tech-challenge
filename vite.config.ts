import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    setupFiles: 'setup-tests.ts',
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude],
    coverage: {
      exclude: ['**/*.gen.ts', '**/*.js', '**/__mocks__/**/*', '**/*.config.*'],
    },
  },
});
