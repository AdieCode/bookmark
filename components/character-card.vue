<template>
    <div class="w-36"
        :class="{'!w-28 mb-4': useToggles.isMobile}">
        <div class="w-36 h-48 border-4 border-black overflow-hidden rounded-lg cursor-pointer" 
            :class="{'!w-28 !h-32': useToggles.isMobile}">
            <img v-if="!data.character_image_url" src="../public/gif/icons8-waiting.gif" alt="" class="w-8 p-2">
            <img v-if="data.character_image_url" :src="data.character_image_url" alt="" class="w-full object-cover">
        </div>
        <div :class="{'px-1': useToggles.isMobile}">
            <div class="font-extrabold text-stone-600"
            :class="{'text-xs font-semibold': useToggles.isMobile}">
                {{ data.name }}
            </div>
            <div class="font-semibold text-sm text-stone-600"
                :class="{'text-sm font-bold': useToggles.isMobile}">
                {{ capitalizeStatus(data.role) }}
            </div>
        </div>
    </div>
</template>

<script setup>
const useToggles = useTogglesStore();
const props = defineProps({
    data: Object,
})

function capitalizeStatus(status) {
    if (!status) return ''; // Handle undefined or null inputs
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

</script>

<style scoped>

</style>