import axiosInstance from '../configs/axios'

export const postSaveSupplierStuffType = (query) => {
  return axiosInstance.post('/api/settings/posupplierstufftypesmap/savechange', query)
}

export const getSuppliers = (query) => {
  return axiosInstance.get('/api/setting/supplier/posupplier-getpaging', { params: query })
}

export const getAccountType = (query) => {
  return axiosInstance.get('/api/setting/approle/get-fillter-paging', { params: query })
}

export const getListCategories = () => {
  return axiosInstance.get('/api/dictionary/syncdatafromsapapi/get-list-all')
}

export const postSyncData = (query) => {
  return axiosInstance.post('/api/dictionary/syncdatafromsapapi/syncdatafromsap', {}, { params: query })
}

export const getListRestaurant = (query) => {
  return axiosInstance.get('api/setting/restaurantsetting/restaurant-getpaging', { params: query })
}

export const getFullListRestaurantAPI = () => {
  return axiosInstance.get('/api/combo/restaurant-getlist')
}

export const getListAppPlantsApi = (query) => {
  return axiosInstance.get('/api/settings/sapplantsettingreceiveaddress/getsapplant-tree-paging', { params: query })
}

export const getAppPlantByIdApi = (query) => {
  return axiosInstance.get(`/api/settings/sapplantsettingreceiveaddress/getplantslocaddressbyid/${query}`)
}

export const pushNotifications = (query) => {
  return axiosInstance.get('api/setting/restaurantsetting/restaurant-getpaging', { params: query })
}

export const postRestaurantSetting = (payload) => {
  return axiosInstance.post('/api/setting/restaurantsetting/update-orderlimit', payload)
}

export const putSlocForAppPlantAPI = (query) => {
  return axiosInstance.put('/api/settings/sapplantsettingreceiveaddress/updateplantslocaddress', query)
}

export const postNotification = (query) => {
  return axiosInstance.post('/api/settings/sendemail/sendnotice', query)
}

export const getStuffType = (query) => {
  return axiosInstance.get(`/api/poconfig/${query}/postufftypesexportasyn/postufftypesexport`)
}

export const importFile = (data) => {
  return axiosInstance.post('​/api​/files​/uploadfile', data)
}

export const mergePlant = (query) => {
  return axiosInstance.post('/api/setting/supplier/merge-plantsuppliermap', query)
}

export const getMappingsupplierRestaurant = (query) => {
  return axiosInstance.post(`/api/setting/supplier/get-mappingsupplier-restaurant?supplierID=${query.supplierID}`)
}

export const getUnMappingMaterials = (query) => {
  return axiosInstance.post(`/api/setting/supplier/get-unmappingsupplier-material?supplierID=${query.supplierID}`)
}

export const mergeMaterial = (query) => {
  return axiosInstance.post('/api/setting/supplier/merge-ingradientsuppliermap', query)
}

export const getSAPMaterial = (query) => {
  return axiosInstance.get(
    `/api/combo/sapmaterialsgetbygroupidandsuppliersid?groupId=${query.groupId}&suppliersId=${query.suppliersId}`
  )
}

export const postStuffSupplierUpdate = (data, id) => {
  return axiosInstance.post(`/api/poconfig/${id}/poconfigsupplierupdate/poconfigsupplierupdate`, data)
}

export const postStuffTypeUpdate = (data, id) => {
  return axiosInstance.post(`/api/poconfig/${id}/postufftypesupdate/postufftypesupdate`, data)
}

export const getSampleStuffSupplier = (id) => {
  return axiosInstance.get(`/api/poconfig/${id}/poconfigsupplierexportasyn/poconfigsupplierexport`)
}

export const getSampleStuffType = (id) => {
  return axiosInstance.get(`/api/poconfig/${id}/postufftypesexportasyn/postufftypesexport`)
}

export const saveParameters = (query) => {
  return axiosInstance.post('/api/settings/gpparameters/savechange', query)
}

export const getDetailParameters = () => {
  return axiosInstance.get('/api/settings/gpparameters/gpparametersgetdetail')
}

export const getSAPMaterialTypes = (query) => {
  return axiosInstance.get('api/settings/sapmasterialtypes/sapmasterialtypes-getpaging', { params: query })
}

export const getOneSAPMaterialTypes = (id) => {
  return axiosInstance.get(`api/settings/sapmasterialtypes/getsapmasterialtypesbyid/${id}`)
}

export const getSAPClassify = () => {
  return axiosInstance.get('/api/combo/pogoodstypes-getlist')
}

export const postSaveSAPType = (data) => {
  return axiosInstance.post('/api/settings/sapmasterialtypes/savechange', data)
}

export const delSAPType = (id) => {
  return axiosInstance.delete(`/api/settings/sapmasterialtypes/delete/${id}`)
}

export const getProcessingConfigSys = (query) => {
  return axiosInstance.get(
    `/api/setting/processingconfigsys/processingconfigsys-getpaging?skip=${query.skip}&take=${query.take}`
  )
}

export const postProcessSysConfig = (query) => {
  return axiosInstance.post('/api/setting/processingconfigsys/savechange', query)
}

export const delProcessSysConfig = (query) => {
  return axiosInstance.delete(`/api/setting/processingconfigsys/delete/${query.Id}`)
}

export const getComboAccess = () => {
  return axiosInstance.get('/api/setting/approle/get-by-id/0')
}

export const postAccountType = (data) => {
  return axiosInstance.post('/api/setting/approle/create', data)
}

export const getOneAccountType = (id) => {
  return axiosInstance.get(`api/setting/approle/get-by-id/${id}`)
}

export const putOneAccountType = (data) => {
  return axiosInstance.put('api/setting/approle/update', data)
}

export const delOneAccountType = (id) => {
  return axiosInstance.delete(`api/setting/approle/delete/${id}`)
}
