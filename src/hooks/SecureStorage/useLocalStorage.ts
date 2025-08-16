import { useState } from 'react'
import secureLocalStorage from 'react-secure-storage'

export interface ILocalStorageReturn<T> {
  storedValue: T
  setValue: (value: T) => void
  clearStorage: () => void
  removeItem: () => void
}

const getInitialValue = <T>(key: string, initialValue?: T): T | undefined => {
  try {
    const item = secureLocalStorage.getItem(key)
    console.log('getInitialValue:item', JSON.parse(item as string))
    return item ? (JSON.parse(item as string) as T) : undefined
  } catch (error) {
    console.error(error)
    return initialValue || ({} as T)
  }
}

const setSecureValue = <T>(
  key: string,
  value: T,
  setStoredValue: (value: T) => void
) => {
  try {
    setStoredValue(value)
    secureLocalStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

export const clearSecureStorage = () => {
  try {
    secureLocalStorage.clear()
  } catch (error) {
    console.error(error)
  }
}

const removeSecureItem = (key: string) => {
  try {
    secureLocalStorage.removeItem(key)
  } catch (error) {
    console.error(error)
  }
}

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() =>
    getInitialValue(key, initialValue)
  )

  const setValue = (value: T) => setSecureValue(key, value, setStoredValue)

  const clearStorage = () => clearSecureStorage()

  const removeItem = () => removeSecureItem(key)

  console.log('useLocalStorage:storedValue', storedValue)

  return { storedValue, setValue, clearStorage, removeItem }
}

export class LocalStorageService {
  static getInitialValue<T>(key: string, initialValue?: T): T | undefined {
    const item = secureLocalStorage.getItem(key)
    try {
      return item ? (JSON.parse(item as string) as T) : initialValue
    } catch (error) {
      console.error('Error parsing stored json', error)
      return initialValue
    }
  }

  static getValue<T>(key: string): T | null {
    const item = secureLocalStorage.getItem(key)
    try {
      return item ? (JSON.parse(item as string) as T) : null
    } catch (error) {
      console.error('Error parsing stored json', error)
      return null
    }
  }

  static setValue<T>(key: string, value: T) {
    try {
      const newValue = value
      console.log('LocalStorageService:setValue', newValue)
      secureLocalStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.error('Error setting localStorage', error)
    }
  }

  static clearStorage() {
    secureLocalStorage.clear()
  }

  static removeItem(key: string) {
    secureLocalStorage.removeItem(key)
  }
}

// memoize the function to avoid unecessary re-renders
