<template>
    <div>   
        <div class="button center" @click="triger"
            :style="{
                'min-width': width + 'px',
                'max-width': width + 'px',
                'min-height': height + 'px',
                'max-height': height + 'px',
                color: color,
                background: bg,
                'font-size': fontSize + 'px'
            }">
            {{ text }}   
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const currentClickState = ref('');
  
const props = defineProps({
    text: { type: String, default: 'Default Text' },
    width: { type: String, default: '100' },
    height: { type: String, default: '50' },
    color: { type: String, default: 'var(--bg-color)' },
    bg: { type: String, default: 'var(--accent-color)' },
    fontSize: { type: String, default: 'var(--accent-color)' },
    triger: Function 
})

</script>

<style lang="css" scoped>
.button {
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
}

.button:hover {
    background-color: #ffffff32 !important;
}

</style>