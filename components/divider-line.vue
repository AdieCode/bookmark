<template>
    <div class="center">

        <div class="spacing-line" v-if="text.length > 0">
            <div class="divider-text">
                {{ text }}
            </div>
            <hr :style="{ width: width + 'px' }"/>
        </div>
        <hr v-if="text.length === 0" :style="{ width: width + 'px' }"/>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
    
    const props = defineProps({
        text: { type: String, default: '' },
        width: { type: String, default: '200' }
    })
    
</script>

<style lang="css" scoped>
.spacing-line{
    font-size: 14px;
    font-weight: 300;
    color: var(--primary-color);
    position: relative;
}

hr{
    opacity: 0.5;
    z-index: 1;
    margin: 0;         /* Remove any margin */
    border: none;      /* Remove any border */
    border-top: 1px solid; /* Default appearance */
    color: inherit;    /* Inherit color from parent */
    height: auto;      /* Default height */
    background: none; 
}

.divider-text {
    position: absolute;
    z-index: 2;
    top: -8px;
    transform: translateX(-50%);
    left: 50%;
    background-color: var(--bg-color);
    padding: 0 10px;
}
</style>