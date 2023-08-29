<template>
    <nav>
        <ul>
            <li v-for="alternateLink in alternateLinks">
                <nuxt-link v-if="alternateLink.locale !== page?.translation?.locale" :to="alternateLink.url">{{ alternateLink.title }}</nuxt-link>
                <span v-else>{{ alternateLink.title }}</span>
            </li>
        </ul>
    </nav>
    <h1 v-if="page && page.title">{{ page.title }}</h1>

    <p>Type: {{ pageType }}</p>
    <p>Path: {{ pagePath }}</p>
    <p>QS: {{ queryString }}</p>

    <NuxtPicture sizes="sm:100vw md:50vw lg:300px"
                 src="d0d72cea/thumbnail_hcnonm.jpg"
                 :modifiers="{ crop: '1x1' }"></NuxtPicture>
</template>
<script setup lang="ts">
import {RoadizWebResponse} from "@roadiz/abstract-api-client/dist/types/roadiz";
import useWebResponse from "~/composables/use-web-response";
import {ApiFetchResponse} from "~/plugins/roadiz-api";

const { $webResponseFetch } = useNuxtApp()
const route = useRoute()
const pagePath = computed(() => {
    return route.path
})
const queryString = computed(() => {
    return route.query
})

const { data } = await useAsyncData<ApiFetchResponse<RoadizWebResponse>>(async (): Promise<ApiFetchResponse<RoadizWebResponse>> => {
    return await $webResponseFetch<RoadizWebResponse>('/web_response_by_path', {
        query: {
            path: pagePath.value,
        }
    })
})

const { page, pageType, blocks, breadcrumbs, alternateLinks } = useWebResponse(data)
</script>
