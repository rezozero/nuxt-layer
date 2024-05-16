<script lang="ts" setup>
const apiFetch = useRoadizFetchFactory()

let commonContent: any

try {
    commonContent = await apiFetch('/common_content')
} catch (e) {
    console.error('Error when useRoadizFetchFactory with path /common_content', e)
}

let newsletterFormDefinition: any
try {
    newsletterFormDefinition = await apiFetch('/api/newsletter_form/definition')
} catch (e) {
    console.error('Error when useRoadizFetchFactory with path /api/newsletter_form/definition', e?.data)
}

async function submitForm() {
    try {
        await apiFetch('https://theatredescelestins.rezo-zero.dev/api/newsletter_form/post?_locale=fr', {
            method: 'POST',
            body: {},
        })
    } catch (e) {
        console.error('Error during submit formn', e?.data)
    }
}
</script>

<template>
    <NuxtStory>
        <NuxtStoryVariant title="Common content data">
            <pre v-if="commonContent">ID: {{ commonContent['@id'] }}</pre>
        </NuxtStoryVariant>
        <NuxtStoryVariant title="Get form definition">
            <div v-if="newsletterFormDefinition">{{ newsletterFormDefinition }}</div>
        </NuxtStoryVariant>
        <NuxtStoryVariant title="Submit form data">
            <button @click="submitForm">Submit</button>
            <div v-if="newsletterFormDefinition">{{ newsletterFormDefinition }}</div>
        </NuxtStoryVariant>
    </NuxtStory>
</template>
