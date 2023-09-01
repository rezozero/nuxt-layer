import {FetchResponse} from "ofetch";

export interface ApiFetchError {
    statusCode: number,
    responseBody: unknown,
}

export default function () {
    return useState<ApiFetchError|undefined>('last_api_fetch_error')
}
