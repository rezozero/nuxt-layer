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
            baseURL: '',
            siteURL: '',
            // apiURL may be different from baseURL in development environment and if your
            // API is hosted on a different domain than your frontend
            apiURL: '',
            apiEndpointPrefix: '/api',
            documentPath: '/files',
            recaptcha: {
                siteKey: '',
                version: 3,
            },
            interventionRequest: {
                baseUrl: '',
                noProcessBaseUrl: '',
            },
        },
    },
})
