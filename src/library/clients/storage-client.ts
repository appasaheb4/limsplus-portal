export function getItem<T>(key: string): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    const result = window && window.localStorage.getItem(key)
    if (!result) {
      reject()
    } else {
      resolve((await JSON.parse(result)) as T)
    }
  })
}

export function setItem(key: string, value: any): Promise<boolean> {
  return new Promise<boolean>(async (resolve) => {
    await window.localStorage.setItem(key, JSON.stringify(value))
    resolve(true)
  })
}

export function removeItem(key: string): Promise<boolean> {
  return new Promise<boolean>(async (resolve) => {
    await window.localStorage.removeItem(key)
    resolve(true)
  })
}
