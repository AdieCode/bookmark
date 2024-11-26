<template>
    <div class="flex flex-col gap-1 justify-center items-center h-full">
        <div class="flex flex-col justify-center items-center">
            <img src="https://img.icons8.com/ios-glyphs/90/logout-rounded--v1.png" alt="">
        </div>
		<div class="p-2 w-72 border-4 bg-black text-white border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold" @click="redirectToSignOut">
            Sign-out
        </div>
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