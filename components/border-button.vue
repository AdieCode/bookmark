<template>
  <button
    :class="[
      'btn-base',
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
  onClick: Function,
});

const passebleClass = computed(() => {
  return props?.class
    ? { [props.class]: true, ...props.conditionalClass }
    : { ...props.conditionalClass };
});
</script>

<style scoped>
.btn-base {
  @apply inline-flex justify-center items-center gap-2 p-2 border-4 border-black rounded-xl cursor-pointer text-xl font-bold hover:bg-black hover:text-white transition duration-100;
  transition: transform 0.1s ease-in-out, background-color 0.1s ease, color 0.1s ease;
}

/* shrink effect */
.btn-base:active {
  transform: scale(0.95); /* shrinks ~4px depending on size */
}
</style>
