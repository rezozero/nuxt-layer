<template>
    <p>BasicBlock: {{ title }}</p>
</template>
<script setup lang="ts">
import {PropType} from "vue";
import {RoadizWalker} from "@roadiz/abstract-api-client/dist/types/roadiz";
import useBlock from "~/composables/use-block";

const props = defineProps({
    walker: Object as PropType<RoadizWalker>,
    index: Number,
    numBlocks: Number,
})

const {
    item,
    title
} = useBlock(props.walker)

</script>
