import {JsonLdObject} from "@roadiz/abstract-api-client/dist/types/jsonld";
import {RoadizNodesSources, RoadizNodesSourcesHead, RoadizWalker} from "@roadiz/abstract-api-client/dist/types/roadiz";

export interface CommonContent extends JsonLdObject {
    home?: RoadizNodesSources
    head?: RoadizNodesSourcesHead
    menus?: Record<string, RoadizWalker>
    footers?: Record<string, RoadizWalker>
}

export default function () {
    return useState<CommonContent>('common_content')
}
