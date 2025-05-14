<template>
    <div class="relative bg-white border-4 border-black rounded-xl hover:shadow-2xl hover:shadow-black duration-200 flex flex-row justify-start items-center cursor-pointer"
        @click="moreInfo">

        <div class="w-28 h-32 m-2 rounded-md border-4 border-black  flex items-center justify-center overflow-hidden">
            <img 
                v-if="data.cover_image_url" 
                :src="data.cover_image_url" 
                alt="cover image" 
                class="w-full h-full object-cover"
            />
        </div>
        
        <div class="h-full w-full py-4 ml-3 flex flex-col justify-start items-start">
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

            <!-- Genres -->
            <!-- <tags :items="data.genres" width="300" :max-height="60" class="mt-2"/> -->

            <!-- Manga Scores -->
             <!-- <div class="flex justify-start">

                 <DividerLine text="scores" class="mt-6 mb-2"/>
             </div>
            <div class="flex flex-row items-center gap-6">
                <div class="flex items-center">
                    <span class="pl-1 text-black text-base font-normal">PL</span>
                    <span class="pl-1 text-black text-base font-extrabold">8.4</span>\
                </div>

                <div class="flex items-center">
                    <span class="pl-1 text-black text-base font-normal">MAL</span>
                    <span class="pl-1 text-black text-base font-extrabold">9.1</span>
                </div>
            </div> -->

            

            <!-- Manga Length -->
            <div>
                
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