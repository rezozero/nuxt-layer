import type { RoadizWalker } from '@roadiz/types'

interface RoadizBlockProps {
    walker: RoadizWalker
    index: number
    blocks?: RoadizWalker[]
    numBlocks?: number | string
}
