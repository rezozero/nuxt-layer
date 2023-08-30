<template>
    <p>Articles list</p>
    <ul>
        <li v-for="article in articles">
            <nuxt-link :to="article.url">{{ article.title }}</nuxt-link>
        </li>
    </ul>

    <nav>
        <ul>
            <li v-if="previousPageUrl"><nuxt-link :to="previousPageUrl">Previous</nuxt-link></li>
            <li v-if="nextPageUrl"><nuxt-link :to="nextPageUrl">Next</nuxt-link></li>
        </ul>
    </nav>
</template>
<script setup lang="ts">
import {HydraCollection} from "@roadiz/abstract-api-client/dist/types/hydra";
import {RoadizNodesSources} from "@roadiz/abstract-api-client/dist/types/roadiz";
import {PropType} from "vue";

const { $apiFetch } = useNuxtApp()
const route = useRoute()
const pageIndex = computed(() => {
    return route.query?.page || '1'
})

const props = defineProps({
    page: Object as PropType<RoadizNodesSources>
})

const { data: hydraCollection } = await useAsyncData<HydraCollection<RoadizNodesSources>>(
    'articles',
    () => $apiFetch<HydraCollection<RoadizNodesSources>>('/articles', {
        query: {
            page: pageIndex.value
        },
    }),
    {
        watch: [pageIndex]
    }
)

const articles = computed(() => {
    return hydraCollection.value?.['hydra:member']
})
const previousPageUrl = computed(() => {
    return hydraCollection.value?.['hydra:view']?.['hydra:previous'] ? props.page?.url + '?page=' + (parseInt(pageIndex.value) - 1) : null
})
const nextPageUrl = computed(() => {
    return hydraCollection.value?.['hydra:view']?.['hydra:next'] ? props.page?.url + '?page=' + (parseInt(pageIndex.value) + 1) : null
})
</script>
