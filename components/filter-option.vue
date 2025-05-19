<template>
    <div class="relative">

        <div class=" select-none p-2 px-3 border-4 border-black rounded-xl flex gap-2 justify-center items-center hover:shadow-lg hover:-translate-y-1 duration-100"
            @click="toggleFunction">
            <span class="text-xl font-bold">
                {{ name }}
            </span>
            <div>
                <!-- <img src="https://img.icons8.com/ios/50/down-squared--v1.png" alt="down-squared--v1" class="w-5 h-5 mt-1"/> -->
                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/down-squared--v2.png" alt="down-squared--v2" class="w-5 h-5 mt-1"/>
            </div>
        </div>
        <div v-if="showDorpDown" class=" grow flex flex-col absolute max-w-80 max-h-96 overflow-y-auto p-3 mt-2 bg-white border-4 border-black rounded-lg !z-30 ">
            <div
            v-for="(option, index) in options"
            :key="index"
            class="p-1 px-2 m-1 flex items-center gap-1 cursor-pointer rounded-lg whitespace-nowrap "
            :class="{'bg-gray-300': option.selected,
                    'hover:bg-gray-400': !useToggles.isMobile
            }"
            @click="useExtraData.toggleFilter(category, option.option)"
            >
                <div class="w-4 h-4 border-4 border-black rounded-md" :class="{'bg-black': option.selected}"></div>
                <span class="mb-1 font-bold">{{ option.option }}</span>
            </div>
    
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
const useExtraData = useExtraDataStore()
const useToggles = useTogglesStore();

const props = defineProps({
    name: { type: String, default: '100' },
    options: { type: Array, default: [] },
    showDorpDown: { type: Boolean, default: true },
    toggleFunction: { type: Function, default: () => {} },
    category: { type: String, default: '' }
});

function toggleDropDown() {
    showDorpDown.value = !showDorpDown.value;
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

.whitespace-nowrap {
    white-space: nowrap;
}

@keyframes growingDown {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}


.grow{
    animation: growingDown 0.1s linear;
}
</style>
