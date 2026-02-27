// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: 'http://127.0.0.1:8000',
    },
  },

  modules: ['@nuxt/ui'],
})