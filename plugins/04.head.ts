import { Script } from '@unhead/schema'
import { isEventEntity } from '~/utils/roadiz/entity'
import { EventsApi } from '~/types/event'
import { getStructuredData } from '~/utils/seo/get-structured-data'

export default defineNuxtPlugin((nuxtApp) => {
    // const commonContent = useCommonContents()
    // const siteName = commonContent.value?.head?.siteName || nuxtApp.$config.siteName || ''
    // const head = webResponse.head
    //
    // // SCRIPTS
    // const scripts = [] as Script[]
    //
    // /*
    //  * Google Tag Manager must not be loaded by tarteaucitron, it must configure tarteaucitron itself.
    //  * Notice: by using GTM you must comply with GDPR and cookie consent or just use
    //  * tarteaucitron with GA4, Matomo or Plausible
    //  */
    // if (head.value?.googleTagManager) {
    //     scripts.push({
    //         type: 'application/javascript',
    //         innerHTML: createGoogleTagManagerScript(head.value?.googleTagManager),
    //     })
    // }
    //
    // /*
    //  * Matomo Tag Manager must not be loaded by tarteaucitron, it must configure tarteaucitron itself.
    //  * Notice: by using MTM you must comply with GDPR and cookie consent or just use
    //  * tarteaucitron with GA4, Matomo or Plausible
    //  */
    // const matomoTagManagerUrl = runtimeConfig.public?.matomo?.url
    // const matomoTagManagerId = runtimeConfig.public?.matomo?.containerId
    // if (matomoTagManagerId && matomoTagManagerUrl) {
    //     // const hid = 'matomoTagManager'
    //
    //     scripts.push({
    //         type: 'application/javascript',
    //         innerHTML: createMatomoTagManagerScript(matomoTagManagerId, matomoTagManagerUrl),
    //     })
    // }
    //
    // // structured data
    // if (
    //     page.value &&
    //     isEventEntity(page.value) &&
    //     (page.value as EventsApi.Event).datesCount // don't add structured data for festival (no event dates)
    // ) {
    //     const structuredData = getStructuredData(page.value, img)
    //
    //     if (structuredData) {
    //         scripts.push({
    //             type: 'application/ld+json',
    //             innerHTML: JSON.stringify(structuredData),
    //         })
    //     }
    // }
    //
    // useHead({
    //     titleTemplate(title) {
    //         return (title ? title + ' – ' : '') + siteName
    //     },
    // })
})
