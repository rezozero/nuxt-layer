export default {
    title: 'relationships',
    type: 'object',
    properties: {
        organizations: {
            type: 'array',
            widget: 'organizations',
            title: 'Organizations',
            description: 'Description',
            propertyOrder: 9
        },
        people: {
            type: 'array',
            widget: 'people',
            title: 'People',
            description: 'Description',
            propertyOrder: 9
        },
        documents: {
            type: 'array',
            widget: 'documents',
            title: 'Documents',
            description: 'Description',
            propertyOrder: 9
        },
        taxa: {
            type: 'array',
            widget: 'taxa',
            title: 'Taxons',
            description: 'Taxons',
            propertyOrder: 9
        },
        single_organization: {
            type: 'string',
            widget: 'organizations',
            title: 'Single Organization',
            description: 'Description',
            propertyOrder: 9
        },
        single_person: {
            type: 'string',
            widget: 'people',
            title: 'Single person',
            description: 'Description',
            propertyOrder: 9
        },
        single_document: {
            type: 'string',
            widget: 'documents',
            title: 'Single Document',
            description: 'Description',
            propertyOrder: 9
        },
        single_taxon: {
            type: 'string',
            widget: 'taxa',
            title: 'Single Taxon',
            description: 'Taxons',
            propertyOrder: 9
        }
    }
}
