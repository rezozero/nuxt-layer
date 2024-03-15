import type { RoadizNodesSources } from '@roadiz/types'

export default function getNodesSourcesTitle(data: RoadizNodesSources | undefined): string | undefined {
    return data?.metaTitle || data?.title
}
