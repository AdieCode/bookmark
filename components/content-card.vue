<template>
    <div class="w-60 relative" @mouseenter="toggleInfo" @mouseleave="toggleInfo">
        <!-- Manga cover card (hover:-translate-y-2)-->
        <div class="border-4 border-black rounded-xl relative hover:shadow-lg transition-transform duration-200 ease-in-out">
            <img :src="data.cover_image_url" alt="" class="rounded-xl">
        </div>

        <!-- Title -->
        <div class="flex justify-center w-56 mt-2">
            <span class="text-black font-semibold text-lg">{{ data.title }}</span>
        </div>

        <!-- Pop-up info on hover -->
         <!-- <div v-if="showInfo" class="absolute w-64 bg-white border-2 border-black rounded-lg shadow-lg z-10 p-4 top-0 left-full ml-4"></div> -->
        <div v-if="showInfo" class="absolute w-56 bg-white border-2 border-black rounded-lg shadow-lg z-10 p-2 left-1/2 transform -translate-x-1/2 top-2 pointer-events-none">
            <!-- Genres -->
             <div class="text-center p-2">
                 <span class="font-bold">Planning to read</span>
             </div>
            <div class="flex justify-center space-x-2 mb-2">
                <span v-for="genre in data.genres" :key="genre" class="bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                    {{ genre }}
                </span>
            </div>
            <!-- Description -->
            <div class="text-black text-sm te">
                <p class="truncate-3-lines">{{ truncatedDescription }}</p>
            </div>
            <!-- Scores and status -->
            <div class="flex justify-around text-xs text-white bg-black p-3 rounded-md font-bold mt-2">
                <span><span class="font-extralight">Score </span>{{ data.average_score }}</span>
                <span><span class="font-extralight">Chp </span> 0</span>
            </div>
        </div>

        <div v-if="showInfo" class="absolute w-full z-10 p-2 left-1/2 transform -translate-x-1/2 bottom-14 flex justify-center items-center gap-2">
            <div class="p-3 bg-white border-2 border-black rounded-lg cursor-pointer">
                <span class="font-bold text-base pb-4">More info</span>
            </div>
            <div class="p-3 bg-white border-2 border-black rounded-lg cursor-pointer">
                <img src="../public/images/plus.png" alt="" class="w-6">
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const data = {
                anilist_content_id: 105398,
                title: "Na Honjaman Level Up",
                genres: [
                    "Action",
                    "Adventure",
                    "Fantasy"
                ],
                description: "In a world where awakened beings called “Hunters” must battle deadly monsters to protect humanity, Sung Jinwoo, nicknamed “the weakest hunter of all mankind,” finds himself in a constant struggle for survival. One day, after a brutal encounter in an overpowered dungeon wipes out his party and threatens to end his life, a mysterious System chooses him as its sole player: Jinwoo has been granted the rare opportunity to level up his abilities, possibly beyond any known limits. Follow Jinwoo’s journey as he takes on ever-stronger enemies, both human and monster, to discover the secrets deep within the dungeons and the ultimate extent of his powers.\n<br><br>\n(Source: Tappytoon)\n<br><br>\n<i>Note: Chapter count includes a prologue and 21 side stories.</i>",
                cover_image_url: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx105398-b673Vt5ZSuz3.jpg",
                release_date: "2024-09-22T08:45:17.634Z",
                type: "manga",
                average_score: 85,
                volumes: 0,
                chapters: 201
            }
let showInfo = ref(false);

function toggleInfo(){
    showInfo.value =!showInfo.value ;
    console.log(showInfo.value)
}

const truncatedDescription = computed(() => {
    // Add ellipsis if the description exceeds 200 characters
    return data.description.length > 100 ? data.description.slice(0, 100) + "..." : data.description;
});

// const props = defineProps({
//     data: Object,
// })
</script>

<style scoped>
@keyframes bounceDown {
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(25px);
  }
  60% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(0);
  }
}

.bounce-down {
    position: absolute;
    animation: bounceDown 0.2s; /* Adjust duration as needed */
}

</style>
