import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '');
  const draftPassword = env.VITE_DRAFT_PASSWORD || '';

  return {
  define: {
    __DRAFT_PASSWORD__: JSON.stringify(draftPassword),
  },
  build: {
    rollupOptions: {
      input: {
        gate:         resolve(__dirname, 'gate.html'),
        main:         resolve(__dirname, 'index.html'),
        catalog:      resolve(__dirname, 'catalog.html'),
        configurator: resolve(__dirname, 'configurator.html'),
        about:        resolve(__dirname, 'about.html'),
        experience:   resolve(__dirname, 'experience.html'),
        brand:        resolve(__dirname, 'brand.html'),
        faq:          resolve(__dirname, 'faq.html'),
      },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  };
});
