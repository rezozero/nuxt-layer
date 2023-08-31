import {FormElementProps} from "~/utils/form/form-element";
import {Ref} from "@vue/reactivity";

export interface TextFormElementProps extends FormElementProps {
    modelValue?: string,
}

export default function (props: TextFormElementProps, emit: Function, inputRef: Ref<HTMLInputElement | null>) {
    const isFocused = ref(false)
    const value = computed({
        get () {
            return props.modelValue
        },
        set (value) {
            emit('update:modelValue', value)
        }
    })
    const isFilled = computed(() => !!value.value?.length)

    onMounted(() => {
        // possibly autofilled
        if (!value.value) {
            const element = inputRef.value
            if (element) value.value = element.value
        }
    })

    const onBlur = () => {
        isFocused.value = false
    }
    const onFocus = () => {
        isFocused.value = true
    }
    const onInput = (event: Event) => {
        value.value = (event.target as HTMLInputElement).value
    }

    return {
        isFocused,
        value,
        isFilled,
        onBlur,
        onFocus,
        onInput,
    }
}
