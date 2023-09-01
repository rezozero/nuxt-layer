import {
    RoadizAlternateLink,
    RoadizNodesSources,
    RoadizNodesSourcesHead,
    RoadizWalker,
    RoadizWebResponse,
} from '@roadiz/abstract-api-client/dist/types/roadiz'

interface HydraError {
    "@context": string,
    "@type": string,
    "hydra:title": string,
    "hydra:description": string,
    "message"?: string,
    "trace": Array<HydraErrorTraceItem>,
}

interface HydraErrorTraceItem {
    file: string,
    line: number,
    function: string,
    class: string,
    type: string,
    args: Array<string>,
}

interface PageResponse {
    webResponse: RoadizWebResponse | undefined,
    alternateLinks?: RoadizAlternateLink[]
}

interface CommonContent {
    home?: RoadizNodesSources
    head?: RoadizNodesSourcesHead
    menus?: Record<string, RoadizWalker>
    footers?: Record<string, RoadizWalker>
}
