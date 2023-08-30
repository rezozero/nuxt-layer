import {SitemapStream, streamToPromise} from 'sitemap'
import {HydraCollection} from "@roadiz/abstract-api-client/dist/types/hydra";
import {RoadizNodesSources, RoadizTranslation} from "@roadiz/abstract-api-client/dist/types/roadiz";
import {NitroRuntimeConfig} from "nitropack";

const fetchAllUrlsForLocale = async (
    runtimeConfig: NitroRuntimeConfig,
    _locale = 'fr',
    noIndex: boolean | undefined = false
): Promise<Array<string>> => {
    let page = 1
    let active = true
    const refs = [] as Array<string>

    do {
        const data = await $fetch<HydraCollection<RoadizNodesSources>>('/nodes_sources', {
            headers: {
                'accept-encoding': 'gzip, deflate',
                Accept: 'application/ld+json'
            },
            params: {
                'node.nodeType.reachable': true,
                noIndex,
                properties: ['url'],
                page,
                _locale,
            },
            baseURL: runtimeConfig.public.apiBaseUrl
        })
        if (data && data['hydra:member'] && data['hydra:totalItems']) {
            data['hydra:member'].forEach((entry): void => {
                if (entry.url) {
                    refs.push(entry.url)
                }
            })
            active = !!(data['hydra:view'] && data['hydra:view']['hydra:next'])
            ++page
        }
    } while (active)

    return refs
}

export default defineEventHandler(async () => {
    const runtimeConfig = useRuntimeConfig()
    const sitemap = new SitemapStream({
        hostname: runtimeConfig.public.baseUrl
    })

    sitemap.write({
        url: '/'
    })

    const data = await $fetch<HydraCollection<RoadizTranslation>>('/translations', {
        params: { available: true },
        baseURL: runtimeConfig.public.apiBaseUrl
    })
    const locales = data['hydra:member'].map(({ locale }) => locale)

    const promises = locales.map(async (locale) => {
        const urls = await fetchAllUrlsForLocale(runtimeConfig, locale)
        urls.forEach((url) => {
            sitemap.write({
                url
            })
        })
    })

    await Promise.all(promises)

    sitemap.end()

    return streamToPromise(sitemap)
})
