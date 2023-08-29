// https://nuxt.com/docs/api/configuration/nuxt-config
// i18n
const locales = ['en', 'fr', 'de']
const defaultTimeZone = 'Europe/Paris' // Define global app timezone here because i18n config is not editable at runtime
const defaultLocale = 'en'
const fallbackLocale = 'en'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@rezo-zero/intervention-request-provider',
  ],
  plugins: [
    './plugins/roadiz-api.ts',
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://roadiz-core-app.test/api',
      interventionRequest: {
        baseUrl: 'http://roadiz-core-app.test/assets',
        noProcessBaseUrl: 'http://roadiz-core-app.test/files',
        imagesPath: ''
      },
    }
  },
  // https://github.com/rezozero/intervention-request-provider
  image: {
    provider: 'interventionRequest',
    providers: {
      interventionRequest: {
        name: 'interventionRequest',
        provider: '~/node_modules/@rezo-zero/intervention-request-provider/dist/runtime/index',
      }
    },
    screens: {
      // @ts-ignore
      '2xl': false, // remove useless 2xl size (duplicate with xxl size)
      hd: 1920
    }
  },
  i18n: {
    defaultLocale,
    locales: locales.map((locale) => ({
      code: locale,
      file: `nuxt.${locale}.json`,
    })),
    lazy: true,
    langDir: 'assets/locales/',
  }
})
