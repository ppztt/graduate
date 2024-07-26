type optionsType = {
    type: string
    id: string
    label?: string
    request: boolean
    block?: string
    method?: string
    params?: Object
    rules?: Array<Object>
    optionList?: Array<object>
    placeholder?: string
}
export type activeFormProps = {
    options: {
        config: Array<optionsType>,
        submitConfig: Object
    }
}
