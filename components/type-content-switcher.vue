<template>
  <div class="flex justify-center items-center w-full my-3 duration-200 ease-in-out">
    <div class="flex justify-center items-center gap-2 cursor-pointer"
         @click="toggleContentType()">
      <!-- Anime Label -->
      <div
          class="font-medium text-lg transition-all duration-100"
          :class="{
          '!font-black !text-2xl': toggle.contentType === 'Anime',
          '!text-gray-500': toggle.contentType !== 'Anime'
        }"
      >
        Anime
      </div>

      <!-- Toggle Switch -->
      <div
          class="w-14 h-8 rounded-full border-4 border-black flex items-center transition-all duration-100"
          :class="{
          'justify-start': toggle.contentType === 'Anime',
          'justify-end': toggle.contentType === 'Manga'
        }"
      >
        <div
            class="w-4 h-4 m-1 rounded-full bg-black transition-transform duration-100 ease-in-out"
        ></div>
      </div>

      <!-- Manga Label -->
      <div
          class="font-medium text-lg transition-all duration-100"
          :class="{
          '!font-black !text-2xl': toggle.contentType === 'Manga',
          '!text-gray-500': toggle.contentType !== 'Manga'
        }"
      >
        Manga
      </div>
    </div>
  </div>
</template>


<script setup>
const toggle = useTogglesStore();
const content = useContentStore();

async function toggleContentType() {
  toggle.toggleContentType();
  content.data = [];
  await content.getContentData(1);
}

</script>

<style scoped>

</style>