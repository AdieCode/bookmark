<template>
  <div :class="['emergency-stripes w-full h-full absolute inset-0 -z-10', passebleClass]"></div>
</template>

<script setup>
const props = defineProps({
  class: { type: String, default: '' },
  conditionalClass: { type: Object, default: {} }
});

const passebleClass = computed(() => {
  return props?.class
    ? { [props.class]: true, ...props.conditionalClass }
    : { ...props.conditionalClass };
});

</script>

<style scoped>
.emergency-stripes {
  background: repeating-linear-gradient(
    45deg,
    #000 0px,
    #000 7px,
    #fff 7px,
    #fff 14px
  );
  opacity: 1;
}
.dark .emergency-stripes {
  background: repeating-linear-gradient(
    45deg,
    #000 0px,
    #000 7px,
    #fff 7px,
    #fff 14px
  );
  opacity: 1;
}
</style>