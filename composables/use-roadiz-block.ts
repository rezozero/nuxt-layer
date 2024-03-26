import type { RoadizNodesSources } from '@roadiz/types'
import type { RoadizBlockProps } from '~/types/roadiz'

export interface UseRoadizBlockOptions {
    props: RoadizBlockProps
}

export function useRoadizBlock<T extends RoadizNodesSources>({ props }: UseRoadizBlockOptions) {
    const walker = computed(() => props.walker)
    const item = computed<T>(() => walker.value.item as T)
    const children = computed(() => walker.value.children)
    const childrenItems = computed(() => children.value.map((walker) => walker.item))

    return { item, children, childrenItems }
}
