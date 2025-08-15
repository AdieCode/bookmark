<template>
  <div class="w-10/12 mx-auto" :class="{'!w-full !mx-0': useToggles?.isMobile}">
    <div class="w-full mt-10 px-4 flex flex-row justify-center flex-wrap gap-8" :class="{'!gap-2 !p-1': useToggles?.isMobile}">
      <ContentCard
      v-if="!useToggles?.isMobile"
      v-for="(item, index) in contentList"
      :key="index"
      :data="item"
      />

      <MobileContentCard
      v-else
      v-for="(item, index) in contentList"
      :key="'mobile-' + index"
      :data="item"
      />

	  <!-- when visible function will triger -->
	  <div ref="observedDiv" class="min-h-46"></div>
    </div>
  </div>
  
  <!-- The target div you want to observe for new content -->
  <div class="pb-40">
    <client-only>
      <GettingContent v-if="!useContent?.contentFetched"/>
    </client-only>
  </div>

  <div class="pb-40 text-center">
    <div v-if="useContent?.contentFetched && contentList?.length == 0"
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

const observedDiv = ref(null);
const contentData = computed(() => useContent?.planningData);
const mounted = ref(false);

const props = defineProps({
    visible: { type: Boolean, default: false }, 
	// hasNextPage: { type: Boolean, default: true },
	// currentPage: { type: Number, default: 0 },
	contentType: { type: String, default: '' },
    contentList: { type: Array, default: [] },
    class: { type: String, default: '' },
    conditionalClass: { type: Object, default: {} },
	triggerFunction: { type: Function, default: () => {}}
})

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // The div is in the viewport
      getNextPage(); // Call your desired function here
    }
  });
};

const getNextPage = () => {
	console.log('fetching for: ', props.contentType);
	props.triggerFunction(props.contentType);
};

onMounted(async () => {
	window.scrollTo(0,0);
	mounted.value = true;

	console.log('fetching planning');
	// await useContent.getPlanningTrackedContent('planning');  
	getNextPage();

	const observer = new IntersectionObserver(handleIntersection, {
		root: null, 
		threshold: 0.1,
	});

	if (observedDiv.value) {
		observer.observe(observedDiv.value);
	}
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
