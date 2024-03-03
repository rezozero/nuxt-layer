import type { RoadizNodesSources, RoadizWalker } from '@roadiz/types'

export interface BlockProps {
    walker: RoadizWalker
    index: number
    blocks?: RoadizWalker[]
    numBlocks?: number | string
}

export function useBlock<T extends RoadizNodesSources>(blockProps: BlockProps) {
    const walker = computed(() => blockProps.walker)
    const item = computed<T>(() => walker.value.item as T)
    const children = computed(() => walker.value.children)
    const childrenItems = computed(() => children.value.map((walker) => walker.item))

    return { item, children, childrenItems }
}
