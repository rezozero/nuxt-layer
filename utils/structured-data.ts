import { h, toDisplayString } from 'vue'
import type { MaybeRef } from 'vue'

type structuredDataContent = Record<string, unknown>

const isNullishValue = (v: unknown) => {
    if (typeof v === 'number') return false
    return v === null || v === undefined || !Object.keys(v).length || (Array.isArray(v) && !v.length)
}

function removeNullishNestedKeys(obj: structuredDataContent) {
    Object.keys(obj).forEach((key) => {
        const value = obj[key]

        if (isNullishValue(value)) delete obj[key]
        else if (Array.isArray(value) && value.every((v) => isNullishValue(v))) delete obj[key]
        else if (value && typeof value === 'object') removeNullishNestedKeys(value as structuredDataContent)
    })

    return obj
}

export function getStructuredDataScript(content: MaybeRef<structuredDataContent>) {
    const jsonLdContent = {
        '@context': 'https://schema.org',
        ...removeNullishNestedKeys(toValue(content)),
    }

    return h('script', {
        type: 'application/ld+json',
        innerHTML: toDisplayString(jsonLdContent),
    })
}
