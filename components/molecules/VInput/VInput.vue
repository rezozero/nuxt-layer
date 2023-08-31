<template>
    <v-field-wrapper
        :label="label"
        :class="$style.root"
        :inline="isCheckbox || isRadio"
        :disabled="disabled"
        :hideSeparator="hideSeparator"
        :focused="isFocused"
        :filled="isFilled || prefilled"
    >
<!--        <div :class="$style.check" v-if="isCheckbox || isRadio">-->
<!--            <icon-check v-if="isCheckbox" class="$style.check__icon" />-->
<!--        </div>-->
        <input
            ref="input"
            v-model="value"
            :id="id"
            :type="type"
            :required="required"
            :name="name"
            :disabled="disabled"
            :placeholder="placeholder"
            :class="$style.input"
            @focus="onFocus"
            @blur="onBlur"
        >
    </v-field-wrapper>
</template>
<script setup lang="ts">
// import IconCheck from '~/assets/images/icons/check.svg?sprite'
import VFieldWrapper from '~/components/molecules/VFieldWrapper/VFieldWrapper.vue'
import {defaultProps} from "~/utils/form/form-element";

const props = defineProps({
    ...defaultProps,
    id: String,
    modelValue: {
        type: String,
        default: undefined,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: String,
})

const emit = defineEmits(['update:modelValue'])
const input = ref(null) as Ref<HTMLInputElement | null>
const { id, label, hideSeparator, disabled, required } = useFormElement(props)
const { isFilled, isFocused, value, onBlur, onFocus } = useTextInput(props, emit, input)

const isCheckbox = computed(() => props.type === 'checkbox')
const isRadio = computed(() => props.type === 'radio')
const prefilled = computed(() => props.type === 'date' || props.type === 'datetime-local' || props.type === 'file' || !!props.placeholder)
</script>

<style lang="scss" module>
.root {

}
.input {
    width: 100%;
    //border: none;
    font-weight: bold;

    &[type='radio'],
    &[type='checkbox'] {
        position: absolute;
        cursor: pointer;
        opacity: 0;
    }

    &[type='file'] {
        margin-top: rem(12);
    }

    &[type='file']::file-selector-button {
        padding: 0.4em 1em;
        border: none;
        background-color: rgba(#000, 0.2);
        border-radius: 1em;
        font-size: rem(14);
    }

    &:disabled {
        background-color: transparent;
        opacity: 0.3;
    }

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: color(black);
        opacity: 0.5;
    }
}

.check {
    display: flex;
    width: 18px;
    height: 18px;
    align-items: center;
    justify-content: center;
    border: 2px solid color(black);
    margin-right: rem(14);
    color: #fff;

    .input[type='radio'] + & {
        border-radius: 50%;
    }

    .input:checked + & {
        background-color: color(black);
    }

    .input[type='radio'] + &::after {
        width: 6px;
        height: 6px;
        background-color: currentColor;
        border-radius: 50%;
        content: '';
    }
}

.check__icon {
    visibility: hidden;

    .input:checked + .check & {
        visibility: inherit;
    }
}
</style>
