import defaultSchema from './schemas/default.js'
import allFieldsSchema from './schemas/all-fields.js'
import relationshipsSchema from './schemas/relations.js'
import VForm from '~/components/organisms/VForm/VForm.vue'
import fieldsWithDescriptionSchema from '~/components/organisms/VForm/schemas/fields-with-description'
import disabledSchema from '~/components/organisms/VForm/schemas/disabled'
import errorsSchema from '~/components/organisms/VForm/schemas/errors'
import { useDefaultComponentsMap } from '~/composables/form-components-map'

export default {
    title: 'Forms/Form',
    component: VForm,
    decorators: [() => ({ template: '<div style="max-width: 600px; margin: 0 auto;"><story /></div>' })],
    args: {
        disabled: false
    }
}

const defaultData = {
    prenom: 'James'
}

const componentsMap = useDefaultComponentsMap()

const Template = args => ({
    // Components used in your story `template` are defined in the `components` object
    components: { VForm },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup () {
        return { args }
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<v-form v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
    data: defaultData,
    schema: defaultSchema,
    componentsMap
}

export const AllFields = Template.bind({})
AllFields.args = {
    data: defaultData,
    schema: allFieldsSchema,
    componentsMap
}

export const Relationships = Template.bind({})
Relationships.args = {
    data: {
        organizations: [],
        people: [],
        documents: [],
        taxa: [],
        single_organization: null,
        single_person: null,
        single_document: null,
        single_taxon: null
    },
    schema: relationshipsSchema,
    componentsMap
}

export const FieldsWithDescription = Template.bind({})
FieldsWithDescription.args = {
    data: defaultData,
    schema: fieldsWithDescriptionSchema,
    componentsMap
}

export const Disabled = Template.bind({})
Disabled.args = {
    data: {
        nom: 'Doe',
        adresse_e_mail: 'john.doe@gmail.com'
    },
    schema: disabledSchema,
    disabled: true,
    componentsMap
}

export const DefaultData = Template.bind({})
DefaultData.args = {
    data: {
        nom: 'Doe',
        adresse_e_mail: 'john.doe@gmail.com'
    },
    schema: defaultSchema,
    componentsMap
}

export const FetchSchema = Template.bind({})
FetchSchema.args = {
    schema: '/api/custom_forms/2/definition',
    componentsMap
}

export const Errors = Template.bind({})
Errors.args = {
    action: 'test-errors',
    componentsMap,
    schema: errorsSchema,
    submitCallback: () => {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
            response: {
                data: {
                    errorsPerForm: {
                        date: {
                            date: 'date error'
                        },
                        date_and_time: {
                            date_and_time: 'date and time error'
                        },
                        text: {
                            text: 'text error'
                        },
                        textarea: {
                            textarea: 'textarea error'
                        },
                        markdown: {
                            markdown: 'markdown error'
                        },
                        boolean: {
                            boolean: 'boolean error'
                        },
                        number_int: {
                            number_int: 'number_int error'
                        },
                        number_float: {
                            number_float: 'number_float error'
                        },
                        email: {
                            email: 'email error'
                        },
                        choice_single: {
                            choice_single: 'choice_single error'
                        },
                        choice_single_extended: {
                            choice_single_extended: 'choice_single_extended error'
                        },
                        choice_multiple: {
                            choice_multiple: 'choice_multiple error'
                        },
                        choice_multiple_extended: {
                            choice_multiple_extended: 'choice_multiple_extended error'
                        },
                        documents: {
                            documents: 'documents error'
                        }
                    }
                }
            }
        })
    }
}
