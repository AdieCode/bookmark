<template>
    <div>   
        <div class="button flex justify-center items-center bg-black text-white " @click="() => {triger(); handleClick()}"
            :style="{
                'min-width': width + 'px',
                'max-width': width + 'px',
                'min-height': height + 'px',
                'max-height': height + 'px',
            }">
            {{ text }}   
            <div class="animation-effect" v-if="currentClickState === 'clicked'">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
                <div class="circle circle-4"></div>
            </div>
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
    triger: { type: Function, default: () => {} }, 
})

function handleClick() {
    currentClickState.value = 'clicked';
    console.log('Button clicked!');
    setTimeout(() => {
        currentClickState.value = '';
    }, 400); // Duration of the animation
}

</script>

<style lang="css" scoped>
.button {
    margin-top: 100px;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
    position: relative;
}

.animation-effect {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -20;
    width: 100%;
    height: 100%;
    border: 2px solid black;
    border-radius: 10px;
    animation: enlargeEffect 0.4s forwards;
}

.circle {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: black;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.circle-1 {
    animation: flyOut-top-left 0.3s forwards;
    animation-delay: 0s;
}

.circle-2 {
    animation: flyOut-top-right 0.3s forwards;
    animation-delay: 0.05s;
}

.circle-3 {
    animation: flyOut-bottom-left 0.3s forwards;
    animation-delay: 0.1s;
}

.circle-4 {
    animation: flyOut-bottom-right 0.3s forwards;
    animation-delay: 0.2s;
}

@keyframes flyOut-top-left {
    to {
        transform: translate(-50px, -50px);
        opacity: 0;
        filter: blur(5px);
    }
}

@keyframes flyOut-top-right {
    to {
        transform: translate(50px, -50px);
        opacity: 0;
        filter: blur(5px);
    }
}

@keyframes flyOut-bottom-left {
    to {
        transform: translate(-50px, 50px);
        opacity: 0;
        filter: blur(5px);
    }
}

@keyframes flyOut-bottom-right {
    to {
        transform: translate(50px, 50px);
        opacity: 0;
        filter: blur(5px);
    }
}

@keyframes enlargeEffect {
    0% {
        transform: scaleX(1) scaleY(1);
        border-width: 6px !important;
    }
    50% {
        transform: scaleX(1.07) scaleY(1.17); 
        border-width: 6px;
    }
    100% {
        transform: scaleX(1) scaleY(1); 
        border-width: 6px;
    }
}
</style>