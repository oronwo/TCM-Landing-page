import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // O site de produção fica numa subpasta do domínio github.io; o servidor local continua na raiz.
  base: command === 'build' ? '/TCM-Landing-page/' : '/',
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3001' } }
}));
