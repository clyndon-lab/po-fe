const TOKEN = import.meta.env.VITE_TOKEN

export const getToken = () => localStorage.getItem(TOKEN)

export const setToken = (str) => localStorage.setItem(TOKEN, str)

export const destroyToken = () => localStorage.removeItem(TOKEN)
