import {CommonContent} from "~/types/api";

/*
 * useCommonContents is a composable function that returns a reactive state
 * containing the common contents of the website.
 */
export default function () {
    return useState<CommonContent>('common_content')
}
