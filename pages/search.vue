<template>
    <div>
        <div class="flex flex-col justify-between items-center my-4 gap-4">
            <div class="text-center max-w-full px-4">
                <div class="font-extralight text-lg">
                    results for
                </div>
                <div class="font-bold text-2xl break-words overflow-wrap-anywhere max-w-full">
                    "{{ useContent.searchedContentData.searchTerm }}"
                </div>
            </div>

            <div class="text-center">
                <div class="font-extralight text-lg">
                    results count
                </div>
                <div class="font-bold text-2xl">
                    {{ useContent.searchedContentData.totalContent }}
                </div>
            </div>
        </div>
        <content-fetcher-displayer 
            :triggerFunction="useContent.getAllContentBysearch"
            :content-list="useContent.searchedContentData.contentList"
        />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

const useToggles = useTogglesStore();
const useContent = useContentStore();

// Check if there's a search term, if not navigate back
onMounted(() => {
  if (!useContent.searchedContentData.searchTerm || useContent.searchedContentData.searchTerm.trim() === '') {
    // Navigate back to previous page or home
    useToggles.setNotification("No search term detected", 2)
    setTimeout(() => {
        useToggles.hideNotification();
    }, 1000);
    navigateTo('/mainpage');
  }
});

</script>

<style scoped>


.background {
    position: fixed;
    z-index: -20;
    width: 100%;
    /* height: full; */
    overflow: hidden;
}


</style>
