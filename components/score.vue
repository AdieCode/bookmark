<template>
    <div class="flex gap-1">
        <div 
            v-for="(item, index) in scoreItems" 
            :key="index"
            class="shadow rounded max-w-4 max-h-6 min-w-4 min-h-6 border-black"
            :class="{'bg-black': item.fill, 'bg-slate-500 ': !item.fill, '!max-w-3 !max-h-5 !min-w-3 !min-h-5': useToggles.isMobile}"
            
        >
        </div>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';
const useToggles = useTogglesStore();

const props = defineProps({
    score: { type: Number, default: 0 },
});

const scoreItems = computed(() => {
    const items = [];

    const newScore = Math.round((props.score/2) / 10);
    for (let index = 0; index < 5; index++) {
        const fill = index < newScore;
        items.push({
            fill: fill
        })
        
    }
    return items;
});

</script>

<style lang="css" scoped>

</style>