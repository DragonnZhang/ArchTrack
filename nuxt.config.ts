// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:12888'
          : '123'
    }
  }
})
