<template>
    <div v-if="useToggles.seacrhShow" class="fixed top-0 left-0 z-40 w-full h-full flex justify-center bg-black bg-opacity-50 backdrop-blur-md" @click="toggleSearch">
        <div class="z-50" @click.stop> <!-- Add @click.stop to prevent event bubbling -->
            <div class="flex flex-row gap-3 items-center mt-10 bounce-down">
                <div v-if="!isLoginPage && !isOauthPage" class=" w-14 h-14 bg-white border-4 border-black rounded-xl flex justify-center items-center ml-auto cursor-pointer">
                    <img src="https://img.icons8.com/ios-filled/100/empty-filter.png" alt="Filter Icon" class="w-7 h-7 ">
                </div>
                <input v-model="searchText" type="text" placeholder="Search for anime/manga here" name="email" class="w-96 h-14 outline-none border-4 border-black p-4 rounded-lg text-lg font-bold">
                <div v-if="!isLoginPage && !isOauthPage" class=" w-14 h-14 bg-white border-4 border-black rounded-xl flex justify-center items-center ml-auto cursor-pointer">
                    <img src="../public/images/search.png" alt="Search Icon" class="w-7 h-7 ">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const useToggles = useTogglesStore()
function toggleSearch() {
console.log("clicked")
useToggles.toggleSearchShow();
}
</script>

<style scoped>
@keyframes bounceDown {
    0% {
    transform: translateY(0);
    }
    20% {
    transform: translateY(-10px);
    }
    60% {
    transform: translateY(4px);
    }
    100% {
    transform: translateY(0);
    }
}


.bounce-down {
    animation: bounceDown 0.4s ease-out;
}
</style>
