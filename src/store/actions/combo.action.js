import { createAction } from 'redux-actions'

export const fetchSupplierByStuffType = createAction('COMBO/GET_SUPPLIER_BY_STUFFTYPE')
export const fetchSupplierByStuffTypeSuccess = createAction('COMBO/GET_SUPPLIER_BY_STUFFTYPE_SUCCESS')
export const fetchSupplierByStuffTypeFail = createAction('COMBO/GET_SUPPLIER_BY_STUFFTYPE_FAIL')

export const fetchMaterialGroupList = createAction('COMBO/GET_MATERIAL_GROUP_LIST')
export const fetchMaterialGroupListSuccess = createAction('COMBO/GET_MATERIAL_GROUP_LIST_SUCCESS')
export const fetchMaterialGroupListFail = createAction('COMBO/GET_MATERIAL_GROUP_LIST_FAIL')

export const fetchSpecificMaterial = createAction('COMBO/GET_SPECIFIC_MATERIALS')
export const fetchSpecificMaterialSuccess = createAction('COMBO/GET_SPECIFIC_MATERIALS_SUCCESS')
export const fetchSpecificMaterialFail = createAction('COMBO/GET_SPECIFIC_MATERIALS_FAIL')

export const fetchPlantsByMaterialGroup = createAction('COMBO/GET_PLANTS_BY_MATERIAL_GROUP')
export const fetchPlantsByMaterialGroupSuccess = createAction('COMBO/GET_PLANTS_BY_MATERIAL_GROUP_SUCCESS')
export const fetchPlantsByMaterialGroupFail = createAction('COMBO/GET_PLANTS_BY_MATERIAL_GROUP_FAIL')

export const fetchSlocByPlant = createAction('COMBO/GET_SLOC_BY_PLANT')
export const fetchSlocByPlantSuccess = createAction('COMBO/GET_SLOC_BY_PLANT_SUCCESS')
export const fetchSlocByPlantFail = createAction('COMBO/GET_SLOC_BY_PLANT_FAIL')

export const fetchPOStatusType = createAction('COMBO/GET_PO_STATUS')
export const fetchPOStatusTypeSuccess = createAction('COMBO/GET_PO_STATUS_SUCCESS')
export const fetchPOStatusTypeFail = createAction('COMBO/GET_PO_STATUS_FAIL')

// AMS
export const fetchAMSCategories = createAction('COMBO/GET_AMS_CATEGORIES')
export const fetchAMSCategoriesSuccess = createAction('COMBO/GET_AMS_CATEGORIES_SUCCESS')
export const fetchAMSCategoriesFail = createAction('COMBO/GET_AMS_CATEGORIES_FAIL')

export const fetchStockAMS = createAction('COMBO/GET_AMS_STOCK')
export const fetchStockAMSSuccess = createAction('COMBO/GET_AMS_STOCK_SUCCESS')
export const fetchStockAMSFail = createAction('COMBO/GET_AMS_STOCK_FAIL')

export const fetchAMSProduct = createAction('COMBO/GET_AMS_PRODUCTS')
export const fetchAMSProductSuccess = createAction('COMBO/GET_AMS_PRODUCTS_SUCCESS')
export const fetchAMSProductFail = createAction('COMBO/GET_AMS_PRODUCTS_FAIL')

export const fetchConfigQuantityAMS = createAction('COMBO/GET_AMS_CONFIG_QUANTITY')
export const fetchConfigQuantityAMSSuccess = createAction('COMBO/GET_AMS_CONFIG_QUANTITY_SUCCESS')
export const fetchConfigQuantityAMSFail = createAction('COMBO/GET_AMS_CONFIG_QUANTITY_FAIL')

export const getLoginInfo = createAction('COMBO/GET_LOGIN_INFO')
export const getLoginInfoSuccess = createAction('COMBO/GET_LOGIN_INFO_SUCCESS')
export const getLoginInfoFail = createAction('COMBO/GET_LOGIN_INFO_FAIL')

export const fetchSapSupplier = createAction('COMBO/GET_SAP_SUPPLIER')
export const fetchSapSupplierSuccess = createAction('COMBO/GET_SAP_SUPPLIER_SUCCESS')
export const fetchSapSupplierFail = createAction('COMBO/GET_SAP_SUPPLIER_FAIL')

export const fetchSupplierInfo = createAction('COMBO/GET_SUPPLIER_INFO')
export const fetchSupplierInfoSuccess = createAction('COMBO/GET_SUPPLIER_INFO_SUCCESS')
export const fetchSupplierInfoFail = createAction('COMBO/GET_SUPPLIER_INFO_FAIL')

export const fetchConfigBySupplier = createAction('COMBO/GET_CONFIG_BY_SUPPLIER')
export const fetchConfigBySupplierSuccess = createAction('COMBO/GET_CONFIG_BY_SUPPLIER_SUCCESS')
export const fetchConfigBySupplierFail = createAction('COMBO/GET_CONFIG_BY_SUPPLIER_FAIL')