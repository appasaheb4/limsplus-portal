export const getItem = (key: string) => {
  const result = window && window.sessionStorage.getItem(key);
  if (!result) {
    return;
  } else {
    return JSON.parse(result);
  }
};

export function setItem(key: string, value: any): Promise<boolean> {
  return new Promise<boolean>(async resolve => {
    await window.sessionStorage.setItem(key, JSON.stringify(value));
    resolve(true);
  });
}

export function removeItem(key: string): Promise<boolean> {
  return new Promise<boolean>(async resolve => {
    await window.sessionStorage.removeItem(key);
    resolve(true);
  });
}
