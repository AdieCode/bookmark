<template>
    <div v-if="useToggles.editContent" class="w-full h-screen fixed top-0 left-0 z-30  overflow-y-scroll hide-scrollbar">
        <!-- backgroud blur  -->
        <Transition name="fade-blur">
            <div v-if="useToggles.editContent" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md w-full" @click="useToggles.toggleEditShow"></div>
        </Transition>

        <!-- editor  -->
        <Transition name="slide-up">
            <div v-if="useToggles.editContent" class="relative flex justify-center gap-4 bg-white border-black rounded-t-3xl border-4 z-20 m-28 mb-10 mt-48 p-10 overflow-x-hidden"
                :class="{'flex-col !m-0 !mt-48': useToggles.isMobile}">
                <div class="flex flex-col justify-center items-center">
                    <div class="w-52 m-auto md:m-0 md:w-80 h-fit border-black border-4 rounded-xl contain-content">
                        <img v-if="data?.cover_image_url" :src="data?.cover_image_url" alt="" class="w-full h-full object-cover">
                        <div v-else class="p-10 text-xl font-bold text-center">No image found</div>
                    </div>
                    <div class="flex flex-col mx-3 mt-1 items-center">
                        <span v-if="data.title?.english && data.title?.romaji && data.title?.english.toLowerCase() === data.title?.romaji.toLowerCase()" class="text-black font-extrabold text-xl">
                            {{ data.title?.english }} 
                        </span>    

                        <div v-else-if="data.title?.english" class="flex flex-col">
                            <span class="text-black font-black text-xl">
                                {{ data.title?.english }} 
                            </span>
                            <span class="text-stone-800 font-black"
                                :class="{'!font-semibold': useToggles?.isMobile}"
                                >
                                {{ data.title?.romaji }}
                            </span>
                        </div>

                        <span v-else-if="data.title?.romaji" class="text-black font-extrabold text-xl">
                            {{ data.title?.romaji }} 
                        </span>
                        <span v-else class="text-black font-extrabold text-xl">No title found</span>
                    </div>
                </div>
                <div class="p-8">
                    <!-- <h2 class="text-center font-light text-2xl mb-10">tracking details</h2> -->
                    <!-- <divider-line text="status" -->
                    <div class="mt-5 flex flex-col gap-8 ">
                        <form ref="myForm" 
                        class="flex flex-col justify-center items-center gap-6 "
                            @submit.prevent>
                            <DropDown
                                label="Content Status"
                                name="status"
                                :showDorpDown="dropDownVisible"
                                :toggleFunction="toggleDropDown"
                                :options="trackingStatus"
                                :current_option="data.tracked.status"
                            />
                            
                            <!-- <DateEditBox label="start date" name="start_date"/> -->
                            <!-- <EditBox label="title" name="title"/> -->
                            
                            <ProgressEditBox 
                                :total_progress="data.volumes"
                                label="current volume" 
                                name="current_volume"
                            />
                            
                            <ProgressEditBox 
                                :total_progress="data?.chapters"
                                label="current chapter" 
                                name="current_chapter"
                            />

                            <ProgressEditBox 
                                :total_progress="data.current_page"
                                label="current page" 
                                name="current_page"
                            />

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

const useToggles = useTogglesStore();
const useContent = useContentStore();
const props = defineProps({
    data: Object,
})

const myForm = ref(null);
const dropDownVisible = ref(false)
const trackingStatus = ref([
    'planning',
    'busy',
    'completed'
])

console.log(props.data)
console.table(props.data) // for flat objects
console.dir(props.data, { depth: null }) // for nested objects
console.log(JSON.stringify(props.data, null, 2)) // pretty JSON

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
        // Compare values as strings for consistency
        if (
            originalData[key] === undefined ||
            String(formDataObj[key]) !== String(originalData[key])
        ) {
            changed[key] = formDataObj[key];
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
    // ➜ { username: 'John', age: '30' }
    useToggles.setNotification("Updating", 0)

    await useContent.updateTrackedContent(props.data.anilist_content_id, props.data.type, updateObject);
    useToggles.toggleEditShow();

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
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
}
.hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}
</style>