<template>
    <div class="flex flex-col">

        <!-- if user click's on a clickable tag  -->

        <title>Content Manging & Exploring</title>
        <div class="flex flex-row place-content-center justify-between mt-4 mb-4">
            <div class="w-40 cursor-pointer flex justify-center" @click="toMain">
                <!-- <img src="../public/images/Logo-bookmark.png" alt=""> -->
                <Icon/>
            </div>

            <!-- Desktop/Tablet Search Bar -->
            <div v-if="!isLoginPage && !isOauthPage && !isHompage" class="hidden md:flex w-80 h-12 border-4 border-black rounded-xl m-auto cursor-pointer items-center text-black/40 font-medium hover:w-96 hover:text-black/80 hover:font-bold duration-100" @click="toggleSearch">
                <span class="ml-3">Search for anime/manga here</span>
                <div class="h-full w-14 border-l-4 border-black ml-auto flex justify-center items-center">
                    <img src="../public/images/search.png" alt="" class="w-7 h-7">
                </div>
            </div>

            <search/>
            
            <div class="flex justify-center items-center">
                <div v-if="!isLoginPage && !isOauthPage && !isHompage && !isInfoPage" class="md:hidden w-14 h-12 border-2 border-black rounded-xl flex justify-center items-center ml-auto cursor-pointer">
                    <img src="../public/images/search.png" alt="Search Icon" class="w-7 h-7">
                </div>
                <div v-if="!isLoginPage && !isOauthPage && !isHompage && !isInfoPage" class="w-20 cursor-pointer" @click="toLogin">
                    <img src="../public/images/User.png" alt="">
                </div>
                <div v-if="isLoginPage || isInfoPage" class="p-2 mr-4 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100" @click="toPrevious">
                    Go Back
                </div>
            </div>
        </div>
        <typeContentSwitcher v-if="!isLoginPage && !isOauthPage && !isHompage && !isInfoPage"/>
        <div v-if="!isLoginPage && !isOauthPage && !isHompage && !isInfoPage && !isInfoPage" class="flex flex-row items-center justify-around mt-1 mx-2">
            <div class="flex flex-row flex-wrap items-center justify-center gap-3 max-w-[620px] mx-auto"> <!-- Adjusted max width and gap -->
                <div class="p-2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100" @click="useToggles.toggleContentDiscover" :class="{'bg-black text-white bounce-down': useToggles.content.discover}">
                    Discover
                </div>
                <div class="p-2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100" @click="useToggles.toggleContentPlanningToRead" :class="{'bg-black text-white bounce-down': useToggles.content.planningToRead}">
                    Planning to read
                </div>
                <div class="p-2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100" @click="useToggles.toggleContentReading" :class="{'bg-black text-white bounce-down': useToggles.content.reading}">
                    Busy Reading
                </div>
                <div class="p-2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100" @click="useToggles.toggleContentCompleted" :class="{'bg-black text-white bounce-down': useToggles.content.completed}">
                    Completed
                </div>
            </div>
        </div>

        <div v-if="!isLoginPage && !isOauthPage && !isHompage" class="fixed bottom-3 right-3 md:bottom-10 md:right-10 w-11/12 h-16 flex justify-between items-end z-30">
            <tagSearch/>
             <div></div>
            <div class="w-16 h-16 relative ml-4">
                <div class="absolute -top-20 -left-0 w-14 h-14 border-4 bg-white border-black rounded-2xl cursor-pointer flex justify-center items-center hover:shadow-lg hover:-translate-y-1 duration-100" @click="scrollToTop">
                    <img src="../public/images/icons8-up-arrow-100.png" alt="">
                </div>

                <div class="absolute -top-2 -left-1 w-16 h-16 border-4 bg-white border-black rounded-2xl cursor-pointer flex justify-center items-center hover:shadow-lg hover:-translate-y-1 duration-100">
                    <img src="../public/images/plus.png" alt="" class="h-8 w-8">
                </div>
            </div>
        </div>

    </div>

    <!-- <div class="background h-full top bg-white filter blur-xl">
      <div
        v-for="(bubble, index) in bubbles"
        :key="index"
        class="bubble"
        :style="{
          width: bubble.size + 'px',
          height: bubble.size + 'px',
          left: bubble.positionX + '%',
          animationDuration: bubble.speed + 's',
          animationDelay: bubble.delay + 's'
        }"
      ></div>
    </div> -->

    <div>
        <slot/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const router = useRouter();
const route = useRoute();
const useToggles = useTogglesStore()

const isHompage = computed(() => route.path === '/');
const isLoginPage = computed(() => route.path === '/auth/login' || route.path === '/auth/sign-up');
const isOauthPage = computed(() => 
    (route.path === '/google/callback' || route.path === '/github/callback') // && !!route.query.token
);

const isInfoPage = computed(() => 
    (route.path === '/info') // && !!route.query.token
);

function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This makes the scroll smooth
        });
}

function toMain() {
    router.push("/mainpage");
}

function toLogin() {
    router.push("/auth/login");
}

function toPrevious() {
    // router.push("/");
    router.back();
    scrollToTop();
}

function toggleSearch() {
    useToggles.toggleSearchShow();
}

function toggleDiscover() {
    useToggles.toggleContentDiscover();
}

const bubbles = ref(Array.from({ length: 50 }, () => ({
  size: Math.random() * 50 + 20, // Random size between 20px and 70px
  speed: Math.random() * 15 + 5, // Random speed between 5s and 20s
  delay: Math.random() * 10, // Random delay between 0s and 10s
  positionX: Math.random() * 100 // Random horizontal position between 0% and 100%
})));

</script>

<style lang="css" scoped>
@keyframes bounceDown {
    0% {
    transform: translateY(0);
    }
    50% {
    transform: translateY(7px);
    }
    100% {
    transform: translateY(-4px);
    }
}


.bounce-down {
    animation: bounceDown 0.2s ease-out forwards;
}


.background {
    position: fixed;
    z-index: -20;
    width: 100%;
    /* height: full; */
    overflow: hidden;
}

.bubble {
    position: absolute;
    bottom: -100px; /* Start position off screen */
    background: rgb(113, 113, 113);
    border-radius: 50%;
    animation: moveBubbles 20s linear infinite;
    opacity: 0.8;
}

@keyframes moveBubbles {
    0% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-500px) scale(1.2); /* Moves bubble upwards */
    }
    100% {
        transform: translateY(-1000px) scale(1);
    }
}

</style>