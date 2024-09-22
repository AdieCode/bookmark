<template>
    <div class="edit-container" id="inputId">
        <input :type="type" class="edit" :placeholder="placeholder"
        v-model="text"
            :style="{
                'min-width': width + 'px',
                'max-width': width + 'px',
                'min-height': height + 'px',
                'max-height': height + 'px',
                border: notification.length > 0 ? '1px solid ' + errorStyle : (correct ? '1px solid var(--success-color)' : '1px solid ' + border),
                background: bg,
                'font-size': fontSize + 'px',
            }" 
            @input="trigerFunftion"
            @focus="isSelected = true" 
            @blur="isSelected = false" >
        </input>

        <!-- edit label -->
        <div class="label" :class="isSelected ? 'label-active' : 'label'">
            <span>{{ label }}</span>
        </div>

        <!-- edit notification -->
        <div class="notification wrong center" v-if="notification.length > 0">
            <img src="~assets/icons/attention-96.png" alt="">
            <span>{{ notification }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
    
const props = defineProps({
    label: { type: String, default: 'Default Text' },
    placeholder: { type: String, default: 'Default Text' },
    type: { type: String, default: 'text' },
    width: { type: String, default: '390' },
    height: { type: String, default: '50' },
    border: { type: String, default: 'var(--accent-color)' },
    bg: { type: String, default: 'var(--bg-color)' },
    fontSize: { type: String, default: '24' },
    notification: { type: String, default: '' },
    correct: { type: Boolean, default: false },
    triger: Function
});

const isSelected = ref(false);
const errorStyle = 'var(--error-color)';
const text = ref('');

function trigerFunftion (){
    try {
        props.triger(text.value)
    } catch {
        console.log('edit has no function or function does not work')
    }
}


</script>

<style lang="css" scoped>
.edit-container{
    position: relative;
}

.edit {
    border-radius: 10px;
    font-weight: 400;
    transition: 0.1s;
    padding: 0px 15px;
    outline: none;
    color: var(--primary-color) !important;
}

input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px var(--bg-color) inset;
    -webkit-text-fill-color: var(--primary-color) ;
}

.edit:hover .label{
    background-color: #ffffff32 !important;
}

.label{
    position: absolute;
    background-color: var(--bg-color);
    padding: 0 10px;
    font-weight: 300;
    top: -12px;
    left: 10px;
    border-radius: 4px;
}

.label-active{
    background-color: var(--primary-color);
    color: var(--bg-color);
    font-weight: 600;
}

.notification{
    position: absolute;
    top:55px;
    right: 10px;
    z-index: -1;
    font-size: 14px;
    /* border: 1px solid var(--error-color);
    border-radius: px; */
}

.notification img{
    width: 20px;
    height: auto;
    /* margin-top: 2px; */
    margin-right: 4px;
}

.wrong {
    color: var(--error-color);
    padding: 0 10px;
    font-weight: 600;
}

.correct {
    border: 1px solid var(--success-color);
}

</style>