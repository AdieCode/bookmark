<template>
    <div 
        class="flex flex-wrap gap-1 " 
        :style="{ maxWidth: width + 'px', maxHeight: maxHeight ? maxHeight + 'px' : 'auto', overflow: maxHeight ? 'hidden' : 'visible' }"
    >
        <div 
            v-for="(item, index) in items" 
            :key="index" 
            class="p-1 px-2 bg-black text-white text-xs rounded font-semibold"
            :class="{'!text-sm': bigger, 'cursor-pointer': allowClick}"
            @click="addTag(item)"
        >
            {{ item }}
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const useExtraData = useExtraDataStore()

const props = defineProps({
    width: { type: String, default: '100' },
    items: { type: Array, default: ['no items'] },
    maxHeight: { type: [String, Number], default: null }, // New prop for max height
    bigger: { type: Boolean, default: false },
    allowClick: { type: Boolean, default: false },
});

function addTag(item) {
    if (props.allowClick){
        useExtraData.addTag(item);
    }
}
</script>

<style scoped>
.tag {
    padding: 8px;
    margin: 5px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 800;
    background-color: var(--primary-color);
    color: var(--bg-color);
}
</style>
