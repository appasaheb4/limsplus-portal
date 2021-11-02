/* eslint-disable */
export function flatten<T>(array: T[][]) {
  return ([] as T[]).concat(...array)
}
  ``
export function unique<T>(array: T[]) {
  return Array.from<T>(new Set(array))
}

export const uniqArrayByKeepFirst = (a, key) => {
  const seen = new Set()
  return a.filter((item) => {
    const k = key(item)
    return seen.has(k) ? false : seen.add(k)
  })
}
   
export const findArrayKeyArrayWise = (
  arrMain: Array<any>,
  arrKeys: Array<any>
): Array<any> => {
  const arrFinal: Array<any> = []
  arrKeys.filter((item) => {
    arrFinal.push(
      arrMain.find((mainItem) => {
        return mainItem.serviceType === item
      })
    )
  })
  return arrFinal
}

export const lookupItems = (arrLookup, key): Array<any> => {
  const result =
    arrLookup.find((item) => {
      return item.fieldName === key
    }) &&
    arrLookup.find((item) => {
      return item.fieldName === key
    }).arrValue
  return result || []
}
export const lookupValue = (item: any): string => {
  return `${
    item.value.toUpperCase() === item.code.toUpperCase()
      ? item.code
      : item.value + "-" + item.code
  }`
}


export const findArrayItems = (arr, key, value): any => {
  const result = arr.find((item) => {
    return item[key] === value
  })
  return result ||[]
}


