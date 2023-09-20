import { CommonContent } from '~/types/api'

export default defineNuxtPlugin(async (nuxtApp) => {
    console.log('process.server=', process.server)
    if (!process.server) return

    console.log('defineNuxtPlugin 4')
    // const route = useRoute()
    // console.log('---------------------- route.name 2=', route.name)
    // // the dynamic route has no name
    // if (route.name) return
    //
    // const { $apiFetch } = nuxtApp
    // const { locale } = await useFetchPage()
    // console.log('locale=', locale)
    // if (locale) {
    //     const i18n = useI18n()
    //
    //     await i18n.setLocale(locale)
    // }
    //
    // useCommonContents().value = await $apiFetch<CommonContent>('/common_content', {
    //     method: 'GET',
    //     query: {
    //         _locale: i18n.locale,
    //     },
    // })
})
