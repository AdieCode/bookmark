<template>
    <div class="w-28 relative mb-2" @click="moreInfo">
        <!-- Manga cover card -->
        <div class="border-4 border-black rounded-xl relative hover:shadow-lg transition-transform duration-200 ease-in-out dark:border-white dark:shadow-[0_0_6px_1px_rgba(255,255,255,0.6)]" :class="{'h-32' : !data.cover_image_url}">
            <img v-if="!data.cover_image_url" src="../public/gif/icons8-waiting.gif" alt="" class="w-8 rounded-lg p-2 z-20">
            <img v-if="data.cover_image_url" :src="data.cover_image_url" alt="" class="rounded-lg w-full h-40 object-cover z-20">
            <striper/>
        </div>

        <!-- Title -->
        <div class="flex flex-col mx-2 w-24 mt-1">
            <span v-if="data.title?.english" 
                class="text-stone-600 font-extrabold text-xs line-clamp-2 dark:text-white"
                :title="data.title?.english">
                {{ data.title?.english }}
            </span>

            <div v-else-if="data.title?.romaji" class="flex flex-col">
                <span class="text-stone-600 font-extrabold text-xs line-clamp-2 dark:text-white" 
                    :title="data.title?.romaji">
                    {{ data.title?.romaji }}
                </span>
            </div>
            
            <span v-else class="text-stone-600 font-extrabold text-xs dark:text-white">No title found</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const useToggles = useTogglesStore()
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
    return props.data.description?.length > 100
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
