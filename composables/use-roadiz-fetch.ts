import type { AvailableRouterMethod, NitroFetchRequest } from 'nitropack'
import { FetchError } from 'ofetch'
import type { Ref } from 'vue'
import type { KeysOf, PickFrom } from 'nuxt/dist/app/composables/asyncData'
import type { AsyncData, FetchResult, UseFetchOptions } from 'nuxt/app'

export function useRoadizFetch<
    ResT = void,
    ErrorT = FetchError,
    ReqT extends NitroFetchRequest = NitroFetchRequest,
    Method extends AvailableRouterMethod<ReqT> = ResT extends void
        ? 'get' extends AvailableRouterMethod<ReqT>
            ? 'get'
            : AvailableRouterMethod<ReqT>
        : AvailableRouterMethod<ReqT>,
    _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
    DataT = _ResT,
    PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
    DefaultT = DataT,
>(
    request: Ref<ReqT> | ReqT | (() => ReqT),
    opts?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>,
): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | null> {
    return useFetch<ResT, ErrorT, ReqT, Method, _ResT, DataT, PickKeys, DefaultT>(request, {
        ...opts,
        $fetch: opts?.$fetch || useRoadizFetchFactory(),
    })
}
