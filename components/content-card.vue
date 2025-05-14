<template>
    <div class="w-52 relative" @mouseenter="toggleInfo" @mouseleave="toggleInfo">
        <!-- Manga cover card -->
        <div class="border-4 border-black rounded-xl relative hover:shadow-lg transition-transform duration-200 ease-in-out" :class="{'h-80' : !data.cover_image_url}">
            <img v-if="!data.cover_image_url" src="../public/gif/icons8-waiting.gif" alt="" class="w-8 rounded-lg p-2">
            <img v-if="data.cover_image_url" :src="data.cover_image_url" alt="" class="rounded-lg w-full h-80 object-cover">
            
            <!-- Info section, visible when showInfo is true -->
            <div v-if="showInfo" class="absolute w-full z-10 p-2 bottom-4 flex justify-center items-center gap-2 bounce-down">
                <div class="p-3 bg-white border-2 border-black rounded-lg cursor-pointer" @click="moreInfo">
                    <span class="font-bold text-base pb-4">More info</span>
                </div>
                <div class="p-3 bg-white border-2 border-black rounded-lg cursor-pointer">
                    <img src="../public/bookmark_icons/bookmark.png" alt="" class="w-6">
                </div>
            </div>
        </div>

        <!-- Title -->
        <div class="flex flex-col mx-3 w-48 mt-1">
            <span v-if="data.title.english && data.title.romaji && data.title.english.toLowerCase() === data.title.romaji.toLowerCase()" 
                class="text-stone-600 font-extrabold md-title"
                :title="data.title.english">
                {{ data.title.english }}
            </span>

            <div v-else-if="data.title.english" class="flex flex-col">
                <span class="text-stone-600 font-extrabold md-title line-clamp-1" 
                    :title="data.title.english">
                    {{ data.title.english }}
                </span>
                <span class="text-stone-600 font-semibold small-title line-clamp-1" 
                    :title="data.title.romaji">
                    {{ data.title.romaji }}
                </span>
            </div>

            <span v-else-if="data.title.romaji" 
                class="text-stone-600 font-extrabold md-title line-clamp-2" 
                :title="data.title.romaji">
                {{ data.title.romaji }}
            </span>
            
            <span v-else class="text-stone-600 font-extrabold md-title">No title found</span>
        </div>

        <!-- Pop-up info, visible on hover or click -->
        <div v-if="showInfo" class="absolute w-64 max-h-64 bg-white border-2 border-black rounded-lg shadow-lg z-10 p-2 transform -top-2 -left-6 pointer-events-none bounce-down md:pointer-events-auto">
            <div v-if="data.isAdult"  class="absolute top-0 right-0 p-1 pl-2 rounded-bl rounded-tr bg-black text-white">
                <!-- <span v-if="!data.isAdult" class="font-extrabold small-title">PG 13</span> -->
                <span v-if="data.isAdult" class="font-extrabold small-title">18+</span>
            </div>
            
            <div class="mt-4 p-2">  
                <span class="font-extrabold"><span class="text-lg font-normal">{{data.type}}</span> - {{ data.status }}</span>
            </div>

            <!-- Genres -->
            <tags :items="data.genres" width="300" :max-height="52"/>

            <!-- Description -->
            <div class="text-black text-sm mt-2 mx-2">
                <p class="line-clamp-3">{{ truncatedDescription }}</p>
            </div>

            <!-- Scores and status -->
            <div class="flex justify-around text-xs text-white bg-black p-3 rounded-md font-bold mt-2">
                <span><span class="font-extralight">Score </span>{{ data.average_score }}</span>

                <!-- Anime  -->
                <span v-if="data.type === 'ANIME'"><span class="font-extralight">Episodes </span>{{ data.episodes }}</span>

                <!-- Manga  -->
                <span v-if="data.type === 'MANGA'"><span class="font-extralight">Chp's </span>{{ data.chapters }}</span>
                <span v-if="data.type === 'MANGA' && data.volumes"><span class="font-extralight">Vol's </span>{{ data.volumes }}</span>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const useToggles = useTogglesStore()
const content = useContentStore();
const router = useRouter();

let showInfo = ref(false);
const props = defineProps({
    data: Object,
})

function toggleInfo() {
    showInfo.value = !showInfo.value;
}


function cleanDescription(input) {
    let result = input.replace(/<i>[\s\S]*?<\/i>/g, '');
    result = result.replace(/<I\s*\/?>/g, '');
    result = result.replace(/<\/b\s*\/?>/g, '');
    result = result.replace(/<b\s*\/?>/g, '');   
    result = result.replace(/<br\s*\/?>/g, '');
    result = result.replace(/<Br\s*\/?>/g, '');
    result = result.replace(/<bR\s*\/?>/g, '');
    result = result.replace(/<BR\s*\/?>/g, '');
    result = result.replace(/\(Source:.*?\)/g, '');
    result = result.trim();

    return result;
}

// Computed property to truncate the description if it's too long
const truncatedDescription = computed(() => {
  // Check if the description exists before slicing it
  if (props.data?.description) {

    props.data.description = cleanDescription(props.data.description)
    return props.data.description.length > 100
      ? props.data.description.slice(0, 100) + "..."
      : props.data.description;
  }
  return ''; // Return empty string if no description
});

async function moreInfo() {
    // await content.mapNewContentData(props.data);
    router.push('/info?id=' + props.data.anilist_content_id);
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
    animation: bounceDown 0.4s ease-out forwards;
}

.object-cover {
  object-fit: cover;
}

.md-title{
    font-size: 16px;
}
.small-title{
    font-size: 13px;
}
</style>
