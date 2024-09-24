<template>
    <div class="flex flex-wrap gap-1 " :style="{ maxWidth: width + 'px' }">
        <div v-for="(item, index) in items" :key="index" class="p-1 px-2 bg-black text-white text-xs rounded font-semibold">
            {{item}}
        </div>
    </div>
</template>

<script setup>
import {  defineProps } from 'vue';
    
    const props = defineProps({
        width: { type: String, default: '100' },
        items: { type: Array, default: ['no items'] }
    });
</script>

<style scoped>
.tag{
    padding: 8px;
    margin: 5px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 800;
    background-color: var(--primary-color);
    color: var(--bg-color);
}
</style>