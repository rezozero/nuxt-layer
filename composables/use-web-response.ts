import {Ref} from "@vue/reactivity";
import {RoadizAlternateLink, RoadizNodesSources} from "@roadiz/abstract-api-client/dist/types/roadiz";
import {joinURL} from "ufo";
import {Link, Meta, Script} from "@unhead/schema";
import {CommonContent, PageResponse} from "~/types/api";
import {EventsApi} from "~/types/event";
import {getStructuredData} from "~/utils/seo/get-structured-data";
import {isEventEntity} from "~/utils/roadiz/entity";

export default function (
    pageResponse: Ref<PageResponse | null>,
    commonContents: Ref<CommonContent>
){
    const img = useImage()
    const runtimeConfig = useRuntimeConfig()

    const webResponse = computed(() => {
        return pageResponse.value?.webResponse
    })
    const pageType = computed(() => {
        return pageResponse.value?.webResponse?.item?.["@type"]
    })
    const page = computed(() => {
        return pageResponse.value?.webResponse?.item
    })
    const blocks = computed(() => {
        return pageResponse.value?.webResponse?.blocks || []
    })
    const breadcrumbs = computed(() => {
        return pageResponse.value?.webResponse?.breadcrumbs
    })
    const head = computed(() => {
        return pageResponse.value?.webResponse?.head
    })
    const realms = computed(() => {
        return pageResponse.value?.webResponse?.realms
    })
    const hidingBlocks = computed(() => {
        return pageResponse.value?.webResponse?.hidingBlocks
    })
    const alternateLinks = computed(() => {
        return pageResponse.value?.alternateLinks
    })
    const title = computed(() => {
        const nodeSource = page.value as RoadizNodesSources
        const event = page.value as EventsApi.Event
        return nodeSource?.title || event?.name || undefined
    })
    const locale = computed(() => {
        return pageResponse.value?.locale
    })
    const metaTitle = computed(() => {
        return head.value?.metaTitle || getDefaultMetaTitle()
    })

    const getDefaultMetaTitle = (): string => {
        return (title.value ? title.value + ' – ' : '') + commonContents.value?.head?.siteName
    }

    const getMetaImage = (): string | undefined => {
        const image =
            head.value?.shareImage?.relativePath ||
            // @ts-ignore
            head.value?.images?.[0]?.relativePath ||
            // @ts-ignore
            head.value?.image?.[0]?.relativePath ||
            commonContents.value?.head?.shareImage?.relativePath

        if (image) {
            return img(image, {
                width: 1200,
                quality: 70,
            })
        } else {
            return joinURL(runtimeConfig.public.baseUrl, '/images/share.jpg')
        }
    }
    const getMetaDescription = (): string | undefined => {
        return head.value?.metaDescription || commonContents.value?.head?.metaDescription || undefined
    }

    const getHeadMeta = (): Meta[] => {
        const preview = usePreview()
        const description = getMetaDescription()
        const url = joinURL(runtimeConfig.public.baseUrl, page.value?.url || '')
        const meta = [
            { name: 'description', content: description },
            { property: 'og:title', content: metaTitle.value },
            { property: 'og:site_name', content: commonContents.value?.head?.siteName },
            { property: 'og:description', content: description },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary',
            },
            {
                hid: 'twitter:title',
                name: 'twitter:title',
                content: metaTitle.value || '',
            },
            {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: description || '',
            },
            {
                hid: 'twitter:url',
                name: 'twitter:url',
                content: url || '',
            }
        ]

        if ((page.value as RoadizNodesSources)?.noIndex || preview.value.preview) {
            meta.push({ name: 'robots', content: 'noindex' })
        }

        const metaImage = getMetaImage()
        if (metaImage) {
            meta.push({ property: 'og:image', content: metaImage })
            meta.push({
                hid: 'twitter:image',
                name: 'twitter:image',
                content: metaImage,
            })
        }

        // @ts-ignore
        return meta
    }

    const getHeadLinks = (): Link[] => {
        const links: Link[] = [
            { rel: 'canonical', href: joinURL(runtimeConfig.public.baseUrl, page.value?.url || '') },
        ]
        // alternate links
        const alternateLinksHead =
            alternateLinks.value?.map((alternateLink: RoadizAlternateLink) => {
                return {
                    hid: `alternate-${alternateLink.locale}`,
                    rel: 'alternate',
                    hreflang: alternateLink.locale,
                    href: joinURL(runtimeConfig.public.baseUrl, alternateLink.url),
                }
            })
        if (alternateLinksHead) links.push(...alternateLinksHead)

        return links
    }

    const getHeadScripts = (): Script[] => {
        const scripts = [] as Script[]

        /*
         * Google Tag Manager must not be loaded by tarteaucitron, it must configure tarteaucitron itself.
         * Notice: by using GTM you must comply with GDPR and cookie consent or just use
         * tarteaucitron with GA4, Matomo or Plausible
         */
        if (head.value?.googleTagManager) {
            scripts.push({
                type: 'application/javascript',
                innerHTML: createGoogleTagManagerScript(head.value?.googleTagManager),
            })
        }

        /*
         * Matomo Tag Manager must not be loaded by tarteaucitron, it must configure tarteaucitron itself.
         * Notice: by using MTM you must comply with GDPR and cookie consent or just use
         * tarteaucitron with GA4, Matomo or Plausible
         */
        const matomoTagManagerUrl = runtimeConfig.public?.matomo?.url
        const matomoTagManagerId = runtimeConfig.public?.matomo?.containerId
        if (matomoTagManagerId && matomoTagManagerUrl) {
            const hid = 'matomoTagManager'

            scripts.push({
                type: 'application/javascript',
                innerHTML: createMatomoTagManagerScript(matomoTagManagerId, matomoTagManagerUrl),
            })
        }

        // structured data
        if (
            page.value &&
            isEventEntity(page.value) &&
            (page.value as EventsApi.Event).datesCount // don't add structured data for festival (no event dates)
        ) {
            const structuredData = getStructuredData(page.value, img)

            if (structuredData) {
                scripts.push({
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify(structuredData),
                })
            }
        }

        return scripts
    }

    const createGoogleTagManagerScript = (id: string): string => {
        return `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${id}');
        `
    }

    const createMatomoTagManagerScript = (id: string, matomoTagManagerUrl: string): string => {
        return `
            var _mtm = window._mtm = window._mtm || [];
            _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='${matomoTagManagerUrl}/js/container_${id}.js'; s.parentNode.insertBefore(g,s);
        `
    }

    return {
        webResponse,
        locale,
        page,
        title,
        metaTitle,
        pageType,
        blocks,
        breadcrumbs,
        head,
        realms,
        hidingBlocks,
        alternateLinks,
        getHeadMeta,
        getHeadLinks,
        getHeadScripts,
    }
}
