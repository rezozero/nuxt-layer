// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    extends: ['../'],
    modules: ['@rezo-zero/nuxt-stories'],
    stories: {
        pattern: 'playground/**/*.stories.vue',
        root: 'playground/stories',
    },
    runtimeConfig: {
        public: {
            site: {
                name: 'rezo-zero/nuxt-layer playground',
                url: 'https://nuxt-layer.rezo-zero.com',
            },
        },
    },
})
