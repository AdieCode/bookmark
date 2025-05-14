<template>
    <div v-if="useToggles.searchShow" class="fixed top-0 left-0 z-40 w-full h-full flex justify-center bg-black bg-opacity-50 backdrop-blur-md overflow-y-auto" @click="toggleSearch">
        <div class="z-50">
            <div class="flex flex-row gap-3 items-center mt-10 max-w-3xl px-6 bounce-down" @click.stop>  <!-- Add @click.stop to prevent event bubbling -->
                <!-- <div class=" w-14 h-14 bg-white border-4 border-black rounded-xl flex justify-center items-center ml-auto cursor-pointer">
                    <img src="https://img.icons8.com/pastel-glyph/64/filter.png" alt="Filter Icon" class="w-7 h-7 ">
                </div> -->
                <input ref="searchInput"
                        v-model="searchText" 
                        type="text" 
                        placeholder="Search for anime/manga here" 
                        name="email" 
                        class="w-96 h-14 outline-none border-4 border-black p-4 rounded-lg text-lg font-bold"
                        >
                <div class=" w-14 h-14 bg-white border-4 border-black rounded-xl flex justify-center items-center ml-auto cursor-pointer">
                    <img src="../public/images/search.png" alt="Search Icon" class="w-7 h-7 ">
                </div>
            </div>

            <div v-if="contentData.length > 0" class="mt-10 w-full flex flex-col gap-3 p-2 px-8 rounded-lg" @click.stop>
                <SearchCard
                    v-for="(item, index) in contentData"
                    :key="index"
                    :data="item"
                />
            </div>
            <div v-else-if="searchText.length > 4 && contentData.length === 0" class="text-lg font-bold text-center mt-10">
               No results found
            </div>
            <!-- <div v-else class="text-lg font-bold text-center mt-10">
               No results found
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
const useToggles = useTogglesStore();
const content = useContentStore();

const contentData = computed(() => content.searched_content);
const searchText = ref("");
const searchInput = ref(null);

// --- Debounce Setup ---
let debounceTimeout = null;

watch(searchText, (newValue) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);

  if (newValue.trim().length > 3) {
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
