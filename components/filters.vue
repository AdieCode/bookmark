<template>
    <div v-if="useToggles.showFilters" class="m-auto mt-8">
        <!-- filter options  -->
        <div v-if="useToggles.contentType === 'Manga'" class="flex justify-center gap-2 flex-wrap" ref="filtersRef">
            <FilterOption 
            name="Genre" 
            :options="useExtraData.filters.genres" 
            :showDorpDown="useToggles.getFilterStatus('genre')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('genre')}"
            :single="false"
            category="genres"
            />

            <FilterOption 
            name="Type" 
            :options="useExtraData.filters.type" 
            :showDorpDown="useToggles.getFilterStatus('type')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('type')}"
            category="type"
            :single="true"
            />   

            <FilterOption 
            name="Release status" 
            :options="useExtraData.filters.publishingStatus" 
            :showDorpDown="useToggles.getFilterStatus('releaseStatus')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('releaseStatus')}"
            category="publishingStatus"
            :single="true"
            />  

            <!-- <FilterOption 
            name="Year" 
            :options="useExtraData.filters.year" 
            :showDorpDown="useToggles.getFilterStatus('year')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('year')}"
            category="year"
            :single="true"
            />   -->

            <FilterOption 
            name="Sort" 
            :options="useExtraData.filters.sort" 
            :showDorpDown="useToggles.getFilterStatus('sort')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('sort')}"
            category="sort"
            :single="true"
            />  

            <div class="p-2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white" @click="searchFilters">
              Filter 
            </div>
        </div>

        <div v-if="useToggles.contentType === 'Anime'" class="flex justify-center gap-2 flex-wrap" ref="filtersRef">
            <FilterOption 
            name="Genre" 
            :options="useExtraData.filters.genres" 
            :showDorpDown="useToggles.getFilterStatus('genre')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('genre')}"
            :single="false"
            category="genres"
            />

            <FilterOption 
            name="Type" 
            :options="useExtraData.filters.type" 
            :showDorpDown="useToggles.getFilterStatus('type')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('type')}"
            category="type"
            :single="true"
            />   

            <FilterOption 
            name="Release status" 
            :options="useExtraData.filters.status" 
            :showDorpDown="useToggles.getFilterStatus('releaseStatus')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('releaseStatus')}"
            category="status"
            :single="true"
            />  

            <!-- <FilterOption 
            name="Year" 
            :options="useExtraData.filters.year" 
            :showDorpDown="useToggles.getFilterStatus('year')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('year')}"
            category="year"
            :single="true"
            />   -->

            <FilterOption 
            name="Sort" 
            :options="useExtraData.filters.sort" 
            :showDorpDown="useToggles.getFilterStatus('sort')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('sort')}"
            category="sort"
            :single="true"
            />  

            <!-- <div class="p-2 border-4 border-black rounded-xl cursor-pointer flex items-center justify-around text-xl font-bold hover:bg-black hover:text-white" @click="searchFilters">
              Filter 
            </div> -->
            <border-button 
                text="Filter" 
                :onClick="searchFilters" 
            />
        </div>
    </div>

</template>

<script setup>
import { defineProps } from 'vue';
const useContent = useContentStore();
const useExtraData = useExtraDataStore()
const useToggles = useTogglesStore()
const filtersRef = ref(null);

const props = defineProps({
    width: { type: String, default: '100' },
});

async function searchFilters() {
  useExtraData.getSelectedFilters();
  useToggles.clearFilter() 

  const reqFilters = useExtraData.reqFilters;
  useContent.clearData();
  await useContent.getContentDataByFilters(reqFilters);
}

const handleClickOutside = (event) => {
  if (filtersRef.value && !filtersRef.value.contains(event.target) && useToggles.showFilters) {
    // User clicked outside the filter component
    useToggles.clearFilter() // Assuming you have such a method
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>

<style scoped>
.tag {
    padding: 8px;
    margin: 5px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 800;
    background-color: var(--primary-color);
    color: var(--bg-color);
}
</style>
