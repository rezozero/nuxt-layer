import type { JsonLdObject } from '@roadiz/types'

export function isEntityType(entity: JsonLdObject, type: string): boolean {
    return entity['@type'] === type
}
