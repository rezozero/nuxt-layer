// https://nuxt.com/docs/api/configuration/nuxt-config
// i18n
const locales = ['en', 'fr', 'de']
const defaultLocale = 'en'

export default defineNuxtConfig({
  devtools: { enabled: true },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/scss/main.scss'],
  modules: [
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@rezo-zero/intervention-request-provider',
  ],
  plugins: [
    './plugins/roadiz-api.ts',
  ],
  components: [
    { path: '~/components/blocks/', global: true },
  ],
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000',
      apiBaseUrl: 'http://roadiz-core-app.test/api',
      interventionRequest: {
        baseUrl: 'http://roadiz-core-app.test/assets',
        noProcessBaseUrl: 'http://roadiz-core-app.test/files',
        imagesPath: ''
      },
      matomo: {
        url: 'https://matomo.rezo-zero.com',
        containerId: undefined,
      }
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
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    defaultLocale,
    locales: locales.map((locale) => ({
      code: locale,
      file: `nuxt.${locale}.json`,
    })),
    lazy: true,
    langDir: 'assets/locales/'
  }
})
