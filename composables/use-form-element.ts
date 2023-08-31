import {FormElementProps} from "~/utils/form/form-element";

export default function (props: FormElementProps) {
    const id = computed(() => props.id)
    const required = computed(() => props.required)
    const errors = computed(() => props.errors)
    const label = computed(() => props.label)
    const name = computed(() => props.name)
    const disabled = computed(() => props.disabled)
    const hideSeparator = computed(() => props.hideSeparator)
    const description = computed(() => props.description)
    const parents = computed(() => props.parents)

    return {
        id,
        required,
        errors,
        label,
        name,
        disabled,
        hideSeparator,
        description,
        parents,
    }
}
