<template>
    <p>GroupBlock: {{ title }}</p>
    <div style="padding-left: 1em">
        <v-block-factory :blocks="walker?.children"></v-block-factory>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { RoadizWalker } from '@roadiz/abstract-api-client/dist/types/roadiz'
import VBlockFactory from '~/components/organisms/VBlockFactory/VBlockFactory'
import useBlock from '~/composables/use-block'

const props = defineProps({
    walker: Object as PropType<RoadizWalker>,
    index: Number,
    numBlocks: Number,
})

const { title } = useBlock(props.walker)
</script>
