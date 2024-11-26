<template>
    <div class="flex flex-col">
        <header class="flex justify-between m-2">
            <div class="w-40 cursor-pointer flex justify-center" @click="toUserInfo">
                <Icon/>
            </div>
            <!-- <h1 class="p-4 font-extrabold text-4xl text-center ">User Options</h1> -->
            <div class="p-1 mr-4 my-4 border-4  border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100" 
                @click="toPrevious" 
                >
                Go Back
            </div>
        </header>
      <div>
        <div class="flex flex-row justify-start items-center h-full">
            <ul class="p-5 w-56 flex flex-col gap-3 h-full">
                <li>
                    <div class="p-1 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-md font-bold hover:bg-black hover:opacity-80 hover:text-white transition-colors duration-100" 
                    :class="{'bg-black text-white': currentRoute === '/user'}" 
                    @click="toUserInfo" >
                        User info
                    </div>
                </li>
                <li>
                    <div class="p-1 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-md font-bold hover:bg-black hover:text-white transition-colors duration-100" 
                    :class="{'bg-black text-white': currentRoute === '/user/something'}" 
                    @click="" >
                        User settings
                    </div>
                </li>
                <li>
                    <div class="p-1 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-md font-bold hover:bg-black hover:text-white transition-colors duration-100" 
                    :class="{'bg-black text-white': currentRoute === '/user/something'}" 
                    @click="" >
                        Contact us
                    </div>
                </li>
                <li>
                    <div class="p-1 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-md font-bold hover:bg-black hover:text-white transition-colors duration-100" 
                    :class="{'bg-black text-white': currentRoute === '/user/sign-out'}" 
                    @click="toSignOut()" >
                        Sign out
                    </div>
                </li>
            </ul>
            <div class="h-full w-full m-4 p-4 rounded-lg">
                <slot></slot>                
            </div>
        </div>
      </div>
      <!-- <footer>Special Layout Footer</footer> -->
    </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();

const currentRoute = computed(() => {
    return route.path
});

function toPrevious() {
    router.push("/mainpage");
}

function toMain() {
    router.push("/");
}

function toUserInfo() {
  router.push('/user');
}

function toUserSettings() {
  router.push('/user/settings');
}

function toContact() {
  router.push('/contact');
}

function toSignOut() {
  router.push('/user/sign-out'); // Fixed to use `router.push()`
}

</script>

<style lang="css" scoped>

</style>