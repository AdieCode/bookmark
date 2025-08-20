<template>
  <div class="flex items-center justify-center gap-2">
    <div
      v-for="index in amountOfDots"
      :key="index"
      class="h-2 w-2 mx-1 rounded-full bg-white transition-all duration-200 ease-in dark:bg-black dark:shadow-[0_0_4px_1px_rgba(255,255,255,0.2)]"
      :class="{ '!bg-black scale-125 h-3 w-3 mx-0 dark:!bg-white': index === currentDot + 1 }"
    ></div>
  </div>
</template>

<script setup>

const props = defineProps({
    amountOfDots: { type: Number, default: 0 },
    currentDot: { type: Number, default: 0 },
})

console.log(props.amountOfDots)
console.log(props.currentDot)

</script>

<style lang="css" scoped>

</style>