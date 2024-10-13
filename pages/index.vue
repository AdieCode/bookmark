<template>
    <div class="flex flex-col gap-2 justify-center items-center">
        <div class="p-2 w-72 border-4 bg-black text-white border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold" @click="redirectToLogin">
            Login
        </div>
		<div class="p-2 w-72 border-4 bg-black text-white border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold" @click="redirectToMianPage">
            Homepage
        </div>
    </div>
  </template>
  

<script setup>
import { ref } from 'vue';

const router = useRouter()
const authStore = useAuthStore();
const passwordType = ref('password');
const email = ref('');
const password = ref('');

const googleOAuthUrl = "https://accounts.google.com/o/oauth2/auth?client_id=1092384774274-2s5jb68iobabko0rk1rumcbnbt5laf26.apps.googleusercontent.com&redirect_uri=http://localhost:3001/auth/google/callback&response_type=code&scope=email%20profile";
const githubOAuthUrl = "https://github.com/login?client_id=Ov23liwFfm4hn8BaO6bS&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3DOv23liwFfm4hn8BaO6bS%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3001%252Fauth%252Fgithub%252Fcallback";

function redirectToLogin() {
    router.push("/auth/login");
}

function redirectToMianPage() {
    router.push("/mainpage");
}

</script>

<style scoped>

</style>
