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

            <div class="w-4/5 h-auto m-auto md:w-1/3 md:m-0"
                :class="{'!w-11/12': useToggles?.isMobile}">

                <!-- title -->
                <div class="flex flex-col mx-3 mt-1" 
                    :class="{'items-center': useToggles?.isMobile}">
                    <span v-if="contentData.title?.english && contentData.title?.romaji && contentData.title?.english.toLowerCase() === contentData.title?.romaji.toLowerCase()" class="text-black font-extrabold text-xl">
                        {{ contentData.title?.english }} 
                    </span>    

                    <div v-else-if="contentData.title?.english" class="flex flex-col">
                        <span class="text-black font-black text-xl">
                            {{ contentData.title?.english }} 
                        </span>
                        <span class="text-stone-800 font-black"
                            :class="{'!font-semibold': useToggles?.isMobile}"
                            >
                            {{ contentData.title?.romaji }}
                        </span>
                    </div>

                    <span v-else-if="contentData.title?.romaji" class="text-black font-extrabold text-xl">
                        {{ contentData.title?.romaji }} 
                    </span>
                    <span v-else class="text-black font-extrabold text-xl">No title found</span>
                </div>

                <!-- content info -->
                <div class="ml-3 my-6 font-medium"
                    :class="{'!mx-2': useToggles.isMobile}">

                    <!-- tags -->
                    <tags :items="contentData?.genres" :bigger="true" width="300" :allowClick="true" />

                    <!-- score and status -->
                    <div class="mb-4 flex gap-8"
                         :class="{'!gap-5': useToggles.isMobile}">
                        <div v-if="contentData.average_score" class="mt-2">
                            <div class="mt-2 mb-1"
                                :class="{'text-sm font-light': useToggles.isMobile}"
                                >
                                    Score 
                                    <span class="font-black pl-1"
                                        :class="{'font-semibold': useToggles.isMobile}"
                                        >
                                        {{contentData.average_score}}
                                    </span>
                            </div>
                            <Score :score="contentData.average_score"/>
                        </div>
                        <div v-if="!contentData?.average_score" class="mt-2">
                            <div class="mt-2 mb-1">No score</div>
                            <Score :score="0"/>
                        </div>
                        <div class="mt-4">
                            <div :class="{'text-sm font-light': useToggles.isMobile}">
                                Release status
                            </div>
                            <div class="font-black text-lg p-0">{{capitalizeStatus(contentData.status)}}</div>
                        </div>
                        <div class="mt-4">
                            <div :class="{'text-sm font-light': useToggles.isMobile}">
                                Content type
                            </div>
                            <div class="font-black text-lg p-0">{{capitalizeStatus(contentData.type)}}</div>
                        </div>
                    </div>

                    <div v-if="!useToggles.isMobile" class="flex gap-6 w-fit text-white bg-black mt-7 p-3 rounded-md font-bold">
                        <!-- Anime  -->
                        <span v-if="contentData.type === 'ANIME'" class="text-xl font-black pl-1 pr-2"><span class="font-thin">Episodes </span>{{ contentData.episodes }}</span>

                        <!-- Manga  -->
                        <span v-if="contentData?.type === 'MANGA'" class="text-xl font-black pl-1"><span class="font-thin">Chapters </span>{{ contentData.chapters }}</span>
                        <span v-if="contentData?.type === 'MANGA' && contentData.volumes" class="text-xl font-black pl-1 pr-3"><span class="font-thin">Volumes </span>{{ contentData.volumes }}</span>
                        <!-- <span v-if="contentData?.type === 'MANGA' && contentData.volumes" class="text-xl font-black pl-1"><span class="font-medium"><span class="px-4"></span>Volumes </span>{{ contentData.volumes }}</span> -->
                    </div>

                    <div v-if="useToggles.isMobile" class="flex justify-around text-xs text-white bg-black p-3 rounded-md font-bold mt-2">
                        <!-- Anime  -->
                        <span v-if="contentData.type === 'ANIME'"><span class="font-extralight">Episodes </span>{{ contentData.episodes }}</span>

                        <!-- Manga  -->
                        <span v-if="contentData?.type === 'MANGA'"><span class="font-extralight">Chapters </span>{{ contentData.chapters }}</span>
                        <span v-if="contentData?.type === 'MANGA' && contentData.volumes"><span class="font-extralight">Volumes </span>{{ contentData.volumes }}</span>

                    </div>


                </div>

                <!-- description -->
                <div class="text-black text-base font-semibold mt-2 mx-4 paragraph-width">
                    <Description  v-if="contentData?.description" :text="contentData?.description"/>
                </div>
                
            </div>

            <div v-if="!useToggles.isMobile"
                class="cursor-pointer sticky top-20">
                <img class="w-12 pr-2" src="../public/bookmark_icons/bookmark.png" alt="" srcset="">
            </div>
            
        </div>

        <!-- view toggler for desktop -->
        <div v-if="!useToggles.isMobile" class="w-full flex justify-center gap-14 mt-36" :class="{'scrollbar-hide overflow-x-scroll !justify-start gap-8 mt-24 px-4 !text-3xl': useToggles.isMobile, '!text-5xl': !useToggles.isMobile}">
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

        <!-- view toggler for mobile -->
        <Swiper
            v-if="useToggles.isMobile"
            :modules="[Navigation]"
            :slides-per-view="1.2"
            :space-between="10"
            :loop="true"
            :centeredSlides="true"
            :resistance-ratio="0.85"
            :touch-ratio="1"
            :watch-overflow="true"
            :speed="400"
            @swiper="onSwiper"
            @realIndexChange="handleSlideChange"
            class="w-full max-w-3xl mt-32 cursor-pointer relative "
        >
            <SwiperSlide
                v-for="(slide, i) in slides"
                :key="slide"
            >
                <div
                    class="transition-all duration-200 text-center"
                    :class="{
                        'text-2xl font-bold text-black scale-110 absolute -translate-y-0 opacity-100': i === activeIndex,
                        'text-base text-black scale-75 absolute translate-y-2 opacity-10': i !== activeIndex
                    }"
                >
                    {{ slide }}
                </div>
            </SwiperSlide>
        </Swiper>

        <dotTracker 
            v-if="useToggles.isMobile"
            :amountOfDots="slides.length" 
            :currentDot="activeIndex"
        />


        <!-- relations -->
        <div v-if="Array.isArray(contentData.relations) && contentData.relations?.length > 0 && currentSelector === 0" 
            class="mt-10"
            :class="{'!mt-0': useToggles.isMobile}">
            <!-- <div class="text-center text-4xl font-extrabold">Relations</div> -->
            <div class="w-3/4 mx-auto flex" :class="{'w-full': useToggles.isMobile}">
                <div class="mt-10 px-4 flex flex-row justify-center flex-wrap gap-8 z-20 sm:w-full" :class="{'!gap-2 !p-1 mt-0': useToggles.isMobile}">
                    <div v-for="(item, index) in contentData.relations" 
                        :key="'relations-' + index"
                        class="opacity-0 animate-fade-in"
                        :style="{ animationDelay: `${index * displayDelay}ms` }">
                        <ContentCard
                            v-if="!useToggles.isMobile && item"
                            :data="item"
                        />
                        <MobileContentCard
                            v-else-if="item"
                            :data="item"
                            :key="'relations-mobile-' + index"
                        />
                    </div>
                </div>
             </div>
         </div>
         <div v-else-if="!(contentData.relations?.length > 0) && currentSelector === 0" class="text-center text-2xl font-normal my-16">No relations found</div>
                     

        <!-- characters -->
        <div v-if="Array.isArray(contentData.characters) && contentData.characters?.length > 0 && currentSelector === 1" 
            class="mt-10"
            :class="{'!mt-0': useToggles.isMobile}">
            <!-- <div class="text-center text-4xl font-extrabold">Characters</div> -->
            <div class="w-3/4 mx-auto flex" :class="{'w-full': useToggles.isMobile}">
                <div class="mt-10 px-4 flex flex-row justify-center flex-wrap gap-8 z-20 sm:w-full" :class="{'!gap-2 !p-1 mt-0': useToggles.isMobile}">
                    <div v-for="(item, index) in contentData.characters" 
                        :key="'characters-' + index"
                        class="opacity-0 animate-fade-in"
                        :style="{ animationDelay: `${index * displayDelay}ms` }">
                        <CharacterCard
                            v-if="item"
                            :data="item"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!contentData?.characters?.length > 0 && currentSelector === 1" class="text-center text-2xl font-normal my-16">No characters found</div>


        <!-- recommendations -->
         <div v-if="contentData?.recommendations?.length > 0 && currentSelector === 2" 
            class="mt-10"
            :class="{'!mt-0': useToggles.isMobile}">
            <!-- <div class="text-center text-4xl font-extrabold">Recommendations</div> -->
             <div class="w-3/4 mx-auto flex" :class="{'w-full': useToggles.isMobile}">
                 <div class="mt-10 px-4 flex flex-row justify-center flex-wrap gap-8 z-20 sm:w-full" :class="{'!gap-2 !p-1 mt-0': useToggles.isMobile}">
                    <div v-for="(item, index) in contentData.recommendations"
                         :key="'recommendations-' + index"
                         class="opacity-0 animate-fade-in"
                        :style="{ animationDelay: `${index * displayDelay}ms` }">
                        <ContentCard
                            v-if="!useToggles.isMobile && item && !(item.anilist_content_id === 'No ID')"
                            :data="item"
                        />
                        <MobileContentCard
                            v-else-if="item && !(item.anilist_content_id === 'No ID')"
                            :data="item"
                            :key="'recommendations-mobile-' + index"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!contentData?.recommendations?.length > 0 && currentSelector === 2" class="text-center text-2xl font-normal my-16">No recommendations found</div>

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
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
const content = useContentStore();
const useToggles = useTogglesStore();
const router = useRouter()
const route = useRoute();

const currentSelector = ref(0);
const searchShow = computed(() => useToggles?.searchShow);
const swiperRef = ref(null);

const displayDelay = 30;

const onSwiper = (swiper) => {
  swiperRef.value = swiper;
  console.log('Swiper initialized:', swiper);
};

function goToNextSlide() {
  if (swiperRef.value) {
    swiperRef.value.slideNext();
  } else {
    console.log('Swiper not initialized');
  }
}

function goToPrevSlide() {
  if (swiperRef.value) {
    swiperRef.value.slidePrev();
  } else {
    console.log('Swiper not initialized');
  }
}

const slides = [ 'Relations', 'Characters', 'Recommendations']
const activeIndex = ref(0)

if (!(content?.selected_content.length > 0) ){
    await content.getContentDataById(route.query.id); 
}
const contentData = computed(() => content?.selected_content);

function cleanDescription(input) {
    if (!input) return 'No description found.';

    let result = input.replace(/<i>[\s\S]*?<\/i>/g, '');
    result = input.replace(/<u>[\s\S]*?<\/u>/g, '');
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
    currentSelector.value = index;
}

function handleSlideChange(swiper) {
  activeIndex.value = swiper.realIndex
  console.log(swiper.realIndex)
  toggleSelector(swiper.realIndex)
}

function trackContent() {

    useToggles.setNotification("Bookmarked", 0)
    content.trackContent({
        content_id: content?.selected_content?.anilist_content_id,
        content_status:'planning',
        content_type:content?.selected_content?.type,
    })
    setTimeout(() => {
          useToggles.hideNotification();
    }, 1000);
}

watch(() => route.query.id, async (newId, oldId) => {
    if (newId !== oldId) {
        await content.getContentDataById(newId);
        scrollToTop()
    }
});

watch(searchShow, (visible) => {
  if (visible) {
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
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
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
    animation: moveAround 20s both infinite;
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
        transform: translateX(40px);
    }
    75% {
        transform: translateY(20px);
        transform: translateX(-40px); 
    }
    100% {
        transform: translateX(0px);
        transform: translateY(0px);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}
</style>