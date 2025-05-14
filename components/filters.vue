<template>
    <div v-if="useToggles.showFilters" class="m-auto mt-8">
        <!-- filter options  -->
        <div class="flex justify-center gap-2 flex-wrap" ref="filtersRef">
            <FilterOption 
            name="Genre" 
            :options="useExtraData.filters.genres" 
            :showDorpDown="useToggles.getFilterStatus('genre')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('genre')}"
            category="genres"
            />

            <FilterOption 
            name="Type" 
            :options="useExtraData.filters.type" 
            :showDorpDown="useToggles.getFilterStatus('type')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('type')}"
            category="type"
            />   

            <FilterOption 
            name="Release status" 
            :options="useExtraData.filters.publishingStatus" 
            :showDorpDown="useToggles.getFilterStatus('releaseStatus')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('releaseStatus')}"
            category="publishingStatus"
            />  

            <FilterOption 
            name="Country" 
            :options="useExtraData.filters.countryOfOrigin" 
            :showDorpDown="useToggles.getFilterStatus('country')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('country')}"
            category="countryOfOrigin"
            />  

            <FilterOption 
            name="Year" 
            :options="useExtraData.filters.year" 
            :showDorpDown="useToggles.getFilterStatus('year')"
            :toggleFunction="() => {useToggles.toggleFilterStatus('year')}"
            category="year"
            />  

        </div>
    </div>

</template>

<script setup>
import { defineProps } from 'vue';
const useExtraData = useExtraDataStore()
const useToggles = useTogglesStore()
const filtersRef = ref(null);

const props = defineProps({
    width: { type: String, default: '100' },
});



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
