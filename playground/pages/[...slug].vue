<template>
    <div>
        <!--        <h1>-->
        <!--            <nuxt-link v-if="homePage" :to="homePage.url">{{ siteName }}</nuxt-link>-->
        <!--        </h1>-->

        <!--        <nav>-->
        <!--            <p>i18n Locale: {{ locale }}</p>-->
        <!--            <ul>-->
        <!--                <li v-for="(alternateLink, index) in alternateLinks" :key="index">-->
        <!--                    <nuxt-link v-if="alternateLink.locale !== page?.translation?.locale" :to="alternateLink.url">{{-->
        <!--                        alternateLink.title-->
        <!--                    }}</nuxt-link>-->
        <!--                    <span v-else>{{ alternateLink.title }}</span>-->
        <!--                </li>-->
        <!--            </ul>-->
        <!--        </nav>-->

        <!--        <nav v-if="mainMenuWalker">-->
        <!--            <p>Main menu</p>-->
        <!--            <ul>-->
        <!--                <li v-for="(subWalker, index) in mainMenuWalker.children" :key="index">-->
        <!--                    <nuxt-link :to="subWalker.item.url">{{ subWalker.item.title }}</nuxt-link>-->
        <!--                </li>-->
        <!--            </ul>-->
        <!--        </nav>-->
        <!--        <v-breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" :home-page="homePage" />-->
        <h1 v-if="title">{{ title }}</h1>
        <!--        <v-block-factory :blocks="blocks"></v-block-factory>-->
        <!--        <v-article-container v-if="articleContainer" :article-container="page" />-->
        <!--        &lt;!&ndash;  Example v-form with modelValue  &ndash;&gt;-->
        <!--        <v-form-->
        <!--            v-if="pageEntity"-->
        <!--            v-model="formData"-->
        <!--            :components-map="defaultComponentsMap"-->
        <!--            :schema="formSchema"-->
        <!--            @submit="onFormSubmit"-->
        <!--        ></v-form>-->

        <!--        <footer>-->
        <!--            <nav v-if="footerMenuWalker">-->
        <!--                <p>Footer menu</p>-->
        <!--                <ul>-->
        <!--                    <li v-for="(subWalker, index) in footerMenuWalker.children" :key="index">-->
        <!--                        <nuxt-link :to="subWalker.item.url">{{ subWalker.item.title }}</nuxt-link>-->
        <!--                    </li>-->
        <!--                </ul>-->
        <!--            </nav>-->
        <!--        </footer>-->
    </div>
</template>

<script setup lang="ts">
// import { RoadizWalker } from '@roadiz/abstract-api-client/dist/types/roadiz'
// import defaultSchema from '~layer/components/organisms/VForm/schemas/all-fields.js'
// import { isArticleContainerEntity, isPageEntity } from '~layer/utils/roadiz/entity'
// import VBreadcrumbs from '~/components/molecules/VBreadcrumbs/VBreadcrumbs.vue'

// const { $webResponseFetch } = useNuxtApp()
// const { t, locale } = useI18n()
// const route = useRoute()
//
// const pagePath = computed(() => {
//     return route.path
// })
//
// const { data: fetchResponse } = await useAsyncData<PageResponse>(
//     'web_response',
//     async (): Promise<PageResponse> => await $webResponseFetch(pagePath.value),
// )
// if (!fetchResponse.value) {
//     /*
//      * Throw a Nuxt Error using the same statusCode and message as the API response
//      */
//     const lastApiFetchError = useLastApiFetchError()
//     const body = lastApiFetchError.value?.responseBody as HydraError
//     const message = body?.['hydra:description'] || body?.message || t('error.page_not_found').toString()
//     throw createError({
//         statusCode: lastApiFetchError.value?.statusCode,
//         message: '[web_response] ' + message,
//         fatal: true,
//     })
// }
//
// const {
//     page,
//     // locale: webResponseLocale,
//     metaTitle,
//     title,
//     blocks,
//     alternateLinks,
//     getHeadMeta,
//     getHeadLinks,
//     getHeadScripts,
//     breadcrumbs,
// } = useWebResponse(fetchResponse, useCommonContents())
//
// useHead({
//     htmlAttrs: {
//         lang: locale.value,
//     },
//     title: metaTitle.value,
//     meta: getHeadMeta(),
//     link: getHeadLinks(),
//     script: getHeadScripts(),
// })

const { webResponse } = await useFetchPage()
const pageResponse = computed(() => ({
    webResponse,
}))
const { title } = useWebResponse(pageResponse, useCommonContents())

//
// const homePage = computed(() => {
//     return useCommonContents().value?.home
// })
//
// // const siteName = computed(() => {
// //     return useCommonContents().value?.head?.siteName
// // })
//
// const mainMenuWalker = computed(() => {
//     return useCommonContents().value?.menus?.mainMenuWalker as RoadizWalker
// })
//
// // const footerMenuWalker = computed(() => {
// //     return useCommonContents().value?.menus?.footerMenuWalker as RoadizWalker
// // })
//
// const articleContainer = computed(() => {
//     return isArticleContainerEntity(page.value)
// })
//
// const pageEntity = computed(() => {
//     return isPageEntity(page.value)
// })
// /*
//  * VForm Example configuration
//  */
// const formData = ref({})
// const defaultComponentsMap = computed(() => {
//     return useDefaultComponentsMap()
// })
// const formSchema = computed(() => {
//     return defaultSchema
// })
// const onFormSubmit = () => {
//     console.log(formData.value)
// }
</script>
