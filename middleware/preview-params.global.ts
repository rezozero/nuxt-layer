import {defineNuxtRouteMiddleware} from '#app'

/*
 * This middleware is used to set preview mode from query parameters.
 * It will populate `preview` and `previewToken` reactive states.
 */
export default defineNuxtRouteMiddleware((to) => {
    const previewState = usePreview()
    if (to.query?._preview === '1' && to.query?.token) {
        previewState.value.preview = true
        previewState.value.previewToken = to.query.token as string
    }
})
