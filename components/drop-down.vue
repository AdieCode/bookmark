<template>
    <div ref="rootEl" class="relative w-48">

        <div class=" select-none p-2 px-3 border-4 border-black rounded-xl flex gap-2 justify-between items-center hover:shadow-lg duration-100 dark:border-white"
            @click="toggleFunction"
            >
            <div class="bg-white px-2 absolute -top-4 left-3 text-base font-bold dark:bg-black">
            {{ label }}
            </div>
            <div v-if="!edit_active"
                class=" text-lg font-extrabold text-center cursor-pointer"
                @click="toggleEdit"
                >
                {{selectedOptionName}}
            </div>
            <div>
                <!-- <img src="https://img.icons8.com/ios/50/down-squared--v1.png" alt="down-squared--v1" class="w-5 h-5 mt-1"/> -->
                <img v-if="isDarkMode" width="50" height="50" src="../public/images/down-squared-white.png" alt="down-squared--v2" class="w-5 h-5 mt-1"/>
                <img v-else width="50" height="50" src="../public/images/down-squared-black.png" alt="down-squared--v2" class="w-5 h-5 mt-1"/>
            </div>
        </div>
        <Transition name="grow">
            <div v-if="showDorpDown" class="grow flex flex-col max-w-80 max-h-96 overflow-y-auto p-3 mt-2 bg-white border-4 border-black rounded-lg dark:border-white dark:bg-black">
                <div
                v-for="(option, index) in updatedOptions"
                :key="index"
                class="p-1 px-2 m-1 flex items-center gap-1 cursor-pointer rounded-lg whitespace-nowrap "
                :class="{'bg-gray-300 dark:bg-gray-700': option.selected,
                        'hover:bg-gray-400 dark:hover:bg-gray-800': !useToggles.isMobile
                }"
                @click="selectOption(index)"
                >
                    <div class="w-4 h-4 border-4 border-black rounded-md dark:border-white" :class="{'bg-black dark:bg-white': option.selected}"></div>
                    <span class="mb-1 font-bold">{{ option.name }}</span>
                </div>
            </div>
        </Transition>

        <input v-show="false"
            class="" 
            type="text" 
            :name="name" 
            id=""
            v-model="selectedOptionName"
        >
    </div>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
const useToggles = useTogglesStore();
const useTheme = useThemeStore();

const isDarkMode = computed(() => useTheme.isDarkMode);

const props = defineProps({
    label: { type: String, default: 'No label' },
    name: { type: String, default: 'no_name_given' },
    options: { type: Array, default: [] },
    current_option: { type: String, default: '' },
    showDorpDown: { type: Boolean, default: true },
    toggleFunction: { type: Function, default: () => {} },
    single: { type: Boolean, default: true }
});

const selectedIndex = ref(-1);
const selectedOptionName = ref('');
const rootEl = ref(null);

selectedOptionName.value = props.current_option

const updatedOptions = computed(() =>
    props.options.map(opt => ({
        name: opt,
        selected: opt === selectedOptionName.value
    }))
);

function selectOption(index) {
    selectedIndex.value = index;
    selectedOptionName.value = updatedOptions.value[index].name;
    props.toggleFunction()
}

// Click outside handler
function handleClickOutside(event) {
    if (props.showDorpDown && rootEl.value && !rootEl.value.contains(event.target)) {
        props.toggleFunction();
    }
}

// watch(() => props.current_option, (newVal) => {
    
// }, { immediate: true })

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});

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
        transform: scaleY(0);
        opacity: 0;
    }
    100% {
        transform: scaleY(1);
        opacity: 1;
    }
}


.grow {
    animation: growingDown 0.1s ease;
    transform-origin: top;
}

.grow-enter-active, .grow-leave-active {
    transition: transform 0.15s ease, opacity 0.15s ease;
    transform-origin: top;
}
.grow-enter-from, .grow-leave-to {
    transform: scaleY(0);
    opacity: 0;
}
.grow-enter-to, .grow-leave-from {
    transform: scaleY(1);
    opacity: 1;
}
</style>
