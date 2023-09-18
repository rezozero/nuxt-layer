import { FetchOptions, FetchResponse } from 'ofetch'
import {
    RoadizAlternateLink,
    RoadizNodesSources,
    RoadizWebResponse,
} from '@roadiz/abstract-api-client/dist/types/roadiz'
import { $Fetch, NitroFetchOptions } from 'nitropack'
import { joinURL } from 'ufo'
import { CommonContent, PageResponse } from '~/types/api'
import { EventsApi } from '~/types/event'

/*
 * Decode base64 string to UTF-8 string on client-side and Node.js
 */
const b64DecodeUnicode = (str: string): string => {
    if (!process.server) {
        return decodeURIComponent(
            Array.prototype.map
                .call(window.atob(str), function (c: string) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join(''),
        )
    }
    return decodeURIComponent(
        Array.prototype.map
            .call(Buffer.from(str, 'base64').toString('binary'), function (c: string) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join(''),
    )
}

const getAlternateLinks = (response: FetchResponse<any>): Array<RoadizAlternateLink> => {
    const links = response.headers.get('link')
    if (!links) {
        return []
    }
    return links
        .split(',')
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
        ...(opts?.headers || {
            'accept-encoding': 'gzip, deflate',
        }),
    } as Record<string, string>

    if (!headers.Accept) {
        headers.Accept = 'application/ld+json'
    }

    return headers
}

/*
 * Factory: create a new fetch instance with common headers and base URL.
 */
export const apiFetchFactory = () => {
    const runtimeConfig = useRuntimeConfig()
    const headers = commonHeaders({})
    const baseURL = joinURL(
        runtimeConfig.public.apiBaseUrl || runtimeConfig.public.baseUrl,
        (runtimeConfig.public.apiEndpointPrefix as string | undefined) || '',
    )

    return $fetch.create({
        onRequest({ request, options }) {
            /*
             * Add preview token to every request if preview mode is enabled.
             */
            const preview = usePreview()
            if (preview.value.preview && preview.value.previewToken) {
                options.query = {
                    ...options.query,
                    _preview: '1',
                }
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${preview.value.previewToken}`,
                }
            }
            /*
             * Add locale to every request if it is not a web response request.
             */
            if (request.toString() !== '/web_response_by_path') {
                const webResponseLocale = useWebResponseLocale()
                const { $i18n } = useNuxtApp()
                options.query = {
                    ...options.query,
                    _locale: webResponseLocale.value?.locale || $i18n.locale.value || $i18n.defaultLocale.toString(),
                }
            }
        },
        onResponseError({ request, response }) {
            const lastApiFetchError = useLastApiFetchError()
            lastApiFetchError.value = {
                statusCode: response.status,
                responseBody: response._data,
            }
            console.debug('[apiFetch response error]', request, response.status, response.body)
        },
        headers,
        baseURL,
    })
}

/*
 * Fetch a page from Roadiz API and return its alternate links extracted from response headers.
 * If common content are not loaded yet, it will fetch them.
 */
const webResponseFetch = async (relativePath: string, opts?: NitroFetchOptions<any, any>): Promise<PageResponse> => {
    const { $i18n, $apiFetch } = useNuxtApp()
    const webResponseLocale = useWebResponseLocale()

    const response = await $apiFetch.raw<RoadizWebResponse>('/web_response_by_path', {
        ...opts,
        method: 'GET',
        query: {
            path: relativePath,
        },
    })
    const alternateLinks = getAlternateLinks(response)
    const webResponse = response._data
    const item = webResponse?.item as RoadizNodesSources | EventsApi.Event | undefined
    const locale = (item as RoadizNodesSources)?.translation?.locale || (item as EventsApi.Event)?.locale || undefined

    if (locale) {
        /*
         * Fetch common contents only if locale has changed
         */
        if (process.server && webResponseLocale.value.locale !== locale) {
            /*
             * Fetch common contents if locale has changed
             */
            useCommonContents().value = await $apiFetch<CommonContent>('/common_content', {
                method: 'GET',
                query: {
                    _locale: locale,
                },
            })
        }
        webResponseLocale.value = { locale }
        // Set i18n locale on both client and server side
        await $i18n.setLocale(locale)
    }

    return {
        webResponse,
        alternateLinks,
        locale,
    } as PageResponse
}

export default defineNuxtPlugin((nuxtApp) => {
    // called right after a new locale has been set
    nuxtApp.hook('i18n:localeSwitched', async ({ oldLocale, newLocale }) => {
        if (oldLocale !== newLocale) {
            /*
             * Fetch common contents again if locale has changed
             */
            useCommonContents().value = await (nuxtApp.$apiFetch as $Fetch)<CommonContent>('/common_content', {
                method: 'GET',
                query: {
                    _locale: newLocale,
                },
            })
        }
    })

    nuxtApp.hook('app:beforeMount', async (vueApp) => {
        const webResponseLocale = useWebResponseLocale()
        if (webResponseLocale.value.locale && webResponseLocale.value.locale !== vueApp.$nuxt.$i18n.locale.value) {
            console.debug('[app:beforeMount] Set i18n locale to', webResponseLocale.value.locale)
            await vueApp.$nuxt.$i18n.setLocale(webResponseLocale.value.locale)
        }
    })

    return {
        parallel: true,
        provide: {
            apiFetch: apiFetchFactory(),
            webResponseFetch,
        },
    }
})
