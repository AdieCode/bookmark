<template>
  <button
    :class="[
      'custom-button inline-flex justify-center items-center gap-2 p-2 border-4 border-black rounded-xl cursor-pointer text-xl font-bold hover:bg-black hover:text-white transition-all duration-100 dark:border-white dark:hover:bg-white dark:hover:text-black',
      passebleClass
    ]"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: { type: String, default: 'Default Text' },
  class: { type: String, default: '' },
  conditionalClass: { type: Object, default: {} },
  onClick: Function
});

const passebleClass = computed(() => {
  return props?.class
    ? { [props.class]: true, ...props.conditionalClass }
    : { ...props.conditionalClass };
});
</script>

<style scoped>
.custom-button {
  transition: transform 0.1s ease-in-out, background-color 0.1s, color 0.1s;
}

/* Shrinks by 4px but keeps centered */
.custom-button:active {
  transform: scale(0.95);
}
</style>
