// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      url:
        process.env.NODE_ENV === 'development'
          ? // ? 'http://127.0.0.1:12888'
            'http://47.94.210.196:22222'
          : 'http://47.94.210.196:22222'
    }
  }
})
