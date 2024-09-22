<template>
    <div class="left wrap" :style="{ maxWidth: width + 'px' }">
        <div v-for="(item, index) in items" :key="index" class="tag">
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