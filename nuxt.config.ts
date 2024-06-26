export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            site: {
                url: 'http://localhost:3000',
            },
            api: {
                url: '',
                endpointPrefix: '/api',
            },
            roadiz: {
                documentPath: '/files',
            },
        },
    },
    optimization: {
        keyedComposables: [{ name: 'useRoadizFetch', argumentLength: 3 }],
    },
})
