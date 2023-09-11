import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import envDev from './config/config.env';
import envProd from './config/config.prod';

const isDev = process.env.NODE_ENV === 'development';

const env = isDev ? envDev : envProd;

export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
  define: {
    'process.env.API_URL': JSON.stringify(env.API_URL),
    'process.env.PORT': env.PORT,
  },
  
  server: {
    port: env.PORT,
  },
  build: {
    outDir: 'dist',
    minify: isDev ? false : 'terser',
    sourcemap: isDev,
    // rollupOptions: {
    //   external: [
    //     "@styles/theme",
    //     "Routes/AppRouter",
    //     "@lib/Context/AuthContext",
    //     "@components/Shared/SideBar/Sidebar"
    //   ],
    // },
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@public': path.resolve(__dirname, 'src/public'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
});
