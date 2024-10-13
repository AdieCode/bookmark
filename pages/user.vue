<template>
    <div class="flex flex-col gap-2 justify-center items-center">

		<div class=" mt-8 p-2 w-72 border-4 bg-black text-white border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold" @click="redirectToSignOut">
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

</script>

<style lang="css" scoped>

</style>