import { JsonLdObject } from '@roadiz/abstract-api-client/dist/types/jsonld'

export function isEntityType(entity: JsonLdObject | undefined, type: string): boolean {
    return entity?.['@type'] === type
}

export function isEventEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'http://schema.org/Event')
}

export function isPersonEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'http://schema.org/Person')
}

export function isPageEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'Page')
}

export function isBlogPostContainerEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'BlogPostContainer')
}

export function isBlogPostEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'BlogPost')
}

export function isArticleContainerEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'ArticleContainer')
}

export function isArticleEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'Article')
}

export function isEventListingEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'EventListing')
}

export function isSeasonEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'https://schema.org/Season')
}

export function isTagEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'Tag')
}

export function isProductionEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'Production')
}

export function isProductionListingEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'ProductionListing')
}

export function isDocumentListingEntity(entity: JsonLdObject | undefined): boolean {
    return isEntityType(entity, 'DocumentListing')
}
