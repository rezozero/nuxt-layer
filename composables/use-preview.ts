export interface PreviewState {
    preview: boolean,
    previewToken: string | undefined,
}

export default function () {
    return useState<PreviewState>('preview', () => {
        return {
            preview: false,
            previewToken: undefined,
        }
    })
}
