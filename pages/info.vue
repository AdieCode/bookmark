<template>
    <div>
        <div class="w-full h-full fixed top-0 left-0 -z-10 bg-white bg-opacity-90 backdrop-blur-3xl">
            <img :src="contentData.cover_image_url" alt="" class="w-full h-full object-cover opacity-40 filter blur-2xl">
        </div>

        <div class="flex flex-col h-auto items-start justify-center md:flex-row mt-12 gap-4 relative">


            <div class="w-52 m-auto md:m-0 md:w-80 h-fit border-black border-4 rounded-xl contain-content">
                <img :src="contentData.cover_image_url" alt="" class="w-full h-full object-cover">
            </div>
            <!-- </div> -->

            <div class="w-4/5 h-auto m-auto md:w-1/3 md:m-0">
                <!-- Title -->
                <span class="ml-1 max-w-40 text-center border-4 border-black px-1 rounded-md text-sm text-black font-black hidden md:inline-block">Planning to read</span>
                <div class="flex flex-col mx-3 mt-1 ">
                    <span v-if="contentData.title.english && contentData.title.romaji && contentData.title.english.toLowerCase() === contentData.title.romaji.toLowerCase()" class="text-black font-extrabold text-xl">
                        {{ contentData.title.english }} 
                        
                    </span>    

                    <div v-else-if="contentData.title.english" class="flex flex-col">
                        <span class="text-black font-black text-xl flex">
                            {{ contentData.title.english }} 
                            
                        </span>
                        <span class="text-stone-800 font-black">{{ contentData.title.romaji }}</span>
                    </div>

                    <span v-else-if="contentData.title.romaji" class="text-black font-extrabold text-xl">
                        {{ contentData.title.romaji }} 
                        
                    </span>
                    <span v-else class="text-black font-extrabold text-xl">No title found</span>
                    <span class="mt-1 mb-4 max-w-36 text-center border-4 border-black px-1 rounded-md text-sm text-black font-black inline-block md:hidden ">Planning to read</span>
                </div>

                <!-- extra info -->
                <div class="ml-3 my-6 font-medium">
                    <!-- tags -->
                    <tags :items="contentData.genres" width="300" :max-height="52"/>

                    <!-- score and status -->
                    <div class="mb-4 flex gap-8">
                        <div class="mt-2">
                            <div class="mt-2 mb-1">Score <span class="font-black pl-1">{{contentData.average_score}}</span></div>
                            <Score :score="contentData.average_score"/>
                        </div>
                        <div class="mt-4">
                            <div>Airing status</div>
                            <div class="font-black text-lg p-0">{{capitalizeStatus(contentData.status)}}</div>
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

        <!-- recommendations -->
         <div class="my-40 ">
            <div class="text-center text-3xl font-semibold">Recommendations</div>
             <div class="w-3/4 mt-10 px-4 mx-auto flex flex-row justify-center flex-wrap gap-8 z-20 sm:w-full">
                <ContentCard
                    v-for="(item, index) in contentData.recommendations"
                    :key="index"
                    :data="item"
                />
                <!-- Loop through contentData and pass each item to ContentCard as a prop -->
                <!-- The target div you want to observe -->
                    <div ref="observedDiv" class="min-h-46">
                    </div>
                </div>
         </div>
    </div>
</template>

<script setup>
const content = useContentStore();
const route = useRoute();

if (!(content.selected_content.length > 3) ){
    await content.getContentDataById(route.query.id); 
}
const contentData = computed(() => content.selected_content);
console.log(content.selected_content);

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

function capitalizeStatus(status) {
    if (!status) return ''; // Handle undefined or null inputs
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

watch(
    () => route.query.id, // Watch the `id` query parameter
    async (newId, oldId) => {
        if (newId !== oldId) {
            console.log("Query changed:", newId);
            await content.getContentDataById(newId);
        }
    }
);

</script>

<style scoped>
.paragraph-width{
    max-width: 750px;
}

</style>