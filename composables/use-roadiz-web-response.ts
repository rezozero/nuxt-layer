import type { RoadizWebResponse } from '@roadiz/types'
import { joinURL } from 'ufo'

export async function useRoadizWebResponse<T>(path?: string) {
    path = joinURL('/', path || useRoute().path)

    const fetch = useRoadizFetchFactory()
    const { data } = await useAsyncData(async () => {
        try {
            const response = await fetch.raw<RoadizWebResponse>('/web_response_by_path', {
                method: 'GET',
                query: {
                    path,
                },
            })
            const headersLink = response.headers.get('link')
            const alternateLinks = headersLink ? getResponseAlternateLinks(headersLink) : []

            return { webResponse: response._data, alternateLinks }
        } catch (error) {
            console.error('Error=', error)

            return { error }
        }
    })
    const webResponse = data.value?.webResponse

    return {
        alternateLinks: data.value?.alternateLinks || [],
        webResponse,
        item: webResponse?.item as T | undefined,
        error: data.value?.error,
    }
}
