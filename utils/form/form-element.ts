import type { PropType } from 'vue'

export interface Violation {
    code: string
    message: string
    propertyPath: string
}

export interface FormElementProps {
    id?: String,
    required?: Boolean,
    errors?: Violation[] | undefined,
    label?: String,
    name?: String,
    disabled?: Boolean,
    hideSeparator?: Boolean,
    description?: String,
    parents?: string[],
}

export const defaultProps = {
    required: Boolean,
    errors: Array as PropType<Violation[]>,
    label: String,
    name: String,
    disabled: Boolean,
    hideSeparator: Boolean,
    description: String,
    parents: Array as PropType<string[]>,
}
