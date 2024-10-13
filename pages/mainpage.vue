<template>
  <div>
    <div v-if="!content.contentFetched" class="flex justify-center m-10 text-2xl">
      <div
        v-for="(letter, index) in waitingword.split('')"  
        :key="index"
        class="animate-letter font-semibold"
        :style="{ animationDelay: index * 0.04 + 's' }"
      >
        <span>{{ letter }}</span>
      </div>
    </div>

    <Discover v-if="toggle.content.discover" />
    <Discover v-if="toggle.content.planningToRead" />
    <Discover v-if="toggle.content.reading" />
    <Discover v-if="toggle.content.completed" />
  </div>
</template>

<script setup>
const toggle = useTogglesStore();
const content = useContentStore();
await content.getContentData();

const waitingword = 'fetching_content...';
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-letter {
  display: inline-block;
  animation: bounce 0.6s infinite;
}
</style>
