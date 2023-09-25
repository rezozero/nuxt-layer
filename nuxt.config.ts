import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
// import unpluginSvgComponent from 'unplugin-svg-component/vite'
import svgLoader from 'vite-svg-loader'

// @see https://nuxt.com/docs/guide/going-further/layers#relative-paths-and-aliases
const currentDir = dirname(fileURLToPath(import.meta.url))

// i18n
const locales = ['en', 'fr', 'de']
const defaultLocale = 'en'

export default defineNuxtConfig({
    devtools: { enabled: true },
    css: [join(currentDir, './assets/scss/main.scss')],
    modules: ['@nuxt/image', '@nuxtjs/i18n', '@rezo-zero/intervention-request-provider'],
    // https://github.com/storybook-vue/storybook-nuxt/issues/57
    components: [
        join(currentDir, './components/atoms'),
        join(currentDir, './components/molecules'),
        join(currentDir, './components/organisms'),
        // TODO: use `global` imports for blocks. For now, Storybook throws an error.
        // @see https://github.com/storybook-vue/storybook-nuxt/issues/57
        // { path: '~/components/blocks/', global: true },
        join(currentDir, './components/blocks'),
    ],
    runtimeConfig: {
        public: {
            baseUrl: 'http://localhost:3000',
            apiBaseUrl: '',
            apiEndpointPrefix: '/api',
            interventionRequest: {
                baseUrl: '',
                noProcessBaseUrl: '',
                imagesPath: '',
            },
            matomo: {
                url: '',
                containerId: undefined,
            },
        },
    },
    // https://nuxt.com/docs/api/configuration/nuxt-config#vite
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "${join(currentDir, './assets/scss/_style-resources.scss')}";`,
                },
            },
        },
        plugins: [
            // unpluginSvgComponent({
            //     iconDir: ['~assets/images/icons'],
            //     dts: true,
            //     dtsDir: 'types',
            //     svgSpriteDomId: 'my-svg-id',
            //     prefix: 'icon',
            //     componentName: 'MySvgIcon',
            //     symbolIdFormatter: (svgName: string, prefix: string): string => {
            //         const nameArr = svgName.split('/')
            //         if (prefix) nameArr.unshift(prefix)
            //         return nameArr.join('-').replace(/\.svg$/, '')
            //     },
            //     optimizeOptions: undefined,
            //     vueVersion: 3,
            //     scanStrategy: 'component',
            //     treeShaking: true,
            // }),
            svgLoader(),
        ],
    },
    // https://github.com/rezozero/intervention-request-provider
    image: {
        provider: 'interventionRequest',
        providers: {
            interventionRequest: {
                name: 'interventionRequest',
                provider: join(
                    currentDir,
                    './node_modules/@rezo-zero/intervention-request-provider/dist/runtime/index',
                ),
            },
        },
        screens: {
            // @ts-ignore
            '2xl': false, // remove useless 2xl size (duplicate with xxl size)
            hd: 1920,
        },
    },
    i18n: {
        // Use no_prefix strategy to avoid redirecting localized paths without locale prefix
        strategy: 'no_prefix',
        detectBrowserLanguage: false,
        defaultLocale,
        locales: locales.map((locale) => ({
            code: locale,
            file: `nuxt.${locale}.json`,
        })),
        lazy: true,
        langDir: 'assets/locales/',
    },
})
