import {CommonContent} from "~/composables/use-common-contents";

export default defineNuxtPlugin(async () => {
    const { $apiFetch } = useNuxtApp()
    useCommonContents().value = await $apiFetch<CommonContent>('/common_content')
})
