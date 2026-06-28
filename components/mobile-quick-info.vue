
<template>
    <div v-if="useToggles.quickInfo" class="fixed inset-0 flex justify-center items-start top-0 left-0 z-30 overflow-y-auto">
        <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md w-full"></div>

        <div class="bg-white dark:bg-gray-800 border-4 border-black dark:border-white rounded-xl shadow-lg mt-20 p-4 mx-2 w-full max-w-md zindex-high">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-black dark:text-white">Quick Info</h2>
                <button @click="useToggles.toggleQuickInfo" class="text-black dark:text-white hover:text-red-500">
                    &times;
                </button>
            </div>
            

        </div>
    </div>
    
</template>

<script lang="ts" setup>
const useToggles = useTogglesStore()

const props = defineProps({
    data: Object,
})

</script>

<style lang="css" scoped>

.zindex-high {
    z-index: 9999;
}
    
</style>
