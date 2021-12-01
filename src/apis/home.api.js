import axiosInstance from '../configs/axios'

export const getOrderList = (query) => {
  return axiosInstance.get('/api/home/poorders-home-getpaging', {params: query})
}

export const getReturnGood = (query) => {
  return axiosInstance.get('/api/home/poreturngoods-home-getpaging', {params: query})
}

export const getDeliveryList = (query) => {
  return axiosInstance.get('/api/home/podeliverys-home-getpaging', {params: query})
}

export const getAmount = (type) => {
  return axiosInstance.get(`/api/home/home-get-total-count-by-type/${type}`)
}