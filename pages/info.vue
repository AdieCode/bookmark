<template>
    <div>
        <div class="flex flex-col items-center justify-center md:flex-row mt-12 gap-4">
            <div class="w-full h-full fixed top-0 left-0 -z-10 bg-white bg-opacity-90 backdrop-blur-3xl">
                <img :src="contentData.cover_image_url" alt="" class="w-full h-full object-cover opacity-40 filter blur-2xl">
            </div>



            <div class="w-80 h-fit border-black border-4 rounded-xl contain-content">
                <img :src="contentData.cover_image_url" alt="">
            </div>
            <div>
                <!-- Title -->
                <div class="flex flex-col mx-3 mt-1">
                    <span v-if="contentData.title.english && contentData.title.romaji && contentData.title.english.toLowerCase() === contentData.title.romaji.toLowerCase()" class="text-black font-extrabold text-xl">{{ contentData.title.english }} <span class="ml-1 border-4 border-black px-1 rounded-md text-sm text-black font-black">Planning to read</span></span>                    
                    <div v-else-if="contentData.title.english" class="flex flex-col">
                        <span class="text-black font-extrabold text-xl flex flex-wrap-reverse gap-2 md">{{ contentData.title.english }} <span class="ml-1 border-4 border-black px-1 rounded-md text-sm text-black font-black">Planning to read</span></span>
                        <span class="text-stone-800 font-semibold ">{{ contentData.title.romaji }}</span>
                    </div>
                    <span v-else-if="contentData.title.romaji" class="text-black font-extrabold text-xl">{{ contentData.title.romaji }} <span class="ml-1 border-4 border-black px-1 rounded-md text-sm text-black font-black">Planning to read</span></span>
                    <span v-else class="text-black font-extrabold text-xl">No title found</span>
                </div>

                <!-- tags -->
                <div class="ml-3 my-4">
                    <tags :items="contentData.genres" width="300" :max-height="52"/>
                </div>
                <!-- description -->
                <div class="text-black text-base font-semibold mt-2 mx-4 paragraph-width">
                    <p class="">{{ contentData.description }}</p>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
const content = useContentStore();
const route = useRoute();

await content.getContentDataById(route.query.id);

const contentData = ref(content.selected_content);
console.log("this is content data: ",contentData.value)

</script>

<style scoped>
.paragraph-width{
    max-width: 600px;
}

</style>