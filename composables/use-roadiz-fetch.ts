import type { AsyncDataOptions } from '#app'

export function useRoadizFetch<T>(url?: string | AsyncDataOptions<T>, options?: AsyncDataOptions<T>) {
    const fetch = useRoadizFetchFactory()

    return useAsyncData<T>(() => fetch(url), options)
}
