<template>

  <!-- still have to look into this one -->

  <!-- <div class="w-3/4 mt-10 px-4 mx-auto flex flex-row justify-center flex-wrap gap-8 z-20 sm:w-full">

    <ContentCard
      v-for="(item, index) in contentData"
      :key="index"
      :data="item"
    />

    <div ref="observedDiv" class="min-h-46">
    </div>
  </div> -->


  <div class="w-10/12 mx-auto" :class="{'!w-full !mx-0': useToggles.isMobile}">

    <!-- content found intdicator -->
    <!-- <div class="w-full flex justify-end">
      <div class="flex flex-col mr-32">
        <div class="text-xl font-light">Content found</div> 
        <div class="text-xl font-bold">{{ content.totalContent }}</div>
      </div>
    </div> -->

    <div class="w-full mt-10 px-4 flex flex-row justify-center flex-wrap gap-8" :class="{'!gap-2 !p-1': useToggles.isMobile}">
      <ContentCard
      v-if="!useToggles.isMobile"
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
      
      
      <div ref="observedDiv" class="min-h-46">
      </div>
    </div>
  </div>
  
  <!-- The target div you want to observe for new content -->
  <div class="pb-40">
    <client-only>
      <GettingContent v-if="!content.contentFetched"/>
    </client-only>
  </div>
</template>
  

<script setup>
import { ref } from 'vue';
const content = useContentStore();
const useToggles = useTogglesStore()

const contentData = computed(() => content?.data);
const searchShow = computed(() => useToggles?.searchShow);
const editorShow = computed(() => useToggles?.editContent);
const mounted = ref(false);
// console.log(contentData)
// const contentData = ref(content.data);

const observedDiv = ref(null); // Reference to the div to observe

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // The div is in the viewport
      yourFunction(); // Call your desired function here
    }
  });
};

const yourFunction = () => {
  // The function to be executed when the div enters the viewport
  if (content.data?.length > 0){
      console.log('fetching')
      content.nextContent();
  }
};

defineOptions({
  beforeRouteEnter(to, from, next) {
    next(() => {
      window.scrollTo(0, 0); // Scrolls to the top of the page when entering the route
    });
  }
});

onMounted(async () => {
  window.scrollTo(0,0);
  mounted.value = true;

  if (content.data?.length <= 0){
    await content.getContentData();
  }

  const observer = new IntersectionObserver(handleIntersection, {
    root: null, // Sets the viewport as the root
    threshold: 0.1, // The percentage of the div that needs to be visible (0.1 = 10%)
  });

  if (observedDiv.value) {
    observer.observe(observedDiv.value);
  }
});

watch(() => content.contentType, async () => {
  await nextTick(); // Wait for DOM update
  if (observer && observedDiv.value) {
    observer.disconnect(); // Remove old observer
    observer.observe(observedDiv.value); // Observe new element
  }
});

watch(searchShow, (visible) => {
  if (visible) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

watch(editorShow, (visible) => {
  if (visible) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

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
