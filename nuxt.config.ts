// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.API_URL,
    }
  },
  // components: [
  //   { path: '~/components/search', pathPrefix: false },
  // ],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt']
})