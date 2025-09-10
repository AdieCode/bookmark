<template>
    <div class="relative rounded-lg hover:bg-gray-300 flex flex-row justify-start items-center cursor-pointer"
        @click="moreInfo">

        <div v-if="!useToggles.isMobile" class="w-28 h-32 m-2 rounded-md border-4 border-black  flex items-center justify-center overflow-hidden"
            :class="{'!w-12 h-32': useToggles.isMobile}">
            <img 
                v-if="data.cover_image_url" 
                :src="data.cover_image_url" 
                alt="cover image" 
                class="w-full h-full object-cover"
            />
        </div>
        
        <div v-if="!useToggles.isMobile" class="h-full w-full py-4 ml-3 flex flex-col justify-start items-start">
            <div v-if="data.isAdult"  class="absolute top-0 right-0 p-1 pl-2 rounded-bl rounded-tr bg-black text-white">
                <!-- <span v-if="!data.isAdult" class="font-extrabold small-title">PG 13</span> -->
                <span v-if="data.isAdult" class="font-extrabold small-title">18+</span>
            </div>

            <!-- Title -->
            <div class="text-black font-bold text-md mb-2 line-clamp-1 w-72">
                <div v-if="data.title?.english" :title="data.title?.english" >{{ data.title?.english }}</div>
                <div v-else-if="data.title?.romaji" :title="data.title?.romaji">{{ data.title?.romaji }}</div>
                <div v-else>No title found</div>
            </div>

            <div class="">
                <span class="font-extrabold"><span class="text-lg font-normal">{{data.type}}</span> - {{ data.status }}</span>
            </div>

            <div class="w-72 flex justify-around text-xs text-white bg-black p-3 rounded-md font-bold mt-4">
                <span v-if="data.average_score"><span class="font-extralight">Score </span>{{ data.average_score }}</span>
                <span v-else="data.average_score" class="font-extralight">No Score</span>

                <!-- Anime  -->
                <span v-if="data.type === 'ANIME'"><span class="font-extralight">Episodes </span>{{ data.episodes }}</span>

                <!-- Manga  -->
                <span v-if="data.type === 'MANGA'"><span class="font-extralight">Chp's </span>{{ data.chapters }}</span>
                <span v-if="data.type === 'MANGA' && data.volumes"><span class="font-extralight">Vol's </span>{{ data.volumes }}</span>

            </div>
        </div>

        <!-- if mobile  -->
         <div v-if="useToggles.isMobile"  class="h-full w-full py-4 ml-3 flex flex-col justify-start items-start">
            <div class="flex">
                <div class="w-14 h-20 m-2 rounded-md border-4 border-black  flex items-center justify-center overflow-hidden">
                    <img 
                        v-if="data.cover_image_url" 
                        :src="data.cover_image_url" 
                        alt="cover image" 
                        class="w-full h-full object-cover"
                    />
                </div>
                <div class="flex flex-col justify-center">
                    <div v-if="data.isAdult"  class="absolute top-0 right-0 p-1 pl-2 rounded-bl rounded-tr bg-black text-white">
                        <!-- <span v-if="!data.isAdult" class="font-extrabold small-title">PG 13</span> -->
                        <span v-if="data.isAdult" class="font-extrabold small-title">18+</span>
                    </div>

                    <!-- Title -->
                    <div class="text-black font-bold text-md mb-2 line-clamp-2 w-40">
                        <div v-if="data.title?.english" :title="data.title?.english" >{{ data.title?.english }}</div>
                        <div v-else-if="data.title?.romaji" :title="data.title?.romaji">{{ data.title?.romaji }}</div>
                        <div v-else>No title found</div>
                    </div>

                    <div class="">
                        <span class="font-extrabold"><span class="text-lg font-normal">{{data.type}}</span> - {{ data.status }}</span>
                    </div>
                </div>
            </div>

            <div class="w-72 flex justify-around text-xs text-white bg-black p-3 rounded-md font-bold mt-4"
            :class="{'!w-60': useToggles.isMobile}">
                <span v-if="data.average_score"><span class="font-extralight">Score </span>{{ data.average_score }}</span>
                <span v-else="data.average_score" class="font-extralight">No Score</span>

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
const useToggles = useTogglesStore();
const router = useRouter();
const props = defineProps({
    data: Object,
})

function moreInfo() {
    useToggles.toggleSearchShow();
    // useToggles.mapNewContentData(props.data);
    router.push('/info?id=' + props.data.anilist_content_id);
}
</script>

<style lang="css" scoped>

</style>