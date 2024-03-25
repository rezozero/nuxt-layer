import type { CacheControlOptions } from '~/composables/use-cache-control'

/*
 * This plugin is used to set the cache control headers for the response.
 * It uses the useCacheControl composable to define cache control options.
 * It also checks for cookies and response status to determine if the response should be cached.
 */
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:response', (_response, { event }) => {
        const qs = getQuery(event)

        if (getResponseStatus(event) !== 200) {
            return
        }

        /*
         * If the request is a redirect, we don't want to cache it.
         * Or if the request is an error, we don't want to cache it.
         */
        if (qs.url && qs.statusCode) {
            setResponseHeader(event, 'Cache-Control', `private, no-cache, no-store, must-revalidate`)
            return
        }
        const cacheControl =
            event.context.cacheControl ||
            ({
                maxAge: 0,
                public: false,
            } as CacheControlOptions)
        const cookies = parseCookies(event)
        const noCacheCookies = ['cart', 'session']
        const noCache = noCacheCookies.some((cookie) => cookies[cookie]) || getResponseStatus(event) !== 200

        /*
         * Use useCacheControl composable to define cache control options
         */
        if (!noCache && cacheControl.maxAge > 0 && cacheControl.public) {
            const cacheControlHeader = [
                `public`,
                `max-age=${cacheControl.maxAge}`,
                `s-maxage=${cacheControl.sMaxAge || cacheControl.maxAge}`,
            ]
            if (cacheControl?.staleWhileRevalidate > 0) {
                cacheControlHeader.push(`stale-while-revalidate=${cacheControl.staleWhileRevalidate}`)
            }
            setResponseHeader(
                event,
                'Cache-Control',
                cacheControlHeader.join(', ')
            )
        } else {
            setResponseHeader(event, 'Cache-Control', `private, no-cache, no-store, must-revalidate`)
        }
    })
})
