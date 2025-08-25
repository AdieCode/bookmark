<template>
    <div class="relative min-w-48 max-w-48 p-2 border-4 bg-white border-black rounded-lg dark:bg-black dark:border-white">
        <!-- label  -->
        <div class="bg-white px-2 absolute -top-4 left-3 text-base font-bold dark:bg-black">
            {{ label }}
        </div>

        <!-- textarea instead of input -->
        <textarea 
            :name="name"
            id="comment"
            rows="4"
            class="outline-none resize-none w-full dark:bg-black dark:text-white text-sm font-medium font-sans"
        ></textarea>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    label: { type: String, default: 'sdaf' },
    name: { type: String, default: 'edit-box-name' },
});

</script>

<style lang="css" scoped>
/* Remove the font-size override to let Tailwind classes work */

textarea::-webkit-scrollbar {
    width: 4px;
}

textarea::-webkit-scrollbar-track {
    background: transparent;
}

textarea::-webkit-scrollbar-thumb {
    @apply bg-gray-400 rounded-full dark:bg-gray-600 cursor-pointer;
}

textarea::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-500 dark:bg-gray-500 cursor-pointer;
}
</style>