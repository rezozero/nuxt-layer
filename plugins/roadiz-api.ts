import {FetchOptions, FetchResponse} from "ofetch";
import {
    RoadizAlternateLink,
    RoadizNodesSources,
    RoadizWebResponse
} from "@roadiz/abstract-api-client/dist/types/roadiz";
import {NitroFetchOptions} from "nitropack";
import {CommonContent, PageResponse} from "~/types/api";
import {EventsApi} from "~/types/event";

const b64DecodeUnicode = (str: string): string => {
    if (!process.server) {
        return decodeURIComponent(
            Array.prototype.map
                .call(window.atob(str), function (c: string) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join('')
        )
    }
    return decodeURIComponent(
        Array.prototype.map
            .call(Buffer.from(str, 'base64').toString('binary'), function (c: string) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )
}

const getAlternateLinks = (response: FetchResponse<any>): Array<RoadizAlternateLink> => {
    const links = response.headers.get('link')
    if (!links) {
        return []
    }
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

export const apiFetch = () => {
    const runtimeConfig = useRuntimeConfig()
    const headers= commonHeaders({})
    const baseURL = runtimeConfig.public.apiBaseUrl

    return $fetch.create(
        {
            async onResponseError({ request, response, options }) {
                console.debug(
                    '[apiFetch response error]',
                    request,
                    response.status,
                    response.body
                )
            },
            headers,
            baseURL
        }
    )
}

/*
 * Fetch a page from Roadiz API and return its alternate links extracted from response headers.
 */
const webResponseFetch = async(relativePath: string, opts?: NitroFetchOptions<any, any>): Promise<PageResponse> => {
    const fetch = apiFetch()
    const { setLocale } = useI18n()

    const response = await fetch.raw<RoadizWebResponse>(
        relativePath,
        opts,
    )
    const alternateLinks = getAlternateLinks(response)
    const webResponse = response._data
    const item = webResponse?.item as RoadizNodesSources | EventsApi.Event | undefined
    const locale = (item as RoadizNodesSources)?.translation?.locale || (item as EventsApi.Event)?.locale || undefined

    if (locale) {
        await setLocale(locale)
    }
    if (!useCommonContents().value && locale) {
        /*
         * Fetch common contents if locale has changed
         */
        useCommonContents().value = await fetch<CommonContent>('/common_content', {
            query: {
                _locale: locale
            }
        })
    }

    return {
        webResponse,
        alternateLinks
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    // called right after a new locale has been set
    nuxtApp.hook('i18n:localeSwitched', async ({oldLocale, newLocale}) => {
        if (oldLocale !== newLocale) {
            const fetch = apiFetch()
            useCommonContents().value = await fetch<CommonContent>('/common_content', {
                query: {
                    _locale: newLocale
                }
            })
        }
    })

    return {
        provide: {
            apiFetch: apiFetch(),
            webResponseFetch,
        }
    }
})
