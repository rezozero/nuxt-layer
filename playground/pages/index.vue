<script setup lang="ts">
import { getStructuredDataScript } from '../../utils/structured-data'

const runtimeConfig = useRuntimeConfig()

/*
 * Define SSR cache control header for this page
 */
useCacheControl({
    public: true,
    // 1 hour
    maxAge: 60 * 60,
    // 1 hour
    sMaxAge: 60 * 60,
    // SWR for 2 minutes
    staleWhileRevalidate: 60 * 2,
})

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
