import { ComponentOptionsBase, h, VNodeChild } from 'vue'
import { JsonSchemaExtended } from '~/types/json-schema'
import { FactoryPropsTypes } from '~/components/organisms/VForm/VFormElementFactory'
import VFormFieldset from '~/components/organisms/VForm/VFormFieldset.vue'
import { useI18n } from '#imports'
import { SelectOption } from '~/components/organisms/VSelect/VSelect.vue'

export interface SetOption {
    label: string
    id?: string
    name?: string
    hint?: string
}

export interface ComponentsMap {
    inputList: ComponentOptionsBase<any, any, any, any, any, any, any, any>
    input: ComponentOptionsBase<any, any, any, any, any, any, any, any>
    hiddenInput: ComponentOptionsBase<any, any, any, any, any, any, any, any>
    textarea: ComponentOptionsBase<any, any, any, any, any, any, any, any>
    'new-password': ComponentOptionsBase<any, any, any, any, any, any, any, any> | undefined
    markdown: ComponentOptionsBase<any, any, any, any, any, any, any, any> | undefined
    select: ComponentOptionsBase<any, any, any, any, any, any, any, any>
    selectExpanded: ComponentOptionsBase<any, any, any, any, any, any, any, any> | undefined
    selectMultipleExpanded: ComponentOptionsBase<any, any, any, any, any, any, any, any> | undefined
    file: ComponentOptionsBase<any, any, any, any, any, any, any, any> | undefined
    checkbox: ComponentOptionsBase<any, any, any, any, any, any, any, any> | undefined
}

type EmitType = (event: 'update:modelValue', ...args: any[]) => void

export const RECAPTCHA_INPUT = 'g-recaptcha-response'

export default function createFormChildren(
    parentProps: FactoryPropsTypes,
    emit: EmitType,
    componentsMap: ComponentsMap,
): VNodeChild | undefined {
    const rootSchema = parentProps.schema
    const requiredProperties = rootSchema.required || []
    const parents = parentProps.parents

    if (!rootSchema.properties) {
        return h('')
    }

    const { t } = useI18n()

    return Object.entries(rootSchema.properties)
        .sort((a, b) => a[1]?.propertyOrder - b[1]?.propertyOrder)
        .map((property) => {
            const key = property[0]
            const schema = property[1] as JsonSchemaExtended
            const error = parentProps.errors?.find((item) => item.propertyPath === key)
            const errorMessage = error?.message ? t(error?.message).toString() : undefined
            const isInvalid = error && error.message
            const id = parentProps.id ? `${parentProps.id}-${key}` : key
            const required = requiredProperties === true ? requiredProperties : requiredProperties.includes(key)
            const name = parents?.length ? parents.slice().concat([key]).join('[') + ']'.repeat(parents.length) : key

            /*
             * Make initial field value optional
             */
            const parentModelValues = parentProps.modelValue || {}
            const currentModelValue = parentModelValues?.[key] || null

            const defaultProps: Record<string, any> = {
                id,
                label: schema.title,
                errorMessage,
                isInvalid,
                name,
                parents,
                description: schema.description,
                hint: schema.description,
                disabled: schema.attr?.disabled || parentProps.disabled,
                placeholder: schema.attr?.placeholder || null,
                autocomplete: schema.attr?.autocomplete || null,
                // Binds reactivity
                modelValue: currentModelValue,
                'onUpdate:modelValue': (value: any): void => {
                    // Make sure null is passed as null and not as string
                    if (value === 'null') {
                        value = null
                    }
                    const finalValue = { ...parentModelValues, [key]: value }
                    emit('update:modelValue', finalValue)
                },
            }
            const defaultAttrs = {
                ...schema.attr,
                id,
            }

            // Virtual object = fieldset but flatten properties with parent's modelValue
            if (schema.type === 'object' && schema?.attr?.virtual === true) {
                return h(VFormFieldset, {
                    ...defaultProps,
                    schema,
                    componentsMap,
                    virtual: schema?.attr?.virtual,
                    schemaKey: key,
                    modelValue: parentModelValues,
                    'onUpdate:modelValue': (value: object): void => {
                        const finalValue = { ...parentModelValues, ...value }
                        emit('update:modelValue', finalValue)
                    },
                })
            } else if (schema.type === 'object') {
                // nested object = fieldset
                return h(VFormFieldset, {
                    ...defaultProps,
                    schema,
                    componentsMap,
                    schemaKey: key,
                })
            }

            // recaptcha
            if (key === RECAPTCHA_INPUT) {
                return h(componentsMap.hiddenInput, {
                    ...defaultProps,
                })
            }

            // input list
            if (schema.widget === 'choice-multiple-expanded' || schema.widget === 'choice-expanded') {
                const isMultiple = schema.widget === 'choice-multiple-expanded'
                const component =
                    isMultiple && componentsMap.selectMultipleExpanded
                        ? componentsMap.selectMultipleExpanded
                        : componentsMap.selectExpanded || componentsMap.select
                const enumList = isMultiple
                    ? ((schema.items as JsonSchemaExtended)?.enum as (string | number)[])
                    : (schema.enum as (string | number)[])

                if (!enumList) {
                    return h('')
                }

                const titles = isMultiple ? (schema.items as JsonSchemaExtended)?.enum_titles : schema.enum_titles
                const options: SelectOption[] = enumList.map((value, index) => ({
                    value: String(value),
                    label: titles?.[index] || String(value),
                }))

                return h(component, {
                    ...defaultProps,
                    legend: schema.title,
                    required,
                    options,
                    multiple: isMultiple,
                    inline: true,
                    modelValue: currentModelValue || (isMultiple ? [] : ''),
                })
            }

            // select
            if (schema.type === 'array' || schema.enum) {
                const isMultiple = schema.type === 'array'
                const items =
                    schema.items && Array.isArray(schema.items)
                        ? (schema.items as JsonSchemaExtended[])?.[0]
                        : schema.items
                const enumList = isMultiple ? items?.enum : schema.enum

                if (!enumList) {
                    return h('')
                }

                const titles = isMultiple ? items?.enum_titles : schema.enum_titles
                const options: SelectOption[] = enumList.map((value, index) => ({
                    value: String(value),
                    label: titles?.[index] || String(value),
                }))

                const component =
                    isMultiple && componentsMap.selectMultipleExpanded
                        ? componentsMap.selectMultipleExpanded
                        : componentsMap.select
                const inline = isMultiple

                return h(component, {
                    ...defaultProps,
                    required,
                    options,
                    multiple: isMultiple,
                    inline,
                    modelValue: currentModelValue || (isMultiple ? [] : ''),
                })
            }

            if (schema.type === 'string' && schema.widget === 'file' && !!componentsMap.file) {
                const attrs: Record<string, string> = {
                    ...defaultAttrs,
                }
                const type = schema.widget || schema.type
                const props: Record<string, any> = {
                    ...defaultProps,
                    type,
                    required,
                }
                if (props.name && attrs.multiple) {
                    props.name = props.name + '[]'
                }
                return h(componentsMap.file, props)
            }

            // input / textarea / checkbox
            if (['string', 'boolean', 'integer', 'number'].includes(schema.type as string)) {
                if (schema.widget === 'textarea') {
                    return h(componentsMap.textarea, {
                        ...defaultProps,
                        isTextarea: true,
                        required,
                    })
                }
                if (schema.widget === 'joined') {
                    const props: Record<string, any> = {
                        ...defaultProps,
                        required,
                        modelValue: currentModelValue ? (currentModelValue as Array<string>).join(', ') : '',
                    }
                    props['onUpdate:modelValue'] = (value: string) =>
                        emit('update:modelValue', { ...parentModelValues, [key]: value.split(',') })
                    return h(componentsMap.markdown || componentsMap.textarea, props)
                }
                if (schema.widget === 'markdown') {
                    return h(componentsMap.markdown || componentsMap.textarea, {
                        ...defaultProps,
                        isTextarea: true,
                        required,
                    })
                }
                if (schema.widget === 'new-password' && componentsMap['new-password']) {
                    return h(componentsMap['new-password'], {
                        ...defaultProps,
                        autocomplete: 'new-password',
                    })
                }
                if (schema.widget === 'password' && componentsMap['new-password']) {
                    return h(componentsMap['new-password'], {
                        ...defaultProps,
                        autocomplete: 'current-password',
                    })
                }

                const type = schema.widget || schema.type
                const attrs: Record<string, string> = {
                    ...defaultAttrs,
                }
                const props: Record<string, any> = {
                    ...defaultProps,
                    type,
                    required,
                }
                props.modelValue = String(props.modelValue || '')

                if (type === 'boolean' || type === 'checkbox') {
                    props.type = 'checkbox'
                } else if (type === 'number') {
                    props.type = 'string'
                    props['onUpdate:modelValue'] = (value: any) =>
                        emit('update:modelValue', { ...parentModelValues, [key]: Number.parseFloat(value) })
                } else if (type === 'integer') {
                    props.type = 'number'
                    props['onUpdate:modelValue'] = (value: any) =>
                        emit('update:modelValue', { ...parentModelValues, [key]: Number.parseInt(value) })
                    props.step = '1'
                } else if (type === 'datetime' || type === 'datetime-local') {
                    if (props.modelValue) {
                        // Handle timezones between data and client
                        const tzOffset = new Date().getTimezoneOffset() * 60000 // offset in milliseconds
                        const localISOTime = new Date(Date.parse(props.modelValue) - tzOffset).toISOString()
                        props.modelValue = localISOTime.split('.')[0]
                    } else {
                        props.modelValue = ''
                    }
                    props.step = 'any'
                    props.type = 'datetime-local'
                } else if (type === 'file') {
                    if (props.name && attrs.multiple) {
                        props.name = props.name + '[]'
                    }
                } else if (type === 'password') {
                    props.type = 'password'
                }

                return h(componentsMap.input, props)
            }

            return h('')
        })
}
