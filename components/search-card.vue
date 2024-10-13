<template>
    <div class="relative h-46 bg-white border-4 border-black rounded-xl hover:shadow-2xl hover:shadow-black duration-200 flex flex-row justify-start items-center cursor-pointer">
        <img src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx101517-H3TdM3g5ZUe9.jpg" alt="Filter Icon" class="w-28 h-46 rounded-md">
        
        <div class="h-full w-full p-6 line-clamp-2 flex flex-col">
            <!-- completion status -->
            <!-- <div class="absolute top-0 right-0 p-1 pl-2 rounded-bl rounded-tr bg-black text-white">
                <span class="font-extrabold small-title">Planning to read</span>
            </div> -->

            <!-- Title -->
            <div class="text-black font-bold text-xl mb-2" >Jujutsu Kaisen <span class="text-sm font-semibold border-2 border-black rounded p-1">Planning To Read</span></div>

            <!-- Genres -->
            <tags :items="['Action', 'Drama', 'Supernatural']" width="300" :max-height="52" class="mt-2"/>

            <!-- Manga Scores -->
             <div class="flex justify-start">

                 <DividerLine text="scores" class="mt-6 mb-2"/>
             </div>
            <div class="flex flex-row items-center gap-6">
                <div class="flex items-center">
                    <!-- <img src="https://img.icons8.com/puffy/32/user.png" alt="user score" class="w-5 h-5"> -->
                    <span class="pl-1 text-black text-base font-normal">PL</span>
                    <span class="pl-1 text-black text-base font-extrabold">8.4</span>
                </div>

                <div class="flex items-center">
                    <!-- <img src="https://img.icons8.com/parakeet-line/48/group.png" alt="users score" class="w-7"> -->
                    <span class="pl-1 text-black text-base font-normal">MAL</span>
                    <span class="pl-1 text-black text-base font-extrabold">9.1</span>
                </div>
            </div>

            

            <!-- Manga Length -->
            <div>
                
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>

</style>