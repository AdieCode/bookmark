<template>
    <div ref="rootEl" class="relative min-w-48 max-w-48  p-2 border-4 bg-white border-black rounded-lg">
        <!-- label  -->
        <div class="bg-white px-2 absolute -top-4 left-3 text-base font-bold">
            {{ label }}
        </div>

        <!-- input -->
        <input v-show="edit_active"
            ref="inputEl"
            class="outline-none text-lg font-extrabold w-full" 
            type="number" 
            :name="name" 
            id=""
            v-model="inputValue"
            @keydown.enter="toggleEdit"
        >

        <div v-if="!edit_active"
            class=" text-lg font-extrabold text-center cursor-pointer"
            @click="toggleEdit">
            {{ inputValue }} / {{ total_progress }}
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const edit_active = ref(false);
const inputValue = ref(0);
const rootEl = ref(null);
const inputEl = ref(null);

const props = defineProps({
    label: { type: String, default: 'no label' },
    current_progress: { type: Number, default: 0 },
    total_progress: { type: Number, default: 0 },
    name: { type: String, default: 'progress-edit-box-name' },
});

inputValue.value = props.current_progress;

function toggleEdit() {
    edit_active.value = !edit_active.value;
    if (edit_active.value) {
        // Focus the input after next tick
        setTimeout(() => {
            inputEl.value?.focus();
        }, 0);
    }
}

// Click outside handler
function handleClickOutside(event) {
    if (edit_active.value && rootEl.value && !rootEl.value.contains(event.target)) {
        edit_active.value = false;
    }
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});

</script>

<style lang="css" scoped>

</style>