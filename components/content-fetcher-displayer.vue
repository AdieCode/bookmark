<template>
  <div class="w-10/12 mx-auto" :class="{'!w-full !mx-0': useToggles?.isMobile}">
    <div class="w-full mt-10 px-4 flex flex-row justify-center flex-wrap gap-8" :class="{'!gap-2 !p-1': useToggles?.isMobile}">
  <ContentCard
  v-if="!useToggles?.isMobile"
  v-for="(item, index) in contentList"
  :key="index"
  :data="item"
  :class="cardAnimationClass(item, index)"
  :style="cardAnimationStyle(item, index)"
  />

  <MobileContentCard
  v-else
  v-for="(item, index) in contentList"
  :key="'mobile-' + index"
  :data="item"
  :class="cardAnimationClass(item, index)"
  :style="cardAnimationStyle(item, index)"
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
import { ref, computed, watch, onMounted, nextTick } from 'vue';
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

// --- One-time batch animation state ---
// Use a module-level in-memory Set so animations repeat on full page refresh
// but do NOT replay when navigating back within the SPA (in-memory persists during the SPA lifecycle).
const GLOBAL_SEEN_IDS = new Set();
const seenIds = GLOBAL_SEEN_IDS; // plain Set of ids that have already animated
const toAnimateNow = ref(new Set()); // ids to apply animation class on next render
const prevIds = ref([]);

const getItemId = (item, fallbackIndex) => {
  if (!item) return String(fallbackIndex ?? Math.random());
  return String(item.anilist_content_id ?? item.id ?? item.content_id ?? item.uuid ?? item._id ?? JSON.stringify(item).slice(0,50));
}

function markBatchToAnimate(newIds) {
  newIds.forEach((id, i) => {
    toAnimateNow.value.add(id);
    seenIds.add(id);
  });

  // Remove animate flag after animation duration + stagger buffer
  const maxDuration = 600 + newIds.length * 40;
  setTimeout(() => {
    newIds.forEach(id => toAnimateNow.value.delete(id));
  }, maxDuration);
}

function idsFromList(list) {
  if (!Array.isArray(list)) return [];
  return list.map((it, idx) => getItemId(it, idx));
}

watch(() => props.contentList, async (newList, oldList) => {
  const newIds = idsFromList(newList || []);
  const oldIds = prevIds.value || [];

  // If first load (oldIds empty and newIds non-empty), animate the initial batch
  if ((oldIds.length === 0 && newIds.length > 0) || newIds.length > oldIds.length) {
    // find ids that are in newIds but not in seenIds
    const batch = newIds.filter(id => !seenIds.has(id));
    if (batch.length > 0) {
      await nextTick();
      markBatchToAnimate(batch);
    }
  }

  prevIds.value = newIds;
}, { immediate: true, deep: true });

function cardAnimationClass(item, index) {
  const id = getItemId(item, index);
  if (toAnimateNow.value.has(id)) return 'animate-fade-in';
  return '';
}

function cardAnimationStyle(item, index) {
  const id = getItemId(item, index);
  if (!toAnimateNow.value.has(id)) return {};
  const baseDelay = 30; // ms
  const delay = (index % 10) * baseDelay; // cap stagger
  return { animationDelay: `${delay}ms` };
}

// --- Intersection / fetching logic ---
const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      getNextPage();
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
