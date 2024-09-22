<template>
    <div class="flex flex-col w-screen">
        <div class="flex flex-row place-content-center justify-between m-4">
            <div class="w-40 cursor-pointer">
                <img src="../public/images/Logo-bookmark.png" alt="">
            </div>
            <!-- your nav bar -->
                <div class="w-80 h-12 border-4 border-black rounded-xl m-auto cursor-pointer flex items-center text-black/40 font-medium hover:w-96 hover:text-black/80 hover:font-bold duration-100 ">
                <span class="ml-3">Search for anime/manga here</span>
                <div class="h-full w-14 border-l-4 border-black ml-auto flex justify-center items-center">
                    <img src="../public/images/search.png" alt="" class="w-7 h-7">
                </div>
            </div>
    
    
            <div class="w-20 cursor-pointer">
                <img src="../public/images/User.png" alt="">
            </div>
        </div>

        <div class="flex flex-row place-content-center justify-around mt-1">
            <div class="flex flex-row gap-4">
                <div class="p-2 border-4 border-black rounded-xl m-auto cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100">
                    Discover
                </div>
                <div class="p-2 border-4 border-black rounded-xl m-auto cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100">
                    Planning to read
                </div>
                <div class="p-2 border-4 border-black rounded-xl m-auto cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100">
                    Busy Reading
                </div>
                <div class="p-2 border-4 border-black rounded-xl m-auto cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100">
                    Completed
                </div>
            </div>
        </div>
        <div class="fixed bottom-10 right-10 w-16 h-16 border-4 border-black rounded-2xl cursor-pointer flex justify-center items-center hover:shadow-lg hover:bottom-11 duration-100">
            <img src="../public/images/plus.png" alt="" class="w-8 h-8">
        </div>


    </div>
    <div>
        <slot/>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>


</style>