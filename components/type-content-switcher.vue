<template>
  <div class="flex justify-center items-center w-full my-3 duration-200 ease-in-out">
    <div class="flex justify-center items-center gap-2 cursor-pointer"
         @click="toggleContentType()">
      <!-- Anime Label -->
      <div
          class="font-medium text-lg transition-all duration-100"
          :class="{
          '!font-black !text-2xl': useToggles.contentType === 'Anime',
          '!text-gray-500': useToggles.contentType !== 'Anime'
        }"
      >
        Anime
      </div>

      <!-- Toggle Switch -->
      <div
          class="w-14 h-8 rounded-full border-4 border-black flex items-center transition-all duration-100 dark:border-white"
          :class="{
          'justify-start': useToggles.contentType === 'Anime',
          'justify-end': useToggles.contentType === 'Manga'
        }"
      >
        <div
            class="w-4 h-4 m-1 rounded-full bg-black transition-transform duration-100 ease-in-out dark:bg-white"
        ></div>
      </div>

      <!-- Manga Label -->
      <div
          class="font-medium text-lg transition-all duration-100"
          :class="{
          '!font-black !text-2xl': useToggles.contentType === 'Manga',
          '!text-gray-500': useToggles.contentType !== 'Manga'
        }"
      >
        Manga
      </div>
    </div>
  </div>
</template>


<script setup>
const useExtra = useExtraDataStore();
const useToggles = useTogglesStore();
const content = useContentStore();

async function toggleContentType() {
  useToggles.toggleContentType();
  useExtra.loadFilters(useToggles.contentType);
  content.data = [];
  await content.getContentData(1);
}

</script>

<style scoped>

</style>