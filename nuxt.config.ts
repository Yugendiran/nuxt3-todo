let baseURL = "http://localhost:5000/";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt-alt/http"],
  http: {
    baseURL,
    credentials: "omit",
    browserBaseURL: baseURL,
  },
});
