import axiosInstance from '../configs/axios'

export const getSupplierByStuffType = (query) => {
  return axiosInstance.get(
    `/api/settings/posupplierstufftypesmap/getposupplierstufftypesbystufftype/${query.listStuffTypeIds}`
  )
}

export const getSupplierInfo = (query) => {
  return axiosInstance.get(
    `/api/settings/posupplierstufftypesmap/getposupplierstufftypesbyid/${query.Id}`
  )
}

export const getLoginInfo = () => {
  return axiosInstance.get('/api/login/api/logintokenheader')
}

export const getSapSupplier = () => {
  return axiosInstance.get('/api/combo/sapplantgetinternal_supply')
}

export const getMaterialGroupList = () => {
  return axiosInstance.get('/api/combo/sapmaterialgroupsgetlist')
}

export const getSpecificMaterial = (query) => {
  return axiosInstance.get(
    `/api/combo/sapmaterialsgetbysuppliersid?suppliersId=${query.suppliersId}`
  )
}

export const getPlantByMaterialGroup = (query) => {
  return axiosInstance.get(`/api/combo/sapplant-bymaterial?materialId=${query.materialId}`)
}

export const getSlocByPlant = (query) => {
  return axiosInstance.get(`/api/combo/slocgetlist_byplant?plant=${query.plant}`)
}

export const getPOStatus = (query) => {
  return axiosInstance.get(`/api/combo/postatus-getlistbystatustype?statusType=${query.statusType}`)
}


// AMS Combo
export const getCategoryAMS = (query) => {
  return axiosInstance.post('/api/combofromams/getcategory', query)
}

export const getStockAMS = (query) => {
  return axiosInstance.post('/api/combofromams/getstock', query)
}

export const getProductAMS = (query) => {
  return axiosInstance.post('/api/combofromams/getproduct', query)
}

export const getConfigQuanityAMS = (query) => {
  return axiosInstance.post('/api/combofromams/getconfigquantity', query)
}

export const getConfigBySupplierId = (query) => {
  return axiosInstance.get(
    `/api/settings/poconfigsupplierstufftype/poconfiggetlistbysupplierid?supplierId=${query.Id}`
  )
}