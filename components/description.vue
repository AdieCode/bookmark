<template>
    <div class="text-black text-base font-semibold paragraph-width" 
        @click="toggleView(true)">
        <p :class="{'max-h-60 overflow-hidden relative': !viewAll && formattedText.length > 380}">
            <span v-html="formattedText"></span>
        </p>
        <div v-if="!viewAll && formattedText.length > 380" 
            @click.stop
            @click="toggleView(false)"
            class="text-sm font-light text-black mt-4 cursor-pointer"
            >
            Click to read more
        </div>
        <div v-if="viewAll && formattedText.length > 380" 
            @click.stop
            @click="toggleView(false)"
            class="text-sm font-light text-black mt-4 cursor-pointer"
            >
            Click this collapse
        </div>
    </div>
</template>

<script setup>
import { cleanDescription } from '@/utils/dataFormating.js';
  
const props = defineProps({
    text: { type: String, default: 'no description' },
});

const viewAll = ref(false);

function toggleView(value) {
    viewAll.value = value
}

const formattedText = computed(() => {
    if (!props.text) return '';
    const newText = cleanDescription(props.text);
    
    const punctuationMarks = ['.', '!', '?'];
    let charCount = 0;
    let armed = false;
    
    return newText?.split('').map((char) => {
        charCount++;
        
        // Arm the breaker after 230 characters
        if (charCount >= 230) {
            armed = true;
        }
        
        // If armed and we hit punctuation, add line breaks
        if (armed && punctuationMarks.includes(char)) {
            armed = false; // Reset the armed state
            charCount = 0; // Reset the counter
            return char + '<br><br>';
        }
        
        return char;
    }).join('');
});

</script>

<style lang="css" scoped>
.paragraph-width{
    max-width: 750px;
}
</style>