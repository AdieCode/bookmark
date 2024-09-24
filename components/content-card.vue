<template>
    <div class="w-60 relative" @mouseenter="toggleInfo" @mouseleave="toggleInfo" @click="toggleInfo">
        <!-- Manga cover card -->
        <div class="border-4 border-black rounded-xl relative hover:shadow-lg transition-transform duration-200 ease-in-out">
            <img :src="data.cover_image_url" alt="" class="rounded-lg w-full h-80 object-cover">
            
            <!-- Info section, visible when showInfo is true -->
            <div v-if="showInfo" class="absolute w-full z-10 p-2 bottom-4 flex justify-center items-center gap-2 bounce-down">
                <div class="p-3 bg-white border-2 border-black rounded-lg cursor-pointer">
                    <span class="font-bold text-base pb-4">More info</span>
                </div>
                <div class="p-3 bg-white border-2 border-black rounded-lg cursor-pointer">
                    <img src="../public/images/plus.png" alt="" class="w-6">
                </div>
            </div>
        </div>

        <!-- Title -->
        <div class="flex flex-col mx-3 w-56 mt-2">
            <span v-if="data.title.english && data.title.romaji && data.title.english.toLowerCase() === data.title.romaji.toLowerCase()" class="text-stone-600 font-extrabold text-base">{{ data.title.english }}</span>
            <div v-else-if="data.title.english" class="flex flex-col">
                <span class="text-stone-600 font-extrabold text-base line-clamp-1">{{ data.title.english }}</span>
                <span class="text-stone-600 font-semibold text-sm line-clamp-1">{{ data.title.romaji }}</span>
            </div>
            <span v-else-if="data.title.romaji" class="text-black font-extrabold text-base line-clamp-2">{{ data.title.romaji }}</span>
            <span v-else class="text-black font-extrabold text-base">No title found</span>
        </div>

        <!-- Pop-up info, visible on hover or click -->
        <div v-if="showInfo" class="absolute w-72 bg-white border-2 border-black rounded-lg shadow-lg z-10 p-2 transform -top-2 -left-6 pointer-events-none bounce-down md:pointer-events-auto">
            <div class="absolute top-0 right-0 p-1 pl-2 rounded-bl bg-black text-white">
                <span v-if="!data.isAdult" class="font-extrabold text-sm">PG 13</span>
                <span v-if="data.isAdult" class="font-extrabold text-sm">18+</span>
            </div>
            
            <div class="mt-4 p-2">
                <span class="font-extrabold"><span class="text-lg font-normal">{{data.type}}</span> - Planning to read</span>
            </div>

            <!-- Genres -->
            <tags :items="data.genres" width="300"/>

            <!-- Description -->
            <div class="text-black text-sm mt-2 mx-2">
                <p class="truncate-3-lines">{{ truncatedDescription }}</p>
            </div>

            <!-- Scores and status -->
            <div class="flex justify-around text-xs text-white bg-black p-3 rounded-md font-bold mt-2">
                <span><span class="font-extralight">Score </span>{{ data.average_score }}</span>
                <span><span class="font-extralight">Chp </span>{{ data.chapters }}</span>
                <span v-if="data.volumes"><span class="font-extralight">Vol </span>{{ data.volumes }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
let showInfo = ref(false);
const props = defineProps({
    data: Object,
})

function toggleInfo() {
    showInfo.value = !showInfo.value;
}

// Computed property to truncate the description if it's too long
const truncatedDescription = computed(() => {
  // Check if the description exists before slicing it
  if (props.data?.description) {
    return props.data.description.length > 100
      ? props.data.description.slice(0, 100) + "..."
      : props.data.description;
  }
  return ''; // Return empty string if no description
});
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
    animation: bounceDown 0.4s ease-out forwards;
}

.object-cover {
  object-fit: cover;
}
</style>
