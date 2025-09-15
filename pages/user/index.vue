<template>

    <div class="flex flex-col gap-1 justify-center items-center w-full">

        <h1 class="text-center text-3xl font-extralight pb-2">
            User Info For...🫠
        </h1>

        <div class="border-t-2 border-b-2 border-black dark:border-white">
           <div class="px-3 pb-3 pt-2 font-semibold" >
             username
           </div>
        </div>

        <div class="flex flex-col gap-1 justify-center items-center mt-8">
            <h1 class="text-8xl font-extrabold mt-12 mb-6">anime</h1>
            <div>
                <h2 class="text-2xl font-semibold text-center">
                    Total Tracked
                </h2>
                <div class="text-6xl font-extrabold text-center pt-2">
                    {{ useUser.user.counts.anime.totalCount }}
                </div>
                <div class="flex gap-14 mt-10">
                    <div class="flex flex-col justify-center items-center">
                        <h3 class="text-2xl font-semibold">
                            Planning
                        </h3>
                        <div class="text-6xl font-extrabold pt-2">
                            {{ useUser.user.counts.anime.planningCount }}
                        </div>
                    </div>

                    <div class="flex flex-col justify-center items-center">
                        <h3 class="text-2xl font-semibold">
                            Busy
                        </h3>
                        <div class="text-6xl font-extrabold pt-2">
                            {{ useUser.user.counts.anime.busyCount }}
                        </div>
                    </div>

                    <div class="flex flex-col justify-center items-center">
                        <h3 class="text-2xl font-semibold">
                            Completed
                        </h3>
                        <div class="text-6xl font-extrabold pt-2">
                            {{ useUser.user.counts.anime.completedCount }}
                        </div>
                    </div>
                </div>
            </div>

            <h1 class="text-8xl font-extrabold mt-48 mb-6">manga</h1>
            <div>
                <h2 class="text-2xl font-semibold text-center">
                    Total tracked
                </h2>
                <div class="text-6xl font-extrabold text-center">
                    {{ useUser.user.counts.manga.totalCount }}
                </div>
                <div class="flex gap-14 mt-10">
                    <div class="flex flex-col justify-center items-center">
                        <h3 class="text-2xl font-semibold">
                            Planning
                        </h3>
                        <div class="text-6xl font-extrabold pt-2">
                            {{ useUser.user.counts.manga.planningCount }}
                        </div>
                    </div>

                    <div class="flex flex-col justify-center items-center">
                        <h3 class="text-2xl font-semibold">
                            Busy
                        </h3>
                        <div class="text-6xl font-extrabold pt-2">
                            {{ useUser.user.counts.manga.busyCount }}
                        </div>
                    </div>

                    <div class="flex flex-col justify-center items-center">
                        <h3 class="text-2xl font-semibold">
                            Completed
                        </h3>
                        <div class="text-6xl font-extrabold pt-2">
                            {{ useUser.user.counts.manga.completedCount }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import { ref } from 'vue';

const router = useRouter()
const authStore = useAuthStore();
const useUser = useUserStore();

function redirectToSignOut() {
    authStore.logout()
    router.push("/");
}

// Set the layout
definePageMeta({
  layout: 'settings'
});
</script>

<style lang="css" scoped>

</style>