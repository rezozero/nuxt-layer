import { RoadizNodesSources, RoadizWebResponse } from '@roadiz/abstract-api-client/dist/types/roadiz'
import { EventsApi } from '../types/event'
import { getAlternateLinks } from '~/utils/roadiz/get-alternate-links'

export async function useFetchPage() {
    const { $apiFetch } = useNuxtApp()
    const route = useRoute()
    const asyncData = await useAsyncData(`fetch-page-${route.fullPath}`, async () => {
        const response = await $apiFetch.raw<RoadizWebResponse>('/web_response_by_path', {
            method: 'GET',
            query: {
                path: route.path,
            },
        })
        const alternateLinks = getAlternateLinks(response)

        return { webResponse: response._data, alternateLinks }
    })
    const webResponse = asyncData.data.value?.webResponse
    const item = webResponse?.item as RoadizNodesSources | EventsApi.Event | undefined
    const locale = (item as RoadizNodesSources)?.translation?.locale || (item as EventsApi.Event)?.locale || undefined

    return {
        alternateLinks: asyncData.data.value?.alternateLinks || [],
        webResponse,
        item,
        locale,
    }
}
