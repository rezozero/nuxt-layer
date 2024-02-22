import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// @see https://nuxt.com/docs/guide/going-further/layers#relative-paths-and-aliases
const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
    devtools: { enabled: true },
    // css: [join(currentDir, './assets/scss/main.scss')],
    // modules: [],
    components: [
        // join(currentDir, './components/atoms'),
        // join(currentDir, './components/molecules'),
        // join(currentDir, './components/organisms'),
        // // TODO: use `global` imports for blocks. For now, Storybook throws an error.
        // // @see https://github.com/storybook-vue/storybook-nuxt/issues/57
        // // { path: '~/components/blocks/', global: true },
        // join(currentDir, './components/blocks'),
    ],
    runtimeConfig: {
        public: {
            site: {
                url: 'http://localhost:3000',
            },
        },
    },
})
