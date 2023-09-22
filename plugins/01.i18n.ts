export default defineNuxtPlugin(async (nuxtApp) => {
    // if (!process.server) return // HMR does not work with `.server` files

    const route = useRoute()

    // the dynamic route has no name
    if (!route.name) {
        const { $i18n } = nuxtApp

        // get the locale from the CMS
        const { locale } = await useFetchPage()

        if (locale) {
            await $i18n.setLocale(locale)
        }
    } else {
        // get the locale from the route (prefix) or cookie ?
    }
})
