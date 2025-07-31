<template>
    <div class="relative max-w-48 p-2 border-4 bg-white border-black rounded-lg">
        <!-- label  -->
        <div class="bg-white px-2 absolute -top-4 left-3 text-base font-bold">
            {{ label }}
        </div>

        <!-- input -->
        <input class="outline-none text-lg font-extrabold " type="date" :name="name" id="">

    </div>
</template>


<script setup>
import { defineProps } from 'vue';
const useToggles = useTogglesStore();

const props = defineProps({
    score: { type: Number, default: 0 },
    label: { type: String, default: 'sdaf' },
    name: { type: String, default: 'date-edit-box-name' },
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