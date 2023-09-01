<template>
    <v-field-wrapper
        :label="label"
        :class="$style.root"
        :focused="isOpen"
        :filled="isFilled"
        :disabled="disabled"
    >
        <select
            :name="name"
            :class="$style.select"
            tabindex="-1"
            :multiple="multiple"
            :required="required"
            :disabled="disabled"
        >
            <option disabled :selected="!isFilled" value>{{ placeholder }}</option>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :selected="isSelectedOption(option)"
            >
                {{ option.label }}
            </option>
        </select>

        <vue-multiselect
            ref="multiselect"
            v-model="optionValue"
            :options="options"
            :multiple="multiple"
            :close-on-select="!multiple"
            track-by="value"
            label="label"
            :placeholder="placeholder"
            :searchable="options.length > 10"
            :disabled="disabled"
            :show-labels="false"
            :option-height="27"
            @open="onOpen"
            @close="onClose"
        >
<!--            <template #caret="{ toggle }">-->
<!--                <icon-chevron-down :class="$style.caret" @mousedown.prevent.stop="toggle" />-->
<!--            </template>-->
            <template #noResult>
                <span>{{ $t('select.no_result') }}</span>
            </template>
            <template #option="slotProps">
                <span>{{ slotProps.option.label }}</span>
<!--                <icon-check :class="$style['option-icon']" />-->
            </template>
        </vue-multiselect>
    </v-field-wrapper>
</template>

<script setup lang="ts">
import type {PropType} from 'vue'
import VueMultiselect from "vue-multiselect";
// import IconChevronDown from '~/assets/images/icons/chevron-down.svg?sprite'
import 'vue-multiselect/dist/vue-multiselect.css'
// import IconCheck from '~/assets/images/icons/check.svg?sprite'
import {defaultProps} from "~/utils/form/form-element";
import VFieldWrapper from "~/components/molecules/VFieldWrapper/VFieldWrapper.vue";

export interface SelectOption {
    label: string
    value: string
    selected?: boolean
    disabled?: boolean
}

const props = defineProps({
    ...defaultProps,
    id: String,
    modelValue: {
        type: [String, Array] as PropType<string | string[]>,
        default: undefined,
    },
    options: {
        type: Array as PropType<SelectOption[]>,
        default: () => [],
    },
    multiple: Boolean,
    placeholder: String,
})

const emit = defineEmits(['update:modelValue'])
const { id, label, name, required, disabled } = useFormElement(props)
const isOpen = ref(false)
const multiple = computed(() => props.multiple || false)
const options = computed(() => props.options || [])
const placeholder = computed(() => props.placeholder)
const isFilled = computed(() => {
    if (Array.isArray(props.modelValue)) return props.modelValue.length > 0
    else return !!props.modelValue
})
const optionValue = computed<SelectOption|SelectOption[]|undefined>({
    get() {
        if (Array.isArray(props.modelValue)) {
            return options.value.filter((option) => props.modelValue?.includes(option.value))
        } else {
            return options.value.find((option) => option.value === props.modelValue)
        }
    },
    set(value) {
        if (Array.isArray(value)) {
            emit('update:modelValue', value.map((option) => option.value))
        } else {
            emit('update:modelValue', value?.value)
        }
    },
})

const isSelectedOption = (option: SelectOption): boolean => {
    if (Array.isArray(props.modelValue)) {
        return typeof props.modelValue.find((value) => value === option.value) !== 'undefined'
    } else {
        return props.modelValue === option.value
    }
}

const onOpen = () => {
    isOpen.value = true
}
const onClose = () => {
    isOpen.value = false
}
</script>
<style lang="scss" module>
/**
 * ⚠️ !important rules reset Multiselect style
 */

.root {
    position: relative;
}

.select {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}

.root :global .multiselect {
    display: flex;
    min-height: 0;
    color: inherit;
    font-size: inherit;
    font-weight: bold;

    &--disabled {
        background-color: transparent;
    }
}

.caret {
    flex-shrink: 0;
    order: 2;
    margin-left: auto;

    :global(.multiselect--active) & {
        transform: rotate(180deg);
    }

    :global(.multiselect--disabled) & {
        opacity: 0.3;
    }
}

.root :global .multiselect__tags {
    min-height: rem(30);
    flex-grow: 1;
    padding: 0;
    border: none;
    background-color: transparent;
    color: inherit;
    font-size: inherit;
}

.root :global .multiselect__tags-wrap {
    display: flex;
    flex-wrap: wrap;
}

.root :global .multiselect__tag {
    display: flex;
    align-items: center;
    padding: rem(4) rem(4) rem(4) rem(12);
    margin: rem(6) rem(8) 0 0;
    background-color: rgba(#000, 0.4);
    border-radius: rem(14);
    color: #fff;
    font-size: rem(14);
}

.root :global .multiselect__tag-icon {
    position: relative;
    display: flex;
    width: rem(16);
    height: rem(16);
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &::after {
        margin-top: -2px;
        color: #fff;
    }

    &:hover,
    &:focus {
        background-color: rgba(#000, 0.3);
    }
}

.root :global .multiselect__input {
    padding: 0;
    background-color: transparent;
}

.root :global .multiselect__placeholder {
    display: none !important;
}

.root :global .multiselect--active .multiselect__placeholder {
    display: block;
}

.root :global .multiselect__single {
    padding: 0;
    margin: 0;
    font-size: inherit;
    line-height: inherit;
}

.root :global .multiselect__content-wrapper {
    width: 100%;
    border: none;
    box-shadow: 0 12px 12px rgba(0, 0, 0, 0.1);
}

.root :global .multiselect:not(.multiselect--above) .multiselect__content-wrapper {
    top: 100%;
}

.root :global .multiselect__element {
    margin: rem(2) 0;
}

.root :global .multiselect__option {
    display: flex !important;
    align-items: center;

    &.multiselect__option--highlight {
        background-color: rgba(#000, 0.6) !important;
    }

    &.multiselect__option--selected:not(.multiselect__option--highlight) {
        color: rgba(#000, 0.6) !important;
    }
}

.option-icon {
    margin-left: auto;
    visibility: hidden;

    .root :global(.multiselect__option--selected) & {
        visibility: inherit;
    }
}
</style>
