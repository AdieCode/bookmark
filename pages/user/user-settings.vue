<template>
    <div class="flex flex-col gap-1 justify-center items-center h-full">
        
        <header class="flex flex-col justify-center items-center gap-3 bg-white dark:bg-black dark:text-white">
            <h1 class="text-5xl font-extrabold">user settings</h1>
            <p class="text-3xl font-light">change your settings and preferences here accordingly.</p>
        </header>

        <!-- dark mode  -->
        <section>
            <div @click="useTheme.toggleTheme">
                {{ useTheme.isDarkMode ? 'dark' : 'light' }}
            </div>
        </section>
		
    </div>
</template>

<script setup>

import { ref } from 'vue';

const router = useRouter()
const authStore = useAuthStore();
const useTheme = useThemeStore()


// Set the layout
definePageMeta({
  layout: 'settings'
});
</script>

<style lang="css" scoped>

</style>