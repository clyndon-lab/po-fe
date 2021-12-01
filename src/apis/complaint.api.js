import axiosInstance from '../configs/axios'

export const getComplaintDetail = (query) => {
  return axiosInstance.post(`/api/complaint/getdetail-complaint?complaint_Id=${query.complaint_Id}`)
}

export const getComplaints = (query) => {
  return axiosInstance.post('/api/complaint/getpaging-complaint', {params: query})
}

export const insertComplaint = (query) => {
  return axiosInstance.post('/api​/complaint​/insert-complaint', {params: query})
}

export const mergeComplaint = (query) => {
  return axiosInstance.post('/api/complaint/merge-complaintdetail', {params: query})
}