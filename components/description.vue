<template>
    <div class="text-black text-base font-semibold paragraph-width">
        <p v-html="formattedText"></p>
    </div>
</template>

<script setup>
import { cleanDescription } from '@/utils/dataFormating.js';
  
const props = defineProps({
    text: { type: String, default: 'no description' },
});

const formattedText = computed(() => {
    if (!props.text) return '';
    console.log('before: ', props.text)
    const newText = cleanDescription(props.text);
    console.log('after', newText)
    
    const punctuationMarks = ['.', '!', '?'];
    let charCount = 0;
    let armed = false;
    
    return newText.split('').map((char) => {
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