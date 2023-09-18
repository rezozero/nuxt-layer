import { useFetchPage } from './use-fetch-page'
import { HydraError, PageResponse } from '~/types/api'

export async function useDynamicPage() {
    const { webResponse } = await useFetchPage()

    const {
        page,
        // locale: webResponseLocale,
        metaTitle,
        title,
        alternateLinks,
        getHeadMeta,
        getHeadLinks,
        getHeadScripts,
        breadcrumbs,
    } = useWebResponse(webResponse, useCommonContents())

    const head = () => {
        return {
            title: metaTitle.value,
            meta: getHeadMeta(),
            link: getHeadLinks(),
            script: getHeadScripts(),
        }
    }

    return {
        page,
        breadcrumbs,
        title,
        blocks,
        head,
    }
}
