<template>
    <div class="flex flex-col">
        <header class="flex justify-between m-4">
            <div class="w-36 cursor-pointer flex justify-center " @click="toUserInfo">
                <Icon/>
            </div>
            <!-- <h1 class="p-4 font-extrabold text-4xl text-center ">User Options</h1> -->
            <!-- <div class="p-1 mr-4 my-4 border-4  border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100" 
                @click="toPrevious" 
                >
                Go Back
            </div> -->
            <border-button 
                text="Go back" 
                class="mr-4 my-2"
                :onClick="toPrevious" 
            />
        </header>
        <div>
            <div class="flex flex-row justify-start items-center h-full">
                <ul class="p-5 max-w-56 min-w-56  flex flex-col gap-3 h-full">
                    <li>
                        <border-button 
                            text="User info" 
                            class="!p-1 w-full flex items-center justify-around"
                            :conditionalClass="{'bg-black text-white': currentRoute === '/user'}"
                            :onClick="toUserInfo" 
                        />
                    </li>
                    <li>
                        <border-button 
                            text="User settings" 
                            class="!p-1 w-full flex items-center justify-around"
                            :conditionalClass="{'bg-black text-white': currentRoute === '/user/user-settings'}"
                            :onClick="toUserSettings"
                        />
                    </li>
                    <li>
                        <border-button 
                            text="Contact us" 
                            class="!p-1 w-full flex items-center justify-around"
                            :conditionalClass="{'bg-black text-white': currentRoute === '/'}"
                        />
                    </li>
                    <li>
                        <border-button 
                            text="Sign out" 
                            class="!p-1 w-full flex items-center justify-around"
                            :conditionalClass="{'bg-black text-white': currentRoute === '/user/sign-out'}"
                            :onClick="toSignOut" 
                        />
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
const useTheme = useThemeStore();
const router = useRouter();
const route = useRoute();

const currentRoute = computed(() => {
    return route?.path
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
  router.push('/user/user-settings');
}

function toContact() {
  router.push('/contact');
}

function toSignOut() {
  router.push('/user/sign-out'); // Fixed to use `router.push()`
}

onMounted(() => {
    useTheme.initTheme();
});
</script>

<style lang="css" scoped>

</style>