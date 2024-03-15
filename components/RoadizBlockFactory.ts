import type { FunctionalComponent, VNodeChild } from 'vue'
import { h, resolveDynamicComponent, resolveComponent } from 'vue'
import type { RoadizWalker } from '@roadiz/types'

export interface RoadizBlockFactoryProps {
    prefix?: string
    blocks: RoadizWalker[]
    [key: string]: unknown
}

const isComponent = (component: string): boolean => {
    return typeof resolveDynamicComponent(component) !== 'string'
}

const RoadizBlockFactory: FunctionalComponent<RoadizBlockFactoryProps> = ({ blocks, prefix }, context): VNodeChild => {
    const blocksWithComponent = blocks.filter((block) => {
        const componentName = prefix ? prefix + block.item['@type'] : block.item['@type']
        return isComponent(componentName)
    })
    return blocksWithComponent.map((block, index, blocks) => {
        const componentName = prefix ? prefix + block.item['@type'] : block.item['@type']
        return h(resolveComponent(componentName), {
            walker: block,
            index,
            numBlocks: blocks.length,
            ...context.attrs,
        })
    })
}

export default RoadizBlockFactory
