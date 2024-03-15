<script setup lang="ts">
const response = await useRoadizFetch('/web_response_by_path', {
    query: {
        path: '/',
    },
}).catch((error) => {
    console.error('error', error)
})

console.log('response', response)
</script>

<template>
    <div>
        <h1>Home page</h1>
    </div>
</template>

<style module lang="scss"></style>
