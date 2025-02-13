import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";`,
      },
      sass: {
        api: "modern",
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [
      ".js",
      ".json",
      ".jsx",
      ".mjs",
      ".ts",
      ".tsx",
      ".vue",
    ],
  },
  build: {
    lib: {
      entry: "src/index.js",
      name: "OlotapEditor",  // Global değişken adı
      fileName: (format) => `olotap.${format}.js`,  // UMD dosya adı
    },
    rollupOptions: {
      external: ["vue"], // Vue bağımlılığını dışarıda tut
      output: {
        dir: "dist",
        entryFileNames: "[name].js",
        format: "umd",  // UMD formatı
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
