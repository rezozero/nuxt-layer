import { CommonContent } from '~/types/api'

export default defineNuxtPlugin(async (nuxtApp) => {
    if (!process.server) return // HMR does not work with `.server` files

    const route = useRoute()

    // the dynamic route has no name
    if (route.name) return

    const { $apiFetch, $i18n } = nuxtApp

    const { locale } = await useFetchPage()

    if (locale) {
        await $i18n.setLocale(locale)
    }

    useCommonContents().value = await $apiFetch<CommonContent>('/common_content', {
        method: 'GET',
        query: {
            _locale: $i18n.locale,
        },
    })
})
