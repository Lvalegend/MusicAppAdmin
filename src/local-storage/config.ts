export enum KEY_STORAGE {
  USER = 'USER',
  TOKEN = 'TOKEN'
}

export const saveDataToLocalStorage = (key: KEY_STORAGE, data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
export const getDataFromLocalStorage = (key: KEY_STORAGE) => {
  if (typeof window !== 'undefined') {
    const data: any = localStorage.getItem(key);
    return JSON.parse(data);
  }
};
export const removeDataFromLocalStorage = (key: KEY_STORAGE) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
