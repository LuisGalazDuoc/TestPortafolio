import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// base './' permite publicar en GitHub Pages (https://usuario.github.io/repo/)
// sin tener que cambiar la configuración según el nombre del repositorio.
export default defineConfig({
  plugins: [react()],
  base: './',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: false,
    unstubGlobals: true,
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/test/**', 'src/**/*.test.{js,jsx}'],
      thresholds: { lines: 80, functions: 80, statements: 80, branches: 75 },
    },
  },
});
