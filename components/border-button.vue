<template>
<div class="button center" 
    @click="triger"
    :style="{
        'min-width': width + 'px',
        'max-width': width + 'px',
        'min-height': height + 'px',
        'max-height': height + 'px',
        border: '1px solid ' + border,
        background: bg,
        'font-size': fontSize + 'px'
    }">
    {{ text }}   
</div>
</template>

<script setup>
import { ref } from 'vue';
  
const props = defineProps({
    text: { type: String, default: 'Default Text' },
    width: { type: String, default: '100' },
    height: { type: String, default: '50' },
    border: { type: String, default: 'var(--accent-color)' },
    bg: { type: String, default: 'var(--bg-color)' },
    fontSize: { type: String, default: '16' },
    triger: Function 
})

</script>

<style lang="css" scoped>
.button {
    border-radius: 10px;
    font-weight: 200;
    cursor: pointer;
    transition: 0.1s;
}

.button:hover {
    background-color: #ffffff32 !important;
}

</style>