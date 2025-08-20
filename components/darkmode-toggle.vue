<template>
  <div class="flex justify-center items-center w-full my-3">
    <div class="flex justify-center items-center gap-2 cursor-pointer"
         @click="toggleContentType">
      
      <!-- Icon with transition -->
      <Transition name="icon" mode="out-in">
        <img 
          v-if="isDarkMode" 
          key="dark" 
          src="../public/bookmark_icons/dakrmode_light.png" 
          alt="" 
          class="h-8" 
        />
        <img 
          v-else 
          key="light" 
          src="../public/bookmark_icons/lightmode_dark.png" 
          alt="" 
          class="h-8" 
        />
      </Transition>

      <!-- Toggle Switch -->
      <div
        class="w-14 h-8 rounded-full border-4 border-black flex items-center transition-all duration-300 dark:border-white"
        :class="{
          'justify-start': !isDarkMode,
          'justify-end': isDarkMode
        }"
      >
        <div
          class="w-4 h-4 m-1 rounded-full bg-black transition-transform duration-300 ease-in-out dark:bg-white"
        ></div>
      </div>

    </div>
  </div>
</template>

<script setup>
const useTheme = useThemeStore();
const isDarkMode = computed(() => useTheme.isDarkMode);

function toggleContentType() {
  useTheme.toggleTheme();
}
</script>

<style scoped>
/* Transition for shrinking + popping */
.icon-enter-active,
.icon-leave-active {
  transition: all 0.25s ease-in-out;
}

.icon-enter-from {
  transform: scale(0);
  opacity: 0;
}
.icon-enter-to {
  transform: scale(1);
  opacity: 1;
}

.icon-leave-from {
  transform: scale(1);
  opacity: 1;
}
.icon-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
