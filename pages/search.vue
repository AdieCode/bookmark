<template>
    <div>
        <content-fetcher-displayer 
            :triggerFunction="useContent.getAllContentBysearch"
            :content-list="useContent.searchedContentData.contentList"
        />
    </div>
</template>

<script setup>
const toggle = useTogglesStore();
const useContent = useContentStore();



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
