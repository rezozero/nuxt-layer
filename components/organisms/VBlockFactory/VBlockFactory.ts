import type { FunctionalComponent, PropType, VNodeChild } from 'vue'
import { h, resolveDynamicComponent, resolveComponent } from 'vue'
import { RoadizWalker } from '@roadiz/abstract-api-client/dist/types/roadiz'

export interface FactoryPropsTypes {
    blocks: RoadizWalker[]
}

const isComponent = (component: string): boolean => {
    return typeof resolveDynamicComponent(component) !== 'string'
}

const VBlockFactory: FunctionalComponent<FactoryPropsTypes> = ({ blocks }, context): VNodeChild => {
    const blocksWithComponent = blocks.filter((block) => isComponent(block.item['@type']))
    return blocksWithComponent.map((block, index, blocks) => {
        return h(resolveComponent(block.item['@type']), {
            walker: block,
            index,
            numBlocks: blocks.length,
            ...context.attrs,
        })
    })
}

VBlockFactory.props = {
    blocks: {
        type: Array as PropType<RoadizWalker[]>,
        required: true,
    },
}

export default VBlockFactory
