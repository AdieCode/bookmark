<template>
  <div class="text-black text-base font-semibold paragraph-width dark:text-white">
    <!-- Text container -->
    <div
      ref="textContainer"
      class="relative transition-all duration-300"
      :style="{
        maxHeight: !viewAll ? `${maxHeight}px` : 'none',
        overflow: !viewAll ? 'hidden' : 'visible',
        WebkitMaskImage: !viewAll && isOverflowing
          ? `linear-gradient(to bottom, black 50%, transparent 100%)`
          : 'none',
        maskImage: !viewAll && isOverflowing
          ? `linear-gradient(to bottom, black 50%, transparent 100%)`
          : 'none',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }"
    >
      <p v-html="formattedText"></p>
    </div>

    <!-- Toggle controls -->
    <div
      v-if="isOverflowing"
      @click="toggleView"
      class="text-center text-lg font-light p-2 cursor-pointer select-none"
    >
      {{ viewAll ? "Collapse" : "Read more" }}
    </div>
  </div>
</template>

<script setup>
import { cleanDescription } from "@/utils/dataFormating.js";
import { onMounted, ref, watch, nextTick } from "vue";

const props = defineProps({
  text: { type: String, default: "no description" },
  maxHeight: { type: Number, default: 112 }, // px
});

const viewAll = ref(false);
const isOverflowing = ref(false);
const textContainer = ref(null);

function toggleView() {
  viewAll.value = !viewAll.value;
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

const checkOverflow = () => {
  if (!textContainer.value) return;
  const el = textContainer.value;
  isOverflowing.value = el.scrollHeight > props.maxHeight;
};

onMounted(() => {
  nextTick(checkOverflow);
});

watch(() => props.text, async () => {
  await nextTick();
  checkOverflow();
});
</script>

<style scoped>
.paragraph-width {
  max-width: 750px;
}
</style>
