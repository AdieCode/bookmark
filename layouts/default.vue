<template>
    <div class="flex flex-col">
        <div class="flex flex-row place-content-center justify-between mt-4 mb-4">
            <div class="w-40 cursor-pointer">
                <img src="../public/images/Logo-bookmark.png" alt="">
            </div>

            <!-- Desktop/Tablet Search Bar -->
            <div class="hidden md:flex w-80 h-12 border-4 border-black rounded-xl m-auto cursor-pointer flex items-center text-black/40 font-medium hover:w-96 hover:text-black/80 hover:font-bold duration-100">
                <span class="ml-3">Search for anime/manga here</span>
                <div class="h-full w-14 border-l-4 border-black ml-auto flex justify-center items-center">
                    <img src="../public/images/search.png" alt="" class="w-7 h-7">
                </div>
            </div>

            
            <div class="flex justify-center items-center">
                <div class="md:hidden w-14 h-12 border-2 border-black rounded-xl flex justify-center items-center ml-auto cursor-pointer">
                    <img src="../public/images/search.png" alt="Search Icon" class="w-7 h-7">
                </div>
                <div class="w-20 cursor-pointer">
                    <img src="../public/images/User.png" alt="">
                </div>
            </div>
        </div>

        <div class="flex flex-row items-center justify-around mt-1 mx-2">
            <div class="flex flex-row flex-wrap items-center justify-center gap-3 max-w-[620px] mx-auto"> <!-- Adjusted max width and gap -->
                <div class="p-2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100">
                    Discover
                </div>
                <div class="p-2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100">
                    Planning to read
                </div>
                <div class="p-2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100">
                    Busy Reading
                </div>
                <div class="p-2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100">
                    Completed
                </div>
            </div>
        </div>

        <div class="fixed bottom-3 right-3 md:bottom-10 md:right-10 w-16 h-16 border-4 bg-white border-black rounded-2xl cursor-pointer flex justify-center items-center hover:shadow-lg hover:bottom-11 duration-100 z-50">
            <img src="../public/images/plus.png" alt="" class="w-8 h-8">
            <div class="absolute -top-20 -left-0 w-14 h-14 border-4 bg-white border-black rounded-2xl cursor-pointer flex justify-center items-center hover:shadow-lg hover:bottom-11 duration-100 z-50" @click="scrollToTop">
                <img src="../public/images/icons8-up-arrow-100.png" alt="">
            </div>
        </div>

    </div>
    <div>
        <slot/>
    </div>
</template>

<script setup>
function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This makes the scroll smooth
        });
    }
</script>

<style lang="css" scoped>


</style>