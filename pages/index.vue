<template>
    <div class="w-3/4 mt-10 px-4 mx-auto flex flex-row justify-center flex-wrap gap-8 z-20 sm:w-full">
      <!-- Loop through contentData and pass each item to ContentCard as a prop -->
      <ContentCard
        v-for="(item, index) in contentData"
        :key="index"
        :data="item"
      />
    </div>
  </template>
  

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const content = useContent();
await content.getContentData();

const contentData = ref(content.data);

</script>

<style scoped>

</style>
