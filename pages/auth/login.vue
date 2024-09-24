<template>
    <div class="w-3/4 mt-10 px-4 mx-auto flex flex-row justify-center items-center flex-wrap gap-8 z-40 sm:w-full">
      <div class="lex flex-col justify-center items-center">
        <h1 class="text-center text-6xl font-bold p-2">Login</h1>
        <!-- Email input -->
        <div>
            <input v-model="email" type="email" placeholder="Email" name="email" class="w-80 h-12 border-4 border-black p-4 rounded-lg text-lg font-bold mt-10 mb-4">
        </div>

        <!-- Password input -->
        <div class="relative">
            <input v-model="password" :type="passwordType" placeholder="Password" name="password" class="w-80 h-12 border-4 border-black p-4 rounded-lg text-lg font-bold mb-4">
            <div class="absolute top-2 -right-10">
                <img v-if="passwordType === 'password'" src="https://img.icons8.com/ios-glyphs/30/visible--v1.png" alt="eye" @click="passwordToggle">
                <img v-else src="https://img.icons8.com/ios-glyphs/30/hide.png" alt="eye" @click="passwordToggle">
            </div>
        </div>

        <divider-line text="" width="200"/>

        <div class="flex justify-center items-center my-5 gap-2">
            <div class="p-2 w-2/3 border-4 bg-black text-white border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold" @click="login">
                Login
            </div>
            <div class="p-2 w-1/3 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold" @click="toSignup">
                Sign up
            </div>
        </div>

        <divider-line text="or login with" width="200"/>
        <div class="flex flex-row justify-center items-center my-5 gap-2">
            <div class="p-2 w-1/2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold" @click="redirectToGoogle">
                <img src="../../public/images/icons8-google-100.png" alt="" class="w-10 pointer-events-none">
                <span class="pointer-events-none">Google</span>
                <!-- https://accounts.google.com/o/oauth2/auth?client_id=1092384774274-2s5jb68iobabko0rk1rumcbnbt5laf26.apps.googleusercontent.com&redirect_uri=http://localhost:3001/auth/google/callback&response_type=code&scope=email%20profile -->
            </div>
            <div class="p-2 w-1/2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold" @click="redirectToGithub">
                <img src="../../public/images/icons8-github-90.png" alt="" class="w-10 pointer-events-none">
                <span class="pointer-events-none">Github</span>
            </div>
        </div>
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

function redirectToGoogle() {
    window.location.href = googleOAuthUrl;
}

function redirectToGithub() {
    window.location.href = githubOAuthUrl;
}

async function toSignup() {
    router.push("/auth/sign-up");
}

async function login() {
    const isAuth = await authStore.login(email.value, password.value)
    // router.push("/auth/login");
}

function passwordToggle(){
    if (passwordType.value === 'password'){
        passwordType.value = 'text'
    } else {
        passwordType.value = 'password'
    }
}
</script>

<style scoped>

</style>