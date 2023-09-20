import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// @see https://nuxt.com/docs/guide/going-further/layers#relative-paths-and-aliases
const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    extends: ['../'],
    alias: {
        '~layer': join(currentDir, '../'),
    },
    workspaceDir: join(currentDir, '../'),
})
