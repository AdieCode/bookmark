<template>
    <div>
        <!-- <div class="background h-full top bg-white filter blur-xl">
        <div
            v-for="(bubble, index) in bubbles"
            :key="index"
            class="bubble"
            :style="{
            width: bubble.size + 'px',
            height: bubble.size + 'px',
            left: bubble.positionX + '%',
            animationDuration: bubble.speed + 's',
            animationDelay: bubble.delay + 's'
            }"
        ></div>
        </div> -->

        <Discover v-if="toggle.content.discover" />
        <PlanningToRead v-if="toggle.content.planningToRead" />
        <Discover v-if="toggle.content.reading" />
        <Discover v-if="toggle.content.completed" />
    </div>
</template>

<script setup>
const toggle = useTogglesStore();

const bubbles = ref(Array.from({ length: 50 }, () => ({
    size: Math.random() * 50 + 20, // Random size between 20px and 70px
    speed: Math.random() * 15 + 5, // Random speed between 5s and 20s
    delay: Math.random() * 10, // Random delay between 0s and 10s
    positionX: Math.random() * 100 // Random horizontal position between 0% and 100%
})));
</script>

<style scoped>


.background {
    position: fixed;
    z-index: -20;
    width: 100%;
    /* height: full; */
    overflow: hidden;
}

.bubble {
    position: absolute;
    bottom: -100px; /* Start position off screen */
    background: rgb(113, 113, 113);
    border-radius: 50%;
    animation: moveBubbles 20s linear infinite;
    opacity: 0.8;
}

@keyframes moveBubbles {
    0% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-500px) scale(1.2); /* Moves bubble upwards */
    }
    100% {
        transform: translateY(-1000px) scale(1);
    }
}

</style>
