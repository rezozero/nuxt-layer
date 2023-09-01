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
    articleContainer: Object as PropType<RoadizNodesSources>
})

const { data: hydraCollection } = await useAsyncData<HydraCollection<RoadizNodesSources>>(
    async () => {
        const route = useRoute()
        const page = route.query?.page || '1'
        return await $apiFetch<HydraCollection<RoadizNodesSources>>('/articles', {
            query: {
                page,
                'node.parent': props.articleContainer?.node["@id"],
                'order[publishedAt]': 'desc',
                'node.visible': true
            },
        })
    },
    {
        watch: [pageIndex]
    }
)

const articles = computed(() => {
    return hydraCollection.value?.['hydra:member']
})
const previousPageUrl = computed(() => {
    return hydraCollection.value?.['hydra:view']?.['hydra:previous'] ?
        props.articleContainer?.url + '?page=' + (parseInt(pageIndex.value as string) - 1) :
        null
})
const nextPageUrl = computed(() => {
    return hydraCollection.value?.['hydra:view']?.['hydra:next'] ?
        props.articleContainer?.url + '?page=' + (parseInt(pageIndex.value as string) + 1) :
        null
})
</script>
