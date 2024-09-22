<template>
    <div class="w-60 cursor-pointer">
        <div class="border-4 border-black rounded-xl relative hover:shadow-lg hover:-translate-y-2 transition-transform duration-200 ease-in-out">
            <img src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx105398-b673Vt5ZSuz3.jpg" alt="" srcset="" class="rounded-xl">
        </div>
        <div class="flex justify-center w-56 mt-2">
            <span class="text-black font-semibold text-lg">{{ title }}</span>
        </div>
    </div>
</template>

<script setup>
const title = "Na Honjaman Level Up"
</script>

<style scoped>

</style>
