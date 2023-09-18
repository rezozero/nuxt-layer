import { MergeHead } from 'zhead'
import { MaybeRefOrGetter } from 'vue'

export function usePage<T extends MergeHead>({ head }: { head: MaybeRefOrGetter<UseHeadInput<T>> }) {
    const { locale } = useI18n()

    useHead({
        htmlAttrs: {
            lang: locale.value,
        },
        ...toValue<UseHeadInput<T>>(head),
    })
}
