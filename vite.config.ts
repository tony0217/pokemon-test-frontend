import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import envDev from './config/config.env';
import envProd from './config/config.prod';

const isDev = process.env.NODE_ENV === 'development';
console.log("🚀 ~ file: vite.config.ts:9 ~ isDev:", isDev)

const env = isDev ? envDev : envProd;

export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
  define: {
    global: {},
    'process.env.API_URL': JSON.stringify(env.API_URL),
    'process.env.PORT': env.PORT,
  },
  server: {
    port: env.PORT,
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
});
