export function flatten<T>(array: T[][]) {
  return ([] as T[]).concat(...array);
}

export function unique<T>(array: T[]) {
  return Array.from<T>(new Set(array));
}
