<template>
    <div>
        <div class="flex flex-col items-start justify-center md:flex-row mt-12 gap-4">
            <div class="w-full h-full fixed top-0 left-0 -z-10 bg-white bg-opacity-90 backdrop-blur-3xl">
                <img :src="contentData.cover_image_url" alt="" class="w-full h-full object-cover opacity-40 filter blur-2xl">
            </div>



            <div class="flex flex-col items-end m-auto md:m-0">
                <div class="w-52 m-auto md:m-0 md:w-80 h-fit border-black border-4 rounded-xl contain-content">
                    <img :src="contentData.cover_image_url" alt="">
                </div>
                <!-- add content -->
                <div class="p-2 w-full ml-3 mt-5 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100" @click="toPrevious">
                    Add
                </div>
            </div>

            <div class="w-4/5 max-h-96 m-auto md:w-auto md:m-0">
                <!-- Title -->
                <div class="flex flex-col mx-3 mt-1 ">
                    <span v-if="contentData.title.english && contentData.title.romaji && contentData.title.english.toLowerCase() === contentData.title.romaji.toLowerCase()" class="text-black font-extrabold text-xl">
                        {{ contentData.title.english }} 
                        <span class="ml-1 max-w-40 text-center border-4 border-black px-1 rounded-md text-sm text-black font-black hidden md:inline-block">Planning to read</span>
                    </span>    

                    <div v-else-if="contentData.title.english" class="flex flex-col">
                        <span class="text-black font-black text-xl flex">
                            {{ contentData.title.english }} 
                            <span class="ml-1 max-w-40 text-center border-4 border-black px-1 rounded-md text-sm text-black font-black hidden md:inline-block">Planning to read</span>
                        </span>
                        <span class="text-stone-800 font-black">{{ contentData.title.romaji }}</span>
                    </div>

                    <span v-else-if="contentData.title.romaji" class="text-black font-extrabold text-xl">
                        {{ contentData.title.romaji }} 
                        <span class="ml-1 max-w-40 text-center border-4 border-black px-1 rounded-md text-sm text-black font-black hidden md:inline-block">Planning to read</span>
                    </span>
                    <span v-else class="text-black font-extrabold text-xl">No title found</span>
                    <span class="mt-1 mb-4 max-w-36 text-center border-4 border-black px-1 rounded-md text-sm text-black font-black inline-block md:hidden ">Planning to read</span>
                </div>

                <!-- tags -->
                <div class="ml-3 my-6 font-medium">
                    <tags :items="contentData.genres" width="300" :max-height="52"/>
                    <div class="mt-2">Score <span class="font-black pl-1">{{contentData.average_score}}</span></div>
                    <span>
                        Chp's 
                        <span class="font-black pl-1">{{ contentData.chapters }}</span>
                    </span>


                    <span v-if="contentData.volumes">
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
            
        </div>
    </div>
</template>

<script setup>
const content = useContentStore();
const route = useRoute();

await content.getContentDataById(route.query.id);

const contentData = ref(content.selected_content);
function cleanDescription(input) {
  let result = input.replace(/<i>[\s\S]*?<\/i>/g, '');
    result = result.replace(/<I\s*\/?>/g, '');
  result = result.replace(/<br\s*\/?>/g, '');
  result = result.replace(/<Br\s*\/?>/g, '');
  result = result.replace(/<bR\s*\/?>/g, '');
  result = result.replace(/<BR\s*\/?>/g, '');
  result = result.replace(/\(Source:.*?\)/g, '');
  result = result.trim();

  return result;
}

</script>

<style scoped>
.paragraph-width{
    max-width: 600px;
}

</style>