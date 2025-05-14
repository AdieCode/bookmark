<template>
    <!-- tag search  -->
    <div v-if="useExtraData.tags?.length > 0" class="bounce-up relative flex w-full items-start bg-white border-4 border-black rounded-xl z-30 p-5">
      <!-- Tags area -->
      <div class="flex flex-wrap gap-1  flex-1">
        <div
          v-for="(item, index) in useExtraData.tags"
          :key="index"
          class="p-1 px-2 bg-black text-white text-sm rounded font-semibold flex justify-center items-center cursor-pointer select-none hover:shadow-lg hover:-translate-y-1 duration-100"
          @click="removeItem(item.id)"
        >
            <span class="mr-2">{{ item.text }}</span>
            <img
            src="../public/images/close-24.png"
            alt="Remove"
            class="h-3 w-3 cursor-pointer"
            />
        </div>
      </div>

      <!-- close button -->
      <div class="absolute -top-16 -left-1 self-center p-2 bg-white border-4 border-black rounded-xl flex cursor-pointer hover:shadow-lg hover:-translate-y-1 duration-100"
        @click="clearTags">
        <div class="font-semibold">clear</div>
      </div>
  
      <!-- Search button (no height influence, vertically centered) -->
      <div class="absolute -top-16 -right-1 self-center p-2 bg-white border-4 border-black rounded-xl flex cursor-pointer hover:shadow-lg hover:-translate-y-1 duration-100">
        <img src="../public/images/search.png" alt="" class="h-6 w-6" />
        <div class="ml-2 font-semibold">Search</div>
      </div>
    </div>
  </template>
  
  

<script setup>
import { ref } from 'vue';
const useExtraData = useExtraDataStore()


// Function to remove an item by its ID
const removeItem = (id) => {
  useExtraData.removeTag(id);
};

const clearTags = () => {
    useExtraData.clearTags();
}

</script>

<style lang="css" scoped>
@keyframes bounceDown {
    0% {
    transform: translateY(0);
    }
    20% {
    transform: translateY(10px);
    }
    60% {
    transform: translateY(-4px);
    }
    100% {
    transform: translateY(0);
    }
}


.bounce-up {
    animation: bounceDown 0.4s ease-out;
}
</style>