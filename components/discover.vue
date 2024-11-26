<template>
    <div class="w-3/4 mt-10 px-4 mx-auto flex flex-row justify-center flex-wrap gap-8 z-20 sm:w-full">
      <!-- Loop through contentData and pass each item to ContentCard as a prop -->
      <ContentCard
        v-for="(item, index) in contentData"
        :key="index"
        :data="item"
      />
      <!-- The target div you want to observe -->
      <div ref="observedDiv" class="min-h-46">
      </div>
    </div>

    <div class="pb-40">
      <GettingContent/>
    </div>
</template>
  

<script setup>
import { ref } from 'vue';
const content = useContentStore();
if (content.data.length <= 0){
  await content.getContentData();
}

const contentData = computed(() => content.data);
// const contentData = ref(content.data);

const observedDiv = ref(null); // Reference to the div to observe

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // The div is in the viewport
      console.log('Div is in the viewport');
      yourFunction(); // Call your desired function here
    }
  });
};

const yourFunction = () => {
  // The function to be executed when the div enters the viewport
  content.nextContent();
};
defineOptions({
  beforeRouteEnter(to, from, next) {
    next(() => {
      window.scrollTo(0, 0); // Scrolls to the top of the page when entering the route
    });
  }
});
onMounted(() => {
  window.scrollTo(0,0);

  const observer = new IntersectionObserver(handleIntersection, {
    root: null, // Sets the viewport as the root
    threshold: 0.1, // The percentage of the div that needs to be visible (0.1 = 10%)
  });

  if (observedDiv.value) {
    observer.observe(observedDiv.value);
  }
});

</script>

<style scoped>

</style>
