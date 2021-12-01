import axiosInstance from '../configs/axios'

export const getOrders = (query) => {
  return axiosInstance.get('/api/poorder/poorders-getpaging', { params: query })
}

export const getOrdersById = (query) => {
  return axiosInstance.get(`/api/poorder/get-by-id/${query.id}`)
}

export const getPOGoodTypes = () => {
  return axiosInstance.get('/api/combo/pogoodstypes-getlist')
}

export const getOrderSystemList = () => {
  return axiosInstance.get('/api/combo/posystemordergetlist')
}

export const getSupplierByPage = (query) => {
  return axiosInstance.get('/api/combo/suppliers-getpaging', { params: query })
}

export const getStuffTypes = () => {
  return axiosInstance.get('/api/combo/postufftypesgetlist')
}

export const createOrder = (query) => {
  console.log('vdaoiuqew', query)
  return axiosInstance.post('/api/poorder/create', query)
}

export const updateOrder = (query) => {
  return axiosInstance.put('/api/poorder/update', query)
}

export const delOrder = (query) => {
  console.log('query', query)
  return axiosInstance.delete(`/api/poorder/delete/${query.id}`)
}

export const getDeliveryList = (query) => {
  return axiosInstance.get('/api/podeliverys/podeliverys-getpaging', {params: query})
}

export const getDetailDelivery = (id) => {
  return axiosInstance.get(`/api/podeliverys/get-by-id/${id}`)
}

export const createDelivery = (query) => {
  return axiosInstance.post('/api/podeliverys/create', query)
}

export const updateOrderStatus = (order) => {
  return axiosInstance.put('/api/poorder/updatestatus', order)
}
