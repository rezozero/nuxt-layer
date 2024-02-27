import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// @see https://nuxt.com/docs/guide/going-further/layers#relative-paths-and-aliases
const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
    devtools: { enabled: true },
    // css: [join(currentDir, './assets/scss/main.scss')],
    modules: ['@rezo-zero/intervention-request-provider', '@nuxt/image', '@rezo-zero/nuxt-stories'],
    components: [
        join(currentDir, './components/atoms'),
        join(currentDir, './components/molecules'),
        join(currentDir, './components/organisms'),
    ],
    runtimeConfig: {
        public: {
            site: {
                url: 'http://localhost:3000',
            },
        },
    },
    // Nuxt image
    // https://image.nuxt.com/get-started/configuration
    image: {
        provider: 'interventionRequest',
        quality: 75,
        screens: {
            xs: 375, // override size to match our breakpoints
            xl: 1440, // override size to match our breakpoints
            hd: 1920, // additional size
            qhd: 2500, // additional size
        },
        // @ts-ignore not working with [1]
        densities: '1',
        presets: {
            default: {
                sizes: 'xs:100vw md:100vw lg:100vw vl:100vw xl:100vw hd:100vw qhd:100vw',
            },
        },
    },
})
