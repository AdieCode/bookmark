<template>
    <div  class="w-52 relative" @mouseenter="toggleInfo" @mouseleave="toggleInfo">
        <!-- Manga cover card -->
        <div class="border-4 border-black rounded-xl relative hover:shadow-lg transition-transform duration-200 ease-in-out dark:border-white dark:shadow-[0_0_7px_1px_rgba(255,255,255,0.8)]" 
            :class="{'h-80' : !data.cover_image_url}"
            >
                <!-- Emergency stripes background while image is loading -->
                <div v-if="imageLoading" class="absolute inset-0 w-full h-full rounded-lg stripes-bg dark:stripes-bg-dark z-0"></div>
                <img v-if="!data.cover_image_url" src="../public/gif/icons8-waiting.gif" alt="" class="w-8 rounded-lg p-2">
                <img v-if="data.cover_image_url" :src="data.cover_image_url" alt="" class="rounded-lg w-full h-80 object-cover relative z-10"
                    @load="imageLoading = false"
                    @error="imageLoading = false"
                >

            <!-- Info section, visible when showInfo is true -->
            <div v-if="showInfo" class="absolute w-full z-10 p-2 bottom-2 flex justify-center items-center gap-2 bounce-down">
                <div class="p-3 bg-white border-2 border-black rounded-lg cursor-pointer dark:bg-black dark:border-white"
                    @click="moreInfo"
                    @mousedown="handleMouseDown">
                    <span class="font-bold text-base pb-4">More info</span>
                    <!-- <a :href="'/info?id=' + data.anilist_content_id" title="Go to info page">
                    </a> -->
                </div>
                <div class="p-3 bg-white border-2 border-black rounded-lg cursor-pointer dark:bg-black dark:border-white" @click="trackContent">
                    <img v-if="data?.tracked?.status === 'UNTRACKED' && isDarkMode"
                        src="../public/bookmark_icons/bookmark-white.png"
                        alt=""
                        class="w-6">

                     <img v-else-if="data?.tracked?.status === 'UNTRACKED' && !isDarkMode"
                        src="../public/bookmark_icons/bookmark.png"
                        alt=""
                        class="w-6">

                    <img v-else-if="data?.tracked?.status !== 'UNTRACKED' && isDarkMode"
                        src="../public/bookmark_icons/tracked-white.png"
                        alt=""
                        class="w-6">

                    <img v-else
                        src="../public/bookmark_icons/tracked-black.png"
                        alt="bookmarked-icon"
                        class="w-6"/>
                </div>
            </div>
        </div>

        <!-- Title -->
        <div class="flex flex-col mx-3 w-48 mt-1">
            <span v-if="data.title?.english && data.title?.romaji && data.title?.english.toLowerCase() === data.title?.romaji.toLowerCase()"
                class="text-stone-600 font-extrabold md-title cursor-pointer dark:text-white"
                @click="copyText(data.title?.english)"
                :title="data.title?.english">
                {{ data.title?.english }}
            </span>

            <div v-else-if="data.title?.english" class="flex flex-col">
                <span class="text-stone-600 font-extrabold md-title line-clamp-1 cursor-pointer dark:text-white"
                    @click="copyText(data.title?.english)"
                    :title="data.title?.english">
                    {{ data.title?.english }}
                </span>
                <span class="text-stone-600 font-semibold small-title line-clamp-1 cursor-pointer dark:text-white/70"
                    @click="copyText(data.title?.romaji)"
                    :title="data.title?.romaji">
                    {{ data.title?.romaji }}
                </span>
            </div>

            <span v-else-if="data.title?.romaji"
                class="text-stone-600 font-extrabold md-title line-clamp-2 cursor-pointer dark:text-white"
                @click="copyText(data.title?.romaji)"
                :title="data.title?.romaji">
                {{ data.title?.romaji }}
            </span>

            <span v-else class="text-stone-600 font-extrabold md-title">No title found</span>
        </div>

        <!-- Pop-up info, visible on hover or click -->
        <div v-if="showInfo" class="absolute w-64 max-h-64 bg-white border-2 border-black rounded-lg shadow-lg z-10 p-2 transform -top-2 -left-6 pointer-events-none bounce-down md:pointer-events-auto dark:bg-black dark:border-white dark:shadow-[0_0_7px_1px_rgba(255,255,255,0.4)]">
            <div v-if="data.isAdult"  class="absolute top-0 right-0 p-1 pl-2 rounded-bl rounded-tr bg-black text-white">
                <span v-if="data.isAdult" class="font-extrabold small-title">18+</span>
            </div>

            <div class="p-2 flex justify-center gap-2 border border-black rounded mb-2 dark:border-white">
                <!-- <span class="font-extrabold"><span class="text-lg font-normal">{{data.type}}</span> - {{ data.status }}</span> -->
                <div class="flex flex-col justify-center items-start">
                    <div class="text-xs font-light ">Content</div>
                    <div class="text-xs font-extrabold">{{ data.type }}</div>
                </div>

                <div class="h-full py-5 border border-black dark:border-white"></div>

                <div class="flex flex-col justify-center items-start">
                    <div class="text-xs font-light">Release</div>
                    <div v-if="data.status === 'NOT_YET_RELEASED'"
                        class="text-xs font-extrabold"
                    >
                        UNRELEASED
                    </div>
                    <div v-else class="text-xs font-extrabold">
                        {{ data.status }}
                    </div>
                    
                </div>

                <div class="h-full py-5 border border-black dark:border-white"></div>

                <div class="flex flex-col justify-center items-start">
                    <div class="text-xs font-light">Tracking</div>
                    <div class="text-xs font-extrabold">{{ data.tracked.status.toUpperCase() }}</div>
                </div>
            </div>
<!-- 
            <div class="mt-4 p-2">
                <span class="font-extrabold"><span class="text-lg font-normal">{{data.type}}</span> - {{ data.status }}</span>
            </div> -->

            <!-- Genres -->
            <tags :items="data.genres" width="300" :max-height="56" :invert="isDarkMode"/>

            <!-- Description -->
            <div class="text-black text-sm mt-2 mx-2 dark:text-white text-start">
                <p v-if="truncatedDescription.length > 0" class="line-clamp-3">{{ truncatedDescription }}</p>
                <p v-else>No description</p>
            </div>

            <!-- Scores and status -->
            <div class="flex justify-around text-xs text-white bg-black p-3 rounded-md font-bold mt-2 dark:shadow-[0_0_6px_2px_rgba(255,255,255,0.2)]">
                <span><span class="font-extralight">Score </span>{{ data?.average_score || "?" }}</span>

                <!-- Anime  -->
                <span v-if="data.type === 'ANIME'"><span class="font-extralight">Episodes </span>{{ data?.episodes || "?" }}</span>

                <!-- Manga  -->
                <span v-if="data.type === 'MANGA'"><span class="font-extralight">Chp's </span>{{ data?.chapters || "?" }}</span>
                <span v-if="data.type === 'MANGA' && data.volumes"><span class="font-extralight">Vol's </span>{{ data?.volumes }}</span>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
let imageLoading = ref(true);

onMounted(() => {
    if (props.data?.cover_image_url) {
        const img = new window.Image();
        img.src = props.data.cover_image_url;
        img.onload = () => { imageLoading.value = false; };
        img.onerror = () => { imageLoading.value = false; };
    } else {
        imageLoading.value = false;
    }
});
const useToggles = useTogglesStore();
const useContent = useContentStore();
const useExtraData = useExtraDataStore();
const useTheme = useThemeStore();
const router = useRouter();

const isDarkMode = computed(() => useTheme.isDarkMode);

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

function copyText(text) {
    useToggles.setNotification("title copied", 3)
    navigator.clipboard.writeText(text)
        .then(() => {
        console.log('Text copied to clipboard')
        })
        .catch(err => {
        console.error('Failed to copy text: ', err)
        });
    setTimeout(() => {
          useToggles.hideNotification();
    }, 1000);
}

function trackContent() {
    console.log(props.data?.tracked?.status)
    
    if (props.data?.tracked?.status === 'UNTRACKED'){
        useToggles.setNotification("Bookmarked", 0)
        useContent.trackContent({
            content_id: props.data.anilist_content_id,
            content_status:'planning',
            content_type:props.data.type,
        })
    
        props.data.tracked.status = 'planning';

        setTimeout(() => {
          useToggles.hideNotification();
        }, 1000);

    }  else {
        useExtraData.setNewEditableData(props.data)
        useToggles.toggleEditShow();
    }

    setTimeout(() => {
          useToggles.hideNotification();
    }, 1000);
}


// function trackContent() {
    
//     if (props.data?.tracked?.status === 'UNTRACKED'){
//         useToggles.setNotification("Bookmarked", 0)
//         useContent.trackContent({
//             content_id: props.data.anilist_content_id,
//             content_status:'planning',
//             content_type:props.data.type,
//         })
    
//         if (props.data.tracked) {
//             props.data.tracked.status = 'planning';
//         }
//     }  else {
//         useToggles.toggleEditShow();
//     }

//     setTimeout(() => {
//           useToggles.hideNotification();
//     }, 1000);
// }


function handleMouseDown(event) {
    if (event.button === 1) {
        console.log("this ran")
        const url = `/info?id=${props.data.anilist_content_id}`;
        window.open(url, '_blank');
    }
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

/* Emergency stripes background */
.stripes-bg {
    background: repeating-linear-gradient(
        45deg,
        #000 0px,
        #000 10px,
        #fff 10px,
        #fff 20px
    );
    opacity: 0.7;
}

/* Emergency stripes background (opposite: white first, then black) */
.stripes-bg-dark {
    background: repeating-linear-gradient(
        45deg,
        #fff 0px,
        #fff 10px,
        #000 10px,
        #000 20px
    );
    opacity: 0.7;
}

</style>
