<template>
    <div v-if="useToggles.editContent" class="fixed inset-0 flex justify-center items-start top-0 left-0 z-30 overflow-y-auto">
        <!-- backgroud blur  -->
        <Transition name="fade-blur">
            <div v-if="useToggles.editContent" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md w-full" @click="useToggles.toggleEditShow"></div>
        </Transition>

        <!-- editor  -->
        <Transition name="slide-up">
            <div v-if="useToggles.editContent" 
                class="relative flex justify-start items-start gap-4 rounded-3xl bg-white border-black border-4 z-20 m-20 p-10 overflow-x-hidden dark:bg-black dark:border-white"
                :class="{
                    'flex-col items-center rounded-t-3xl !m-0 min-h-screen w-full': useToggles.isMobile,
                    'my-10 mt-32': !useToggles.isMobile
                }"
            >
                <!-- close button -->
                 <div class="absolute top-4 right-4">
                    <img v-if="isDarkMode" src="../public/bookmark_icons/close-light.svg"
                         alt="close-icon-48.svg" 
                         class="h-8 cursor-pointer"
                         :class="{'!h-7': useToggles.isMobile}"
                         @click="useToggles.toggleEditShow()"
                    >
                    <img v-else src="../public/bookmark_icons/close-icon-48.svg"
                         alt="close-icon-48.svg" 
                         class="h-8 cursor-pointer"
                         :class="{'!h-7': useToggles.isMobile}"
                         @click="useToggles.toggleEditShow()"
                    >
                </div>
       
                <!-- image / edit_form -->
                <div class="flex flex-col justify-center items-center">
                    <div class="w-52 m-auto md:m-0 md:w-80 h-fit border-black border-4 rounded-xl contain-content">
                        <img v-if="data?.cover_image_url" :src="data?.cover_image_url" alt="" class="w-full h-full object-cover">
                        <div v-else class="p-10 text-xl font-bold text-center">No image found</div>
                    </div>
                    <div class="flex flex-col mx-3 mt-1 items-center">
                        <span v-if="data.title?.english && data.title?.romaji && data.title?.english.toLowerCase() === data.title?.romaji.toLowerCase()" class="text-black font-extrabold text-xl dark:text-white">
                            {{ data.title?.english }} 
                        </span>    

                        <div v-else-if="data.title?.english" class="flex flex-col">
                            <span class="text-black font-black text-xl dark:text-white">
                                {{ data.title?.english }} 
                            </span>
                            <span class="text-stone-800 font-black dark:text-white/70"
                                :class="{'!font-semibold': useToggles?.isMobile}"
                                >
                                {{ data.title?.romaji }}
                            </span>
                        </div>

                        <span v-else-if="data.title?.romaji" class="text-black font-extrabold text-xl dark:text-white">
                            {{ data.title?.romaji }} 
                        </span>
                        <span v-else class="text-black font-extrabold text-xl dark:text-white">No title found</span>
                    </div>
                </div>
                <div class="px-8">
                    <!-- <h2 class="text-center font-light text-2xl mb-10">tracking details</h2> -->
                    <!-- <divider-line text="status" -->
                    <div class="mt-5">
                        <form ref="myForm" 
                            class="flex flex-col justify-center items-center gap-6 "
                            @submit.prevent>
                            <DropDown
                                label="Content Status"
                                name="status"
                                :showDorpDown="dropDownVisible"
                                :toggleFunction="toggleDropDown"
                                :options="trackingStatus"
                                :current_option="data?.tracked?.status"
                            />
                            
                            <!-- <DateEditBox label="start date" name="start_date"/> -->
                            <!-- <EditBox label="title" name="title"/> -->
                            

                            <ProgressEditBox 
                                v-if="contentType === 'MANGA'"
                                :total_progress="data?.volumes"
                                :current_progress="data?.tracked?.current_volume"
                                label="current volume" 
                                name="current_volume"
                            />
                            
                            <ProgressEditBox 
                                v-if="contentType === 'MANGA'"
                                :total_progress="data?.chapters"
                                :current_progress="data?.tracked?.current_chapter"
                                label="current chapter" 
                                name="current_chapter"
                            />
                            
                            <ProgressEditBox 
                                v-if="contentType === 'MANGA'"
                                :total_progress="data?.current_page"
                                :current_progress="data?.tracked?.current_page"
                                label="current page" 
                                name="current_page"
                            />
                            
                            <ProgressEditBox 
                                v-if="contentType === 'ANIME'"
                                :total_progress="data?.episodes"
                                :current_progress="data?.tracked?.current_episode"
                                label="current episode" 
                                name="current_episode"
                            />
                            
                            <ProgressEditBox 
                                :total_progress="100"
                                :current_progress="data?.tracked?.personal_score"
                                label="score" 
                                name="personal_score"
                            />

                            <TextBox 
                                label="comment" 
                                name="comment" 
                            />
                            <!-- <TextBox -->

                            <BorderButton text="update" class="" :onclick="handleSubmit"/>
                        </form>
                    </div>
                </div>
                <!-- <div class="w-52 m-auto md:m-0 md:w-80 h-fit font-bold opacity-80 text-center p-4 text-lg">
                    up and coming feature
                </div> -->

            </div>
        </Transition>
    </div>
</template>

<script setup>
import TextBox from './cards/text-box.vue';


const useToggles = useTogglesStore();
const useContent = useContentStore();
const useTheme = useThemeStore();

const isDarkMode = computed(() => useTheme.isDarkMode);
const props = defineProps({
    data: Object,
})

const contentType = computed(() => props?.data?.type);
const myForm = ref(null);
const dropDownVisible = ref(false)
const trackingStatus = ref([
    'planning',
    'busy',
    'completed'
])

function toggleDropDown(){
    dropDownVisible.value = !dropDownVisible.value
}

function capitalizeStatus(status) {
    if (!status) return ''; // Handle undefined or null inputs
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}


function getChangedFields(formDataObj, originalData) {
    const changed = {};
    for (const key in formDataObj) {
        const formValue = formDataObj[key].trim();
        const originalValue = originalData[key];
        
        // Skip if both are empty/null/undefined
        if ((!formValue || formValue === '0') && (!originalValue || originalValue === 0)) {
            continue;
        }
        
        // Only add if values are different
        if (String(formValue) !== String(originalValue)) {
            changed[key] = formValue;
        }
    }
    return changed;
}

async function handleSubmit() {
    const formData = new FormData(myForm.value)
    const data = Object.fromEntries(formData.entries())
    const originalTrackedData = props.data.tracked || {};
    const updateObject = getChangedFields(data, originalTrackedData) 
    console.log('changed data :', updateObject)

    if (Object.keys(updateObject).length === 0) {
        // No changes detected
        useToggles.setNotification("No changes detected", 2)
        setTimeout(() => {
            useToggles.hideNotification();
        }, 1000);
        useToggles.toggleEditShow();
        return;
    }

    useToggles.setNotification("Updating", 0)

    useToggles.toggleEditShow();
    await useContent.updateTrackedContent(props.data.anilist_content_id, props.data.type, updateObject);

    useToggles.setNotification("Updated", 1)

    setTimeout(() => {
          useToggles.hideNotification();
    }, 1000);
}


</script>

<style scoped>
/* Slide up animation for editor */
/* .slide-up-enter-active, .slide-up-leave-active {
    transition: transform 0.3s cubic-bezier(.25,.8,.25,1), opacity 0.3s;
    transform-origin: bottom;
}
.slide-up-enter-from, .slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
.slide-up-enter-to, .slide-up-leave-from {
    transform: translateY(0);
    opacity: 1;
} */

/* Fade and blur for background */
/* .fade-blur-enter-active, .fade-blur-leave-active {
    transition: opacity 3s;
}
.fade-blur-enter-from, .fade-blur-leave-to {
    opacity: 0;
}
.fade-blur-enter-to, .fade-blur-leave-from {
    opacity: 1;
} */

/* Hide scrollbar for the editor overlay */
.hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
    height: 100%;
    max-height: 100vh;
}
.hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}
</style>