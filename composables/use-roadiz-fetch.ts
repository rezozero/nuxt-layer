import type { AvailableRouterMethod, NitroFetchRequest } from 'nitropack'
import { FetchError } from 'ofetch'
import type { Ref } from 'vue'
import type { AsyncData, FetchResult, UseFetchOptions } from 'nuxt/app'
import type { KeysOf, PickFrom } from '#app/composables/asyncData'

// @see https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
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
): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | null>
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
    arg1?: string | Omit<UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>, 'lazy'>,
    arg2?: string,
) {
    const [opts = {}, autoKey] = typeof arg1 === 'string' ? [{}, arg1] : [arg1, arg2]

    return useFetch<ResT, ErrorT, ReqT, Method, _ResT, DataT, PickKeys, DefaultT>(
        request,
        {
            ...opts,
            $fetch: opts?.$fetch || useRoadizFetchFactory(),
        },
        // @ts-expect-error we pass an extra argument with the resolved auto-key to prevent another from being injected
        autoKey,
    )
}
