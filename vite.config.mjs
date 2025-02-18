import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { Vuetify3Resolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: undefined,
      dts: false,
      resolvers: [Vuetify3Resolver()]
    })
  ],
  optimizeDeps: {
    include: ['vue', 'vuetify']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  build: {
    minify: false, // don't do minify
    sourcemap: true, // makes debugging easier
    lib: {
      entry: './src/index.js',
      name: 'Olotap',
      fileName: (format) => `olotap.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vuetify', 'vuetify/components'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
         'vuetify/components': 'VuetifyComp'
        },
      },
    },
  }
});