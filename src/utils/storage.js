function getStorage(isSessionStorage) {
    return isSessionStorage ? sessionStorage : localStorage;
}
export function getItem(key, isSessionStorage = true) {
    const result = getStorage(isSessionStorage).getItem(key);
    if (result) {
        const { value } = JSON.parse(result);
        return value;
    }
    return result;
}

export function setItem(key, value, isSessionStorage = true) {
    getStorage(isSessionStorage).setItem(key, JSON.stringify({ value }));
}

export function delItem(key, isSessionStorage = true) {
    getStorage(isSessionStorage).removeItem(key);
}

export function clear(isSessionStorage = true) {
    getStorage(isSessionStorage).clear();
}
