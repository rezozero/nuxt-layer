interface UsePreviewState {
    isActive: boolean
    token: string | undefined
}

interface UsePreviewOptions extends UsePreviewState {}

export function useRoadizPreview(options?: UsePreviewOptions) {
    const state = useState<UsePreviewState>('preview', () => ({
        isActive: false,
        token: undefined as string | undefined,
    }))

    const isActive = computed({
        get() {
            return state.value.isActive
        },
        set(value: boolean) {
            state.value.isActive = value
        },
    })

    const token = computed({
        get() {
            return state.value.token
        },
        set(value: string | undefined) {
            state.value.token = value
        },
    })

    function reset() {
        state.value = {
            isActive: false,
            token: undefined,
        }
    }

    if (options) {
        if (options.isActive) isActive.value = options.isActive
        if (options.token) token.value = options.token
    }

    return {
        isActive,
        token,
        reset,
    }
}
