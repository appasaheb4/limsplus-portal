export function getItem<T>(key: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const result = window && window.localStorage.getItem(key);
    if (!result) {
      reject();
    } else {
      resolve(JSON.parse(result) as T);
    }
  });
}

export function setItem(key: string, value: any): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    window && window.localStorage.setItem(key, JSON.stringify(value));
    resolve(true);
  });
}
