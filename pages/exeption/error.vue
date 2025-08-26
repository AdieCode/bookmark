<template>
    <div class=" flex justify-center items-center w-full font-extrabold text-xl">
        <div class="flex flex-col justify-center items-center gap-4 mt-14">
            <img 
                width="50" 
                height="50" 
                src="../../public/gif/icons8-sad.gif" 
                alt="sad-face-for-error"
                class="animate-wiggle"
            />    
            <div class="flex flex-col justify-center items-center gap-2">
                Sorry, an error occurred🥲
                <div class="font-light">
                    status code 500
                </div>
            </div>
            <BorderButton text="Retry" class="mt-4" @click="goToMainPage"/>
        </div>
    </div>
</template>

<script setup>
const router = useRouter()

function goToMainPage() {
    router.push('/mainpage')
}

definePageMeta({
  layout: 'error'
});

</script>

<style lang="css" scoped>
@keyframes wiggle {
  0%, 7% { transform: translateX(0) rotate(0deg); }
  10% { transform: translateX(-5px) rotate(-5deg); }
  13% { transform: translateX(5px) rotate(5deg); }
  16% { transform: translateX(-3px) rotate(-3deg); }
  19% { transform: translateX(3px) rotate(3deg); }
  22% { transform: translateX(-2px) rotate(-2deg); }
  25% { transform: translateX(2px) rotate(2deg); }
  28% { transform: translateX(-1px) rotate(-1deg); }
  31% { transform: translateX(1px) rotate(1deg); }
  34%, 100% { transform: translateX(0) rotate(0deg); }
}

.animate-wiggle {
  animation: wiggle 7s infinite;
}
</style>