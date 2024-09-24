<template>
    <div class="w-3/4 mt-10 px-4 mx-auto flex flex-row justify-center items-center flex-wrap gap-8 z-40 sm:w-full">
      <div class="lex flex-col justify-center items-center">
        <h1 class="text-center text-6xl font-bold p-2">Sign up</h1>

        <!-- Username input -->
        <div>
            <input v-model="email" type="email" placeholder="Email" name="email" class="w-80 h-12 border-4 border-black p-4 rounded-lg text-lg font-bold mt-10 mb-4">
        </div>

        <!-- Email input -->
        <divider-line text="email"/>
        <div>
            <input v-model="email" type="email" placeholder="Email" name="email" class="w-80 h-12 border-4 border-black p-4 rounded-lg text-lg font-bold mt-4 mb-4">
        </div>
        <div>
            <input v-model="email" type="email" placeholder="Email" name="email" class="w-80 h-12 border-4 border-black p-4 rounded-lg text-lg font-bold mt-2 mb-4">
        </div>

        <!-- Password input -->
        <divider-line text="password"/>
        <div class="relative mt-4">
            <input v-model="password" :type="passwordType1" placeholder="Password" name="password" class="w-80 h-12 border-4 border-black p-4 rounded-lg text-lg font-bold mb-4">
            <div class="absolute top-2 -right-10">
                <img v-if="passwordType1 === 'password'" src="https://img.icons8.com/ios-glyphs/30/visible--v1.png" alt="eye" @click="passwordToggle1">
                <img v-else src="https://img.icons8.com/ios-glyphs/30/hide.png" alt="eye" @click="passwordToggle1">
            </div>
        </div>
        <div class="relative mt-2">
            <input v-model="password" :type="passwordType2" placeholder="Password" name="password" class="w-80 h-12 border-4 border-black p-4 rounded-lg text-lg font-bold mb-4">
            <div class="absolute top-2 -right-10">
                <img v-if="passwordType2 === 'password'" src="https://img.icons8.com/ios-glyphs/30/visible--v1.png" alt="eye" @click="passwordToggle2">
                <img v-else src="https://img.icons8.com/ios-glyphs/30/hide.png" alt="eye" @click="passwordToggle2">
            </div>
        </div>

        <divider-line text="finish"/>

        <div class="flex justify-center items-center my-5 gap-2">
            <div class="p-2 w-2/3 border-4 bg-black text-white border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold" @click="login">
                Sign up
            </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const router = useRouter()
const authStore = useAuthStore();
const passwordType1 = ref('password');
const passwordType2 = ref('password');
const email = ref('');
const password = ref('');


async function login() {
    const isAuth = await authStore.login(email.value, password.value)
    // router.push("/auth/login");
}

function passwordToggle1(){
    if (passwordType1.value === 'password'){
        passwordType1.value = 'text'
    } else {
        passwordType1.value = 'password'
    }
}

function passwordToggle2(){
    if (passwordType2.value === 'password'){
        passwordType2.value = 'text'
    } else {
        passwordType2.value = 'password'
    }
}
</script>

<style scoped>

</style>