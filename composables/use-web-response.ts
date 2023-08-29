import {Ref} from "@vue/reactivity";
import {RoadizWebResponse} from "@roadiz/abstract-api-client/dist/types/roadiz";
import {ApiFetchResponse} from "~/plugins/roadiz-api";

export default function (webResponseData: Ref<ApiFetchResponse<RoadizWebResponse> | null>) {

    const pageType = computed(() => {
        return webResponseData.value?.responseItem?.item?.["@type"]
    })
    const page = computed(() => {
        return webResponseData.value?.responseItem?.item
    })
    const blocks = computed(() => {
        return webResponseData.value?.responseItem?.blocks
    })
    const breadcrumbs = computed(() => {
        return webResponseData.value?.responseItem?.breadcrumbs
    })
    const head = computed(() => {
        return webResponseData.value?.responseItem?.head
    })
    const realms = computed(() => {
        return webResponseData.value?.responseItem?.realms
    })
    const hidingBlocks = computed(() => {
        return webResponseData.value?.responseItem?.hidingBlocks
    })
    const alternateLinks = computed(() => {
        return webResponseData.value?.alternateLinks
    })

    return {
        page,
        pageType,
        blocks,
        breadcrumbs,
        head,
        realms,
        hidingBlocks,
        alternateLinks
    }
}
