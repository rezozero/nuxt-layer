export interface WebResponseLocaleState {
    locale: string | undefined
}

export default function () {
    return useState<WebResponseLocaleState>('web_response_locale', () => {
        return {
            locale: undefined,
        }
    })
}
