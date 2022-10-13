import React, { Dispatch } from 'react'

interface ValueHookI {
    values: any,
    updateValue: (key: string, value: any) => void
    updateValues: Dispatch<any>
}

const useValues = (initialValue?: any): ValueHookI => {
    const [values, setValues] = React.useState(initialValue ?? {})
    const updateValue = (key: string, value: any) => {
        setValues({ ...values, [key]: value })
    }
    return {
        values,
        updateValue,
        updateValues: setValues
    }
}

export default useValues