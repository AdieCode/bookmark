<template>
  <div class="w-10/12 mx-auto" :class="{'!w-full !mx-0': useToggles?.isMobile}">
    <div class="w-full mt-10 px-4 flex flex-row justify-center flex-wrap gap-8" :class="{'!gap-2 !p-1': useToggles?.isMobile}">
      <ContentCard
      v-if="!useToggles?.isMobile"
      v-for="(item, index) in contentData"
      :key="index"
      :data="item"
      />

      <MobileContentCard
      v-else
      v-for="(item, index) in contentData"
      :key="'mobile-' + index"
      :data="item"
      />
    </div>
  </div>
  
  <!-- The target div you want to observe for new content -->
  <div class="pb-40">
    <client-only>
      <GettingContent v-if="!useContent?.contentFetched"/>
    </client-only>
  </div>

  <div class="pb-40 text-center">
    <div v-if="useContent?.contentFetched && contentData?.length == 0"
    class="font-bold text-lg ">
      No content found
    </div>
    <client-only>
    </client-only>
  </div>
</template>
  

<script setup>
import { ref } from 'vue';
const useContent = useContentStore();
const useToggles = useTogglesStore();

const contentData = computed(() => useContent?.planningData);
const mounted = ref(false);

onMounted(async () => {
  window.scrollTo(0,0);
  mounted.value = true;

  console.log('fetching planning')
  await useContent.getPlanningTrackedContent('planning');  
});

</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}
</style>
