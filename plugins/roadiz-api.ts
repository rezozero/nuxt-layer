import {HydraCollection} from "@roadiz/abstract-api-client/dist/types/hydra";
import {JsonLdObject} from "@roadiz/abstract-api-client/dist/types/jsonld";
import {FetchOptions, FetchResponse} from "ofetch";
import {RoadizAlternateLink, RoadizNodesSources} from "@roadiz/abstract-api-client/dist/types/roadiz";
import {CommonContent} from "~/composables/use-common-contents";

export type ExtendedApiResponse = HydraCollection<JsonLdObject>|JsonLdObject
export interface ApiFetchResponse<T extends ExtendedApiResponse> {
    responseItem: T,
    alternateLinks: Array<RoadizAlternateLink>
}

const getAlternateLinks = (response: FetchResponse<any>): Array<RoadizAlternateLink> => {
    if (!response.headers.has('link')) return []
    const links = response.headers.get('link')
    if (!links) return []

    return links.split(',')
        .filter((link: string) => {
            return link
                .split(';')
                .map((attribute) => attribute.trim())
                .includes('type="text/html"')
        })
        .map((link: string) => {
            const attributes = link.split(';')
            const title = attributes[3]?.split('title="').join('').split('"').join('').trim() || undefined

            return {
                url: attributes[0].split('<').join('').split('>').join('').trim(),
                locale: attributes[2].split('hreflang="').join('').split('"').join('').trim(),
                // Must decode translation name from base64 because headers are ASCII only
                title: title ? b64DecodeUnicode(title) : undefined,
            } as RoadizAlternateLink
        })
}

const b64DecodeUnicode = (str: string): string => {
    return decodeURIComponent(
        Array.prototype.map
            .call(Buffer.from(str, 'base64').toString('binary'), function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )
}

const commonHeaders = (opts?: FetchOptions): Record<string, string> => {
    const headers = {
        ...opts?.headers || {
            'accept-encoding': 'gzip, deflate'
        }
    } as Record<string, string>

    if (!headers.Accept) {
        headers.Accept = 'application/ld+json'
    }

    return headers
}

const apiFetch = async<T extends ExtendedApiResponse>(relativePath: string, opts?: FetchOptions): Promise<T> => {
    const runtimeConfig = useRuntimeConfig()
    const headers= commonHeaders(opts)

    return await $fetch<T>(
        `${runtimeConfig.public.apiBaseUrl}${relativePath}`,
        // @ts-ignore
        {
            ...opts,
            ...{
                headers,
            }
        }
    )
}

/*
 * Fetch a page from Roadiz API and return its alternate links extracted from response headers.
 */
const webResponseFetch = async<T extends ExtendedApiResponse>(relativePath: string, opts?: FetchOptions): Promise<ApiFetchResponse<T>> => {
    const { locale } = useI18n()
    let alternateLinks: Array<RoadizAlternateLink> = []
    const responseItem = await apiFetch<T>(
        relativePath,
        // @ts-ignore
        {
            ...opts,
            async onResponse({ request, response, options }) {
                alternateLinks = getAlternateLinks(response)
                console.log(alternateLinks)
            }
        }
    )

    console.log('translation', (responseItem as RoadizNodesSources)?.translation)
    if ((responseItem as RoadizNodesSources)?.translation && (responseItem as RoadizNodesSources).translation?.locale) {
        const switchLocalePath = useSwitchLocalePath()
        const newLocale = (responseItem as RoadizNodesSources).translation?.locale

        if (newLocale) {
            console.log('switchLocalePath', newLocale)
            /*
             * Switch i18n locale if locale has changed
             */
            switchLocalePath(newLocale)

            /*
             * Fetch common contents if locale has changed
             */
            console.log('useCommonContents', newLocale)
            if (useCommonContents().value === null || locale.value !== newLocale) {
                useCommonContents().value = await apiFetch<CommonContent>('/common_content', {
                    query: {
                        _locale: (responseItem as RoadizNodesSources)?.translation?.locale
                    }
                })
            }
        }
    }



    return {
        responseItem,
        alternateLinks
    }
}


export default defineNuxtPlugin(() => {
    return {
        provide: {
            apiFetch,
            webResponseFetch,
        }
    }
})
