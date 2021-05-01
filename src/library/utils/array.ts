export function flatten<T>(array: T[][]) {
  return ([] as T[]).concat(...array);
}

export function unique<T>(array: T[]) {
  return Array.from<T>(new Set(array));
}

export const uniqArrayByKeepFirst = (a, key) => {
  const seen = new Set()
  return a.filter((item) => {
    const k = key(item)
    return seen.has(k) ? false : seen.add(k)
  })
}