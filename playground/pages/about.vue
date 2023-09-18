<script setup lang="ts">
defineI18nRoute({
    paths: {
        en: '/about-us', // -> accessible at /about-us (no prefix since it's the default locale)
        fr: '/a-propos', // -> accessible at /fr/a-propos
        es: '/sobre', // -> accessible at /es/sobre
    },
})
</script>

<template>
    <div>About</div>
</template>

<style module lang="scss"></style>
