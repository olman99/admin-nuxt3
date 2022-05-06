import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  css: ["assets/css/tailwind.css"],
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  typescript: {
    strict: true,
  },
});
