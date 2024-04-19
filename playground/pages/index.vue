<script setup lang="ts">
import { getStructuredDataScript } from '../../utils/structured-data'

const runtimeConfig = useRuntimeConfig()

useHead({
    script: [
        getStructuredDataScript({
            '@type': 'WebSite',
            name: runtimeConfig.public.siteName,
            url: runtimeConfig.public.baseURL,
        }),
    ],
})
</script>

<template>
    <div>
        <h1>Home page</h1>
    </div>
</template>

<style module lang="scss"></style>
