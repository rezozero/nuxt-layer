import { RoadizNodesSources, RoadizWebResponse } from '@roadiz/abstract-api-client/dist/types/roadiz'
import { EventsApi } from '../types/event'

export async function useFetchPage() {
    const { $apiFetch } = useNuxtApp()
    const route = useRoute()
    const response = await $apiFetch.raw<RoadizWebResponse>('/web_response_by_path', {
        method: 'GET',
        query: {
            path: route.path,
        },
    })
    const webResponse = response._data
    const item = webResponse?.item as RoadizNodesSources | EventsApi.Event | undefined
    const locale = (item as RoadizNodesSources)?.translation?.locale || (item as EventsApi.Event)?.locale || undefined

    return {
        response,
        webResponse,
        item,
        locale,
    }
}
