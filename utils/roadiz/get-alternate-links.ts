import { FetchResponse } from 'ofetch/dist/node'
import { RoadizAlternateLink } from '@roadiz/abstract-api-client/dist/types/roadiz'
import { b64DecodeUnicode } from '~/utils/roadiz/b64-decode-unicode'

export function getAlternateLinks(response: FetchResponse<any>): Array<RoadizAlternateLink> {
    const links = response.headers.get('link')

    if (!links) {
        return []
    }

    return links
        .split(',')
        .filter((link: string) => {
            return link
                .split(';')
                .map((attribute) => attribute.trim())
                .includes('type="text/html"')
        })
        .map((link: string) => {
            const attributes = link.split(';')
            const title = attributes[3]?.split('title="').join('').split('"').join('').trim() || undefined

            return {
                url: attributes[0].split('<').join('').split('>').join('').trim(),
                locale: attributes[2].split('hreflang="').join('').split('"').join('').trim(),
                // Must decode translation name from base64 because headers are ASCII only
                title: title ? b64DecodeUnicode(title) : undefined,
            } as RoadizAlternateLink
        })
}
