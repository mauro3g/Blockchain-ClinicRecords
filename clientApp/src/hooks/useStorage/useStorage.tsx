import { LOCAL_STORAGE_KEY } from 'lib/constants/storage'
import React from 'react'

interface Props {
    saveItem: (key: string, value: any) => void,
    getItem: (key: string) => undefined | any,
    deleteItem: (key: string) => void,
}

const isEmptyObject = (obj: any) => obj && Object.keys(obj).length === 0 && obj.constructor === Object

const useStorage = (): Props  => {
    const saveItem = (key: string, value: any) => {
        localStorage.setItem(LOCAL_STORAGE_KEY + key, JSON.stringify(value))
    }
    const getItem = (key: string) => {
        const result = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY + key) || "{}")
        return isEmptyObject(result) ? undefined : result
    }
    const deleteItem = (key: string) => {
        localStorage.removeItem(LOCAL_STORAGE_KEY + key)
    }
    return {
        deleteItem,
        getItem,
        saveItem
    }
}

export default useStorage