import axiosInstance from '../configs/axios'

export const getRoleList = () => {
  return axiosInstance.get('/api/combo/approle-getlist')
}

export const getRoleActiveList = (query) => {
  return axiosInstance.get('/api/setting/approle/get-fillter-paging', { params: query })
}

export const getAccounts = (query) => {
  return axiosInstance.get('/api/appuser/get-fillter-paging', { params: query })
}

export const getOneAccount = (id) => {
  return axiosInstance.get(`/api/appuser/get-by-id/${id}`)
}

export const createAccount = (payload) => {
  return axiosInstance.post('/api/appuser/createuser', payload)
}

export const changePassword = (payload) => {
  return axiosInstance.post('/api/appuser/changepass', payload)
}

export const editAccount = (payload) => {
  return axiosInstance.put('/api/appuser/update', payload)
}