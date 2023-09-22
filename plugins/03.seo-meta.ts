import { RoadizNodesSources } from '@roadiz/abstract-api-client/dist/types/roadiz'
import { joinURL } from 'ufo'

export default defineNuxtPlugin((nuxtApp) => {
    // const commonContent = useCommonContents()
    // const { webResponse } = useFetchPage()
    // const head = webResponse.head
    // const description = webResponse.value?.item?.metaDescription || commonContent.value?.head?.metaDescription
    // const title = webResponse.value?.item?.metaTitle || commonContent.value?.head?.metaTitle
    // const siteName = commonContent.value?.head?.siteName || nuxtApp.$config.siteName || ''
    // const preview = useStatePreview()
    // const img = useImage()
    // const image = () => {
    //     const image =
    //         head.shareImage?.relativePath ||
    //         head.images?.[0]?.relativePath ||
    //         head.image?.[0]?.relativePath ||
    //         commonContent.value?.head?.shareImage?.relativePath
    //
    //     if (image) {
    //         return img(image, {
    //             width: 1200,
    //             quality: 70,
    //         })
    //     } else {
    //         return joinURL(useRuntimeConfig().public.baseUrl, '/images/share.jpg')
    //     }
    // }
    //
    // useServerSeoMeta({
    //     description,
    //     ogTitle: title,
    //     ogSiteName: siteName,
    //     ogDescription: description,
    //     ogImage: image(),
    //     twitterCard: 'summary',
    //     twitterTitle: title,
    //     twitterDescription: description,
    //     noIndex: (webResponse.item as RoadizNodesSources)?.noIndex || preview.value.isActive,
    // })
})
