<template>
    <div class="relative h-48 bg-white border-4 border-black rounded-xl hover:shadow-2xl hover:shadow-black duration-200 flex flex-row justify-start items-center cursor-pointer"
        @click="moreInfo">

        <div class="w-32 h-full rounded-md bg-slate-800 flex items-center justify-center overflow-hidden">
            <img 
                v-if="data.cover_image_url" 
                :src="data.cover_image_url" 
                alt="cover image" 
                class="w-full h-full object-cover"
            />
        </div>
        
        <div class="h-full w-full p-6 line-clamp-2 flex flex-col">
            <!-- completion status -->
            <!-- <div class="absolute top-0 right-0 p-1 pl-2 rounded-bl rounded-tr bg-black text-white">
                <span class="font-extrabold small-title">Planning to read</span>
            </div> -->

            <!-- Title -->
            <div class="text-black font-bold text-xl mb-2">
                <dic v-if="data.title.english && data.title.romaji && data.title.english.toLowerCase() === data.title.romaji.toLowerCase()">{{ data.title.english }}</dic>
                <div v-else-if="data.title.english" class="flex flex-col">
                    <span class="line-clamp-1">{{ data.title.english }}</span>
                </div>
                <div v-else-if="data.title.romaji" class="line-clamp-2">{{ data.title.romaji }}</div>
                <div v-else>No title found</div>
            </div>

            <!-- Genres -->
            <tags :items="data.genres" width="300" :max-height="52" class="mt-2"/>

            <!-- Manga Scores -->
             <div class="flex justify-start">

                 <DividerLine text="scores" class="mt-6 mb-2"/>
             </div>
            <div class="flex flex-row items-center gap-6">
                <div class="flex items-center">
                    <!-- <img src="https://img.icons8.com/puffy/32/user.png" alt="user score" class="w-5 h-5"> -->
                    <span class="pl-1 text-black text-base font-normal">PL</span>
                    <span class="pl-1 text-black text-base font-extrabold">8.4</span>
                </div>

                <div class="flex items-center">
                    <!-- <img src="https://img.icons8.com/parakeet-line/48/group.png" alt="users score" class="w-7"> -->
                    <span class="pl-1 text-black text-base font-normal">MAL</span>
                    <span class="pl-1 text-black text-base font-extrabold">9.1</span>
                </div>
            </div>

            

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