import { CommonContent } from '~/types/api'

export default defineNuxtPlugin(async (nuxtApp) => {
    const route = useRoute()

    // the dynamic route has no name
    if (!route.name) return

    const { $apiFetch } = nuxtApp
    const { locale } = await useFetchPage()

    if (locale) {
        const i18n = useI18n()

        await i18n.setLocale(locale)
    }

    useCommonContents().value = await $apiFetch<CommonContent>('/common_content', {
        method: 'GET',
        query: {
            _locale: i18n.locale,
        },
    })
})
