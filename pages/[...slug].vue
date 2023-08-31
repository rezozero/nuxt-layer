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
                <nuxt-link v-if="alternateLink.locale !== page?.translation?.locale" :to="alternateLink.url">{{ alternateLink.title }}</nuxt-link>
                <span v-else>{{ alternateLink.title }}</span>
            </li>
        </ul>
    </nav>
    <h1 v-if="title">{{ title }}</h1>

    <v-block-factory :blocks="blocks"></v-block-factory>
    <v-article-container v-if="articleContainer" :page="page"></v-article-container>

    <v-form :components-map="defaultComponentsMap" :schema="formSchema" v-model="formData"></v-form>
</template>
<script setup lang="ts">
import {RoadizNodesSources, RoadizWalker} from "@roadiz/abstract-api-client/dist/types/roadiz";
import useWebResponse from "~/composables/use-web-response";
import VBlockFactory from "~/components/organisms/VBlockFactory/VBlockFactory";
import {PageResponse} from "~/types/api";
import {isArticleContainerEntity} from "~/utils/roadiz/entity";
import VArticleContainer from "~/components/organisms/VArticleContainer/VArticleContainer.vue";
import VForm from "~/components/organisms/VForm/VForm.vue";
import defaultSchema from "~/components/organisms/VForm/schemas/default.js";

const { $webResponseFetch } = useNuxtApp()
const { t, locale } = useI18n()
const route = useRoute()

const pagePath = computed(() => {
    return route.path
})

const { data: fetchResponse } = await useAsyncData<PageResponse>(
    (): Promise<PageResponse> => $webResponseFetch('/web_response_by_path', {
        query: {
            path: pagePath.value,
        }
    })
)
if (!fetchResponse.value) {
    throw createError({ statusCode: 404, message: t('error.page_not_found').toString(), fatal: true })
}

const {
    webResponse,
    page,
    title,
    blocks,
    alternateLinks,
    getHeadMeta,
    getHeadLinks,
    getHeadScripts
} = useWebResponse(fetchResponse, useCommonContents())

useHead({
    htmlAttrs: {
        lang: locale.value,
    },
    title: (page.value as RoadizNodesSources)?.title,
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

const formData = ref({})
const defaultComponentsMap = computed(() => {
    return useDefaultComponentsMap()
})
const formSchema = computed(() => {
    return defaultSchema
})
</script>
