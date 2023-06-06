export const STORAGE_KEYS = {
  TOKEN: 'TOKEN',
}

export const getStorageItem = (key, defaultValue = '') => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue
  } catch (_) {
    return defaultValue
  }
}

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.error(e)
  }
}

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.error(e)
  }
}
