import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { UnifiedViteWeappTailwindcssPlugin as untw } from 'weapp-tailwindcss';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // https://weapp-tw.icebreaker.top/docs/quick-start/install
    untw({
      rem2rpx: true,
      disabled: process.env.UNI_PLATFORM === 'h5' || process.env.UNI_PLATFORM === 'app',
    }),
    // https://github.com/unplugin/unplugin-auto-import#configuration
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
