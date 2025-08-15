<template>
    <button
        :class="['inline-flex justify-center items-center gap-2 p-2 border-4 border-black rounded-xl cursor-pointer text-xl font-bold hover:bg-black hover:text-white transition-colors duration-100', passebleClass]"
        @click="onClick"
    >
        {{ text }}
    </button>
</template>

<script setup>
import { ref } from 'vue';
  
const props = defineProps({
    text: { type: String, default: 'Default Text' },
    class: { type: String, default: '' },
    conditionalClass: { type: Object, default: {} },
    onClick: Function 
})

// creates a conditional class that can take a normal passed and always have it as true
// and then also inlcude the conditional class passesed and merge them basically into one
// conditional class.
const passebleClass = computed(() => {
  return props?.class
    ? { [props.class]: true, ...props.conditionalClass }
    : { ...props.conditionalClass };
});

</script>

<style lang="css" scoped>
.button {
    border-radius: 10px;
    font-weight: 200;
    cursor: pointer;
    transition: 0.1s;
}

.button:hover {
    background-color: #ffffff32 !important;
}

</style>