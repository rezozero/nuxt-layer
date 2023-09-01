<template>
    <div v-if="jwt" :class="$style.root">
        <div :class="$style.user">Previewing as: {{ jwt.username }}</div>
        <div>Expire at: {{ remainingTime }}</div>
        <button @click.prevent="stopPreview">Stop previewing</button>
    </div>
</template>

<script setup lang="ts">
const preview = usePreview()
const router = useRouter()

const token = computed(() => {
    return preview.value?.previewToken
})
const jwt = computed(() => {
    let decodedBase64
    if (!token.value) {
        return null
    }
    const base64Url = token.value.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    if (typeof window != 'undefined' && typeof window.atob != 'undefined') {
        decodedBase64 = window.atob(base64)
    } else {
        decodedBase64 = Buffer.from(base64, 'base64').toString()
    }
    const jsonPayload = decodeURIComponent(
        decodedBase64
            .split('')
            .map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )
    return JSON.parse(jsonPayload)
})
const remainingTime = computed(() => {
    return new Date((jwt.value?.exp || 0) * 1000)
})
const stopPreview = () => {
    preview.value = {
        preview: false,
        previewToken: undefined
    }
    window.location.reload()
}
</script>
<style lang="scss" module>
.root {
    position: fixed;
    z-index: 9999;
    bottom: 0;
    right: 1em;
    display: block;
    padding: 1em 1.5em 0.75em;
    border: 1px solid #e59500;
    background: #ffa600;
    border-radius: 3px 3px 0 0;
    font-size: 10px;
    line-height: 16px;
    opacity: 0.25;
}

.user {
    font-weight: bold;
}
</style>
