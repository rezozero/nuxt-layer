<template>
    <h1><nuxt-link v-if="homePage" :to="homePage.url">{{ siteName }}</nuxt-link></h1>
    <p>Locale: {{ locale }}</p>
    <nav v-if="mainMenuWalker">
        <ul>
            <li v-for="subWalker in mainMenuWalker.children">
                <nuxt-link :to="subWalker.item.url">{{ subWalker.item.title }}</nuxt-link>
            </li>
        </ul>
    </nav>
    <nav>
        <ul>
            <li v-for="alternateLink in alternateLinks">
                <nuxt-link
                        v-if="alternateLink.locale !== page?.translation?.locale"
                        :to="alternateLink.url">{{ alternateLink.title }}</nuxt-link>
                <span v-else>{{ alternateLink.title }}</span>
            </li>
        </ul>
    </nav>
    <v-breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" :home-page="homePage" />
    <h1 v-if="title">{{ title }}</h1>
    <v-block-factory :blocks="blocks"></v-block-factory>
    <v-article-container v-if="articleContainer" :article-container="page" />
<!--  Example v-form with modelValue  -->
    <v-form
        v-if="pageEntity"
        :components-map="defaultComponentsMap"
        :schema="formSchema"
        v-model="formData"
        @submit="onFormSubmit"
    ></v-form>
</template>
<script setup lang="ts">
import {RoadizWalker} from "@roadiz/abstract-api-client/dist/types/roadiz";
import useWebResponse from "~/composables/use-web-response";
import VBlockFactory from "~/components/organisms/VBlockFactory/VBlockFactory";
import {HydraError, PageResponse} from "~/types/api";
import {isArticleContainerEntity, isPageEntity} from "~/utils/roadiz/entity";
import VArticleContainer from "~/components/organisms/VArticleContainer/VArticleContainer.vue";
import VForm from "~/components/organisms/VForm/VForm.vue";
import defaultSchema from "~/components/organisms/VForm/schemas/default.js";
import VBreadcrumbs from "~/components/molecules/VBreadcrumbs/VBreadcrumbs.vue";

const { $webResponseFetch } = useNuxtApp()
const { t, locale } = useI18n()
const route = useRoute()

const pagePath = computed(() => {
    return route.path
})

const { data: fetchResponse } = await useAsyncData<PageResponse>(
    'web_response',
    async (): Promise<PageResponse> => await $webResponseFetch(pagePath.value)
)
if (!fetchResponse.value) {
    /*
     * Throw a Nuxt Error using the same statusCode and message as the API response
     */
    const lastApiFetchError = useLastApiFetchError()
    const body = lastApiFetchError.value?.responseBody as HydraError
    const message = body?.['hydra:description'] || body?.message || t('error.page_not_found').toString()
    throw createError({
        statusCode: lastApiFetchError.value?.statusCode,
        message: '[web_response] ' + message,
        fatal: true,
    })
}

const {
    page,
    metaTitle,
    title,
    blocks,
    alternateLinks,
    getHeadMeta,
    getHeadLinks,
    getHeadScripts,
    breadcrumbs
} = useWebResponse(fetchResponse, useCommonContents())

useHead({
    htmlAttrs: {
        lang: locale.value,
    },
    title: metaTitle.value,
    meta: getHeadMeta(),
    link: getHeadLinks(),
    script: getHeadScripts(),
})

const homePage = computed(() => {
    return useCommonContents().value?.home
})
const siteName = computed(() => {
    return useCommonContents().value?.head?.siteName
})
const mainMenuWalker = computed(() => {
    return useCommonContents().value?.menus?.mainMenuWalker as RoadizWalker
})
const articleContainer = computed(() => {
    return isArticleContainerEntity(page.value)
})
const pageEntity = computed(() => {
    return isPageEntity(page.value)
})
/*
 * VForm Example configuration
 */
const formData = ref({})
const defaultComponentsMap = computed(() => {
    return useDefaultComponentsMap()
})
const formSchema = computed(() => {
    return defaultSchema
})
const onFormSubmit = () => {
    console.log(formData.value)
}
</script>
