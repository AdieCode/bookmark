<template>
    <div>
        <div class="w-full h-full fixed top-0 left-0 -z-10 bg-white bg-opacity-90 backdrop-blur-3xl">
            <img v-if="contentData.cover_image_url" :src="contentData.cover_image_url" alt="" class="move-around w-full h-full object-cover opacity-40 filter blur-2xl">
        </div>

        <div class="flex flex-col h-auto items-start justify-center md:flex-row mt-12 gap-4 relative">


            <div class="w-52 m-auto md:m-0 md:w-80 h-fit border-black border-4 rounded-xl contain-content">
                <img v-if="contentData?.cover_image_url" :src="contentData.cover_image_url" alt="" class="w-full h-full object-cover">
                <div v-else class="p-10 text-xl font-bold text-center">No image found</div>
            </div>
            <!-- </div> -->

            <div class="w-4/5 h-auto m-auto md:w-1/3 md:m-0">
                <!-- Title -->
                <!-- <span class="ml-1 max-w-40 text-center border-4 border-black px-1 rounded-md text-sm text-black font-black hidden md:inline-block">Planning to read</span> -->
                <div class="flex flex-col mx-3 mt-1" :class="{'items-center': useToggles.isMobile}">
                    <span v-if="contentData.title?.english && contentData.title?.romaji && contentData.title?.english.toLowerCase() === contentData.title?.romaji.toLowerCase()" class="text-black font-extrabold text-xl">
                        {{ contentData.title?.english }} 
                        
                    </span>    

                    <div v-else-if="contentData.title?.english" class="flex flex-col">
                        <span class="text-black font-black text-xl">
                            {{ contentData.title?.english }} 
                            
                        </span>
                        <span class="text-stone-800 font-black">{{ contentData.title?.romaji }}</span>
                    </div>

                    <span v-else-if="contentData.title?.romaji" class="text-black font-extrabold text-xl">
                        {{ contentData.title?.romaji }} 
                        
                    </span>
                    <span v-else class="text-black font-extrabold text-xl">No title found</span>
                </div>

                <!-- extra info -->
                <div class="ml-3 my-6 font-medium">
                    <!-- tags -->
                    <tags :items="contentData.genres" :bigger="true" width="300" :allowClick="true" />

                    <!-- score and status -->
                    <div class="mb-4 flex gap-8">
                        <div v-if="contentData.average_score" class="mt-2">
                            <div class="mt-2 mb-1">Score <span class="font-black pl-1">{{contentData.average_score}}</span></div>
                            <Score :score="contentData.average_score"/>
                        </div>
                        <div v-if="!contentData.average_score" class="mt-2">
                            <div class="mt-2 mb-1">No score</div>
                            <Score :score="0"/>
                        </div>
                        <div class="mt-4">
                            <div>Release status</div>
                            <div class="font-black text-lg p-0">{{capitalizeStatus(contentData.status)}}</div>
                        </div>
                        <div class="mt-4">
                            <div>Content type</div>
                            <div class="font-black text-lg p-0">{{capitalizeStatus(contentData.type)}}</div>
                        </div>
                    </div>
                    <span class="text-xl">
                        Chp's 
                        <span class="font-black pl-1">{{ contentData.chapters }}</span>
                    </span>


                    <span v-if="contentData.volumes" class="text-xl">
                        <span class="px-4">|</span>
                        Vol's
                        <span class="font-black pl-1">{{ contentData.volumes }}</span>
                    </span>
                </div>
                <!-- description -->
                <div class="text-black text-base font-semibold mt-2 mx-4 paragraph-width">
                    <p class="">{{ cleanDescription(contentData.description) }}</p>
                    <!-- <p v-html="contentData.description"></p> -->
                </div>
                
            </div>

            <div class="cursor-pointer sticky top-20" @click="toPrevious">
                <img class="w-12 pr-2" src="../public/bookmark_icons/bookmark.png" alt="" srcset="">
                    <!-- Add {{ contentData.type.toLowerCase() }} to list -->
            </div>
            
        </div>

        <!-- view toggler  -->
        <div class="w-full flex justify-center gap-14 mt-36" :class="{'scrollbar-hide overflow-x-scroll !justify-start gap-8 mt-24 px-4 !text-3xl': useToggles.isMobile, '!text-5xl': !useToggles.isMobile}">
            <div class="text-center font-extrabold transition-all duration-200 cursor-pointer select-none" 
                :class="{ 'text-center !text-4xl font-extrabold text-neutral-600': currentSelector !== 0 && !useToggles.isMobile,
                    '!text-xl': currentSelector !== 0 && useToggles.isMobile
                }" 
                @click="() => toggleSelector(0)">
                Relations
            </div>
            <div class="text-center font-extrabold duration-200 cursor-pointer select-none" 
                :class="{ 'text-center !text-4xl font-extrabold text-neutral-600': currentSelector !== 1 && !useToggles.isMobile,
                    '!text-xl': currentSelector !== 1 && useToggles.isMobile
                }" 
                @click="() => toggleSelector(1)">
                Characters
            </div>
            <div class="text-center font-extrabold duration-200 cursor-pointer select-none" 
                :class="{ 'text-center !text-4xl font-extrabold text-neutral-600': currentSelector !== 2 && !useToggles.isMobile,
                    '!text-xl': currentSelector !== 2 && useToggles.isMobile
                }" 
                @click="() => toggleSelector(2)">
                Recommendations
            </div>
        </div>

        <!-- relations -->
        <div v-if="Array.isArray(contentData.relations) && contentData.relations?.length > 0 && currentSelector === 0" class="mt-10">
            <!-- <div class="text-center text-4xl font-extrabold">Relations</div> -->
            <div class="w-3/4 mx-auto flex" :class="{'w-full': useToggles.isMobile}">
                <div class="mt-10 px-4 flex flex-row justify-center flex-wrap gap-8 z-20 sm:w-full" :class="{'!gap-2 !p-1 mt-0': useToggles.isMobile}">
                    <div v-for="(item, index) in contentData.relations" :key="index">
                        <ContentCard
                            v-if="!useToggles.isMobile && item"
                            :data="item"
                        />
                        <MobileContentCard
                            v-else-if="item"
                            :data="item"
                            :key="'mobile-' + index"
                        />
                    </div>
                </div>
             </div>
         </div>
         <div v-else-if="!(contentData.relations?.length > 0) && currentSelector === 0" class="text-center text-2xl font-normal my-16">No relations found</div>
                     
        <!-- characters -->
        <div v-if="Array.isArray(contentData.characters) && contentData.characters?.length > 0 && currentSelector === 1" class="mt-10">
            <!-- <div class="text-center text-4xl font-extrabold">Characters</div> -->
            <div class="w-3/4 mx-auto flex" :class="{'w-full': useToggles.isMobile}">
                <div class="mt-10 px-4 flex flex-row justify-center flex-wrap gap-8 z-20 sm:w-full" :class="{'!gap-2 !p-1 mt-0': useToggles.isMobile}">
                    <div v-for="(item, index) in contentData.characters" :key="index">
                        <CharacterCard
                            v-if="item"
                            :data="item"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="(contentData.characters === 'no characters found') && currentSelector === 1" class="text-center text-2xl font-normal my-16">No characters found</div>

        <!-- recommendations -->
         <div v-if="contentData.recommendations && currentSelector === 2" class="mt-10">
            <!-- <div class="text-center text-4xl font-extrabold">Recommendations</div> -->
             <div class="w-3/4 mx-auto flex" :class="{'w-full': useToggles.isMobile}">
                 <div class="mt-10 px-4 flex flex-row justify-center flex-wrap gap-8 z-20 sm:w-full" :class="{'!gap-2 !p-1 mt-0': useToggles.isMobile}">
                    <div v-for="(item, index) in contentData.recommendations" :key="index">
                        <ContentCard
                            v-if="!useToggles.isMobile && item"
                            :data="item"
                        />
                        <MobileContentCard
                            v-else-if="item"
                            :data="item"
                            :key="'mobile-' + index"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!contentData.characters && currentSelector === 2" class="text-center text-2xl font-normal my-16">No recommendations found</div>

        <div class="h-32">

        </div>


        <!-- concept of what I actually want this to look like -->
        <!-- <div class="my-40 ">
             <div class="w-3/4 mx-auto">
                <div class=" mt-10 px-4 flex flex-row justify-start flex-wrap gap-8 z-20 sm:w-full">
                    <CharacterCard
                        v-for="(item, index) in contentData.characters"
                        :key="index"
                        :data="item"
                    />
                </div>
             </div>
         </div> -->


    </div>
</template>

<script setup>
import { ref } from 'vue';
const content = useContentStore();
const useToggles = useTogglesStore();
const router = useRouter()
const route = useRoute();

const currentSelector = ref(0);
const searchShow = computed(() => useToggles.searchShow);

if (!(content?.selected_content.length > 0) ){
    await content.getContentDataById(route.query.id); 
}
const contentData = computed(() => content?.selected_content);

function cleanDescription(input) {
    if (!input) return 'No description found.';

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

function toPrevious() {
  router.back()
}

function capitalizeStatus(status) {
    if (!status) return ''; // Handle undefined or null inputs
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This makes the scroll smooth
        });
}

function toggleSelector (index) {
    console.log(index);
    currentSelector.value = index;
}

watch(
    () => route.query.id, // Watch the `id` query parameter
    async (newId, oldId) => {
        if (newId !== oldId) {
            await content.getContentDataById(newId);
            scrollToTop()
        }
    }
);

watch(searchShow, (visible) => {
  if (visible) {
    console.log('this ran')
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})


definePageMeta({
  pageTransition: {
    name: 'page'
  }
})

</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.paragraph-width{
    max-width: 750px;
}

.scrollbar-hide {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.move-around {
    animation: moveAround 10s both infinite;
}

@keyframes moveAround {
    0%{
        transform: translateX(0px);
        transform: translateY(0px);
    }
    10% {
        transform: translateY(50px);
        transform: translateX(20px);
    }
    25% {
        transform: translateX(-50px);
        transform: translateX(-20px); 
    }
    50% {
        transform: translateY(-20px);
        transform: translateX(40px); /* Moves bubble upwards */
    }
    75% {
        transform: translateY(20px);
        transform: translateX(-40px); /* Moves bubble upwards */
    }
    100% {
        transform: translateX(0px);
        transform: translateY(0px);
    }
}

</style>