import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "@SwiperBundleCss",
        replacement: path.resolve(__dirname, "./node_modules/swiper/swiper-bundle.min.css"),
      },
      {
        find: "@SwiperBundle",
        replacement: path.resolve(__dirname, "./node_modules/swiper/swiper-bundle.esm.js"),
      },
      {
        find: "@Swiper",
        replacement: path.resolve(__dirname, "./node_modules/swiper/swiper.esm.js"),
      },
      {
        find: "@SwiperVue",
        replacement: path.resolve(__dirname, "./node_modules/swiper/vue/swiper-vue.js"),
      },
    ],
  },
  plugins: [
    react(),
  ],
  server: {
    port: 4000,
  }
})