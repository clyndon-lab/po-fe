import axiosInstance from '../configs/axios'

export const createDelivery = (query) => {
  return axiosInstance.post('/api/podeliverys/create', query)
}

export const getOneDelivery = (id) => {
  return axiosInstance.get(`/api/podeliverys/get-by-id/${id}`)
}

export const updateDelivery = (payload) => {
  return axiosInstance.put('/api/podeliverys/update', payload)
}

export const updateDeliveryStatus = (payload) => {
  return axiosInstance.put('/api/podeliverys/updatestatus', payload)
}
