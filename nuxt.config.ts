// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  plugins: ['~/plugins/theme-init.client.js', '~/plugins/axios-auth.js', '~/plugins/scrollToTop.client.js'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
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
  css: ['swiper/css', '~/assets/css/global.css'],
  // components: [
  //   { path: '~/components/search', pathPrefix: false },
  // ],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt']
})