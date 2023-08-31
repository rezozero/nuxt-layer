import {ComponentsMap} from "~/utils/form/create-form-children";
import VHiddenInput from "~/components/atoms/VHiddenInput/VHiddenInput.vue";
import VInputList from "~/components/molecules/VInputList/VInputList.vue";
import VInput from "~/components/molecules/VInput/VInput.vue";
import VTextarea from "~/components/molecules/VTextarea/VTextarea.vue";
import VSelect from "~/components/organisms/VSelect/VSelect.vue";

export default function (): ComponentsMap {
    return {
        hiddenInput: VHiddenInput,
        inputList: VInputList,
        input: VInput,
        'new-password': undefined,
        textarea: VTextarea,
        markdown: undefined,
        checkbox: VInput,
        select: VSelect,
        file: VInput,
        selectExpanded: VSelect,
        selectMultipleExpanded: VSelect,
    }
}
