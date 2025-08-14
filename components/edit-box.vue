<template>
    <div class="relative min-w-48 max-w-48 p-2 border-4 bg-white border-black rounded-lg">
        <!-- label  -->
        <div class="bg-white px-2 absolute -top-4 left-3 text-base font-bold">
            {{ label }}
        </div>

        <!-- input -->
        <input class="outline-none text-lg font-extrabold w-full" type="text" :name="name" id="">

    </div>
</template>


<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    label: { type: String, default: 'sdaf' },
    name: { type: String, default: 'edit-box-name' },
});

</script>

<style lang="css" scoped>

</style>