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
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },
  typescript: {
    strict: true,
  },
});
