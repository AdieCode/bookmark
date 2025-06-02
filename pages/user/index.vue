<template>
    <div class="flex flex-col gap-1 justify-center items-center h-full">
        still in development
    </div>
</template>

<script setup>

import { ref } from 'vue';

const router = useRouter()
const authStore = useAuthStore();

function redirectToSignOut() {
    authStore.logout()
    router.push("/");
}

// Set the layout
definePageMeta({
  layout: 'settings'
});
</script>

<style lang="css" scoped>

</style>