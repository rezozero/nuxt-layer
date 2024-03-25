export const isNullishValue = (v: unknown) => {
    if (typeof v === 'number') return false
    return v === null || v === undefined || !Object.keys(v).length || (Array.isArray(v) && !v.length)
}

export const removeNullishNestedKeys = (obj: Record<string, unknown>) => {
    Object.keys(obj).forEach((key) => {
        const value = obj[key]
        if (isNullishValue(value)) delete obj[key]
        else if (Array.isArray(value) && value.every((v) => isNullishValue(v))) delete obj[key]
        else if (value && typeof value === 'object') removeNullishNestedKeys(value as Record<string, unknown>)
    })

    return obj
}
