import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// @see https://nuxt.com/docs/guide/going-further/layers#relative-paths-and-aliases
const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
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
            api: {
                url: '',
                endpointPrefix: '/api',
            },
        },
    },
})
