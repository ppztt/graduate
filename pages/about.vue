<template>
    <div>
        你好，这里是about
    </div>
</template>

<script setup>
import { useNuxtApp } from '#app'
const nuxtApp = useNuxtApp()
onMounted(() => {
    nuxtApp.$request.Common.login({'user_name': 'admin', password: '123456'})
})
</script>

<style lang="scss" scoped>

</style>
