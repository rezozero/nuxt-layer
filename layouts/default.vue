<template>
    <div>
        <nav>
            <h1><nuxt-link v-if="homePage" :to="homePage.url">{{ siteName }}</nuxt-link></h1>
            {{ $t('test') }}
            <ul v-if="mainMenuWalker">
                <li v-for="subWalker in mainMenuWalker.children">
                    <nuxt-link :to="subWalker.item.url">{{ subWalker.item.title }}</nuxt-link>
                </li>
            </ul>
        </nav>
        <slot />
    </div>
</template>
<script setup lang="ts">
import {RoadizWalker} from "@roadiz/abstract-api-client/dist/types/roadiz";

const homePage = computed(() => {
    return useCommonContents().value?.home
})
const siteName = computed(() => {
    return useCommonContents().value?.head?.siteName
})
const mainMenuWalker = computed(() => {
    return useCommonContents().value?.menus?.mainMenuWalker as RoadizWalker
})
</script>
