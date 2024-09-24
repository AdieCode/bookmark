<template>
    <div class="center">

        <div class="relative">
            <div v-if="text.length > 0" class="absolute bg-white text-black text-base font-bold px-2 -top-3 z-10 left-1/2 -translate-x-1/2 text-center">
                {{ text }}
            </div>
            <hr class="w-60 mx-auto border-black border-2"/>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
    
    const props = defineProps({
        text: { type: String, default: '' },
    })
    
</script>

<style lang="css" scoped>

</style>