<template>
  <div v-if="useToggles.searchShow" class="fixed inset-0 z-[100] flex justify-center items-start pt-10" @click="toggleSearch">
    
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10"></div>

    <!-- Search Content Wrapper -->
    <div class="relative z-20" @click.stop>

      <!-- Search Bar Wrapper (fixed width or max-w) -->
      <div class="w-[400px] m-auto bounce-down"
          :class="{'!w-[300px]': useToggles.isMobile}">
        <div class="flex items-center w-full">
          <input
            ref="searchInput"
            v-model="searchText"
            type="text"
            :placeholder="useToggles.isMobile ? 'Search anime/manga' : 'Search for anime/manga here'"
            class="flex-grow h-14 outline-none border-4 border-black p-4 rounded-l-xl text-base sm:text-lg font-bold"
          />
          <div class="h-14 w-14 min-w-[56px] min-h-[56px] bg-white border-4 border-l-0 border-black rounded-r-xl flex justify-center items-center cursor-pointer shrink-0">
            <img
              src="../public/images/search.png"
              alt="Search Icon"
              class="w-6 h-6 object-contain pointer-events-none"
            />
          </div>
        </div>
      </div>

      <!-- Results -->
      <div
        v-if="contentData?.length > 0"
        class="mt-10 flex flex-col gap-3 p-2 bg-white border-4 border-black rounded-xl mx-auto h-[560px] overflow-y-scroll"
        :class="useToggles.isMobile ? 'w-[300px]' : 'w-[460px]'"
      >
        <SearchCard
          v-for="(item, index) in contentData"
          :key="index"
          :data="item"
        />
      </div>


      <div v-else-if="searchText?.length > 4 && contentData?.length === 0"
          class="text-lg font-bold text-center mt-10">
        No results found
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch, computed, onMounted } from "vue";
const useToggles = useTogglesStore();
const content = useContentStore();

const contentData = computed(() => content.searched_content);
const isMobile = computed(() => useToggles.isMobile);
const searchText = ref("");
const searchInput = ref(null);

// --- Debounce Setup ---
let debounceTimeout = null;

watch(searchText, (newValue) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);

  if (newValue.trim()?.length > 3) {
    debounceTimeout = setTimeout(() => {
      content.getContentByText(newValue);
    }, 700);
  } else {
    content.searched_content = []; // optional: clear results if below 3 chars
  }
});

function toggleSearch() {
  searchText.value = '';
  content.searched_content = [];
  useToggles.toggleSearchShow();
}

watch(
  () => useToggles.searchShow,
  (newValue) => {
    if (newValue && searchInput.value) {
      searchInput.value.focus();
    }
  }
);

onMounted(() => {
  if (useToggles.searchShow && searchInput.value) {
    searchInput.value.focus();
  }
});
</script>

<style scoped>
.max-witdh-for-search {
  max-width: 500px;
}
@keyframes bounceDown {
    0% {
    transform: translateY(0);
    }
    20% {
    transform: translateY(-10px);
    }
    60% {
    transform: translateY(4px);
    }
    100% {
    transform: translateY(0);
    }
}

.bounce-down {
    animation: bounceDown 0.4s ease-out;
}
</style>
