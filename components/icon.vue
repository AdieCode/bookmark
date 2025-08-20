<template>
    <div class="h-16 contain-content flex items-center gap-2">
        <img v-if="isDarkMode" class="w-6" src="../public/bookmark_icons/bookmark-white.png" alt="" srcset="">
        <img v-else class="w-6" src="../public/bookmark_icons/bookmark.png" alt="" srcset="">
        <span class="font-bold">
            Bookmark
        </span>
    </div>
</template>

<script setup>
const useTheme = useThemeStore();
const isDarkMode = computed(() => useTheme.isDarkMode);
</script>

<style scoped>

</style>