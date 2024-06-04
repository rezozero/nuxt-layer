import type { MaybeRef } from 'vue'
import { toDisplayString } from 'vue'
import { removeNullishNestedKeys } from '~/utils/null'
import type { Script } from '@unhead/schema'

type structuredDataContent = Record<string, unknown>

export function getStructuredDataScript(content: MaybeRef<structuredDataContent>): Script {
    const jsonLdContent = {
        '@context': 'https://schema.org',
        ...removeNullishNestedKeys(toValue(content)),
    }

    return {
        type: 'application/ld+json',
        innerHTML: toDisplayString(jsonLdContent).replaceAll(
            /"@id":\s?"\/api\/\.well-known\/genid\/([^"]+)",\s*/gm, // Remove auto genid from structured data. It could lead Google to follow them as links, plus it is useless.
            '',
        ),
    }
}
