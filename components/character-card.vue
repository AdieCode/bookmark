<template>
    <div class="hover:top-2 duration-100 w-36">
        <div class="w-36 h-48 border-4 border-black overflow-hidden rounded-lg cursor-pointer">
            <img v-if="!data.character_image_url" src="../public/gif/icons8-waiting.gif" alt="" class="w-8 p-2">
            <img v-if="data.character_image_url" :src="data.character_image_url" alt="" class="w-full object-cover">
        </div>
        <div>
            <div class="font-extrabold text-stone-600">
                {{ data.name }}
            </div>
            <div class="font-semibold text-sm text-stone-600">
                {{ capitalizeStatus(data.role) }}
            </div>
        </div>

    </div>
</template>

<script setup>
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