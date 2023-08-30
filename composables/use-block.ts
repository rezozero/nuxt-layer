import {Ref} from "@vue/reactivity";
import {RoadizNodesSources, RoadizWalker} from "@roadiz/abstract-api-client/dist/types/roadiz";

export default function (
    blockWalker: RoadizWalker | undefined
) {
    const item = computed<RoadizNodesSources>(() => blockWalker!.item)
    const title = computed<string|undefined>(() => blockWalker!.item?.title)

    return {
        item,
        title
    }
}
