<template>
    <div class=" flex justify-center items-center w-full font-extrabold text-xl">
        <div class="flex flex-col justify-center items-center gap-4 mt-14">
            <img 
                width="50" 
                height="50" 
                src="../../public/gif/icons8-sad.gif" 
                alt="sad-face-for-error"
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

</script>

<style lang="css" scoped>
</style>