import { useFetchPage } from './use-fetch-page'

export async function useDynamicPage() {
    const { webResponse } = await useFetchPage()

    const {
        page,
        // locale: webResponseLocale,
        metaTitle,
        title,
        // alternateLinks,
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
        // blocks,
        head,
    }
}
