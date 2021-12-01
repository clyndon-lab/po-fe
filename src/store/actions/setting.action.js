import { createAction } from 'redux-actions'

export const saveSupplierStuffType = createAction('SETTING/SAVE_SUPPLIER_STUFFTYPE')
export const saveSupplierStuffTypeSuccess = createAction('SETTING/SAVE_SUPPLIER_STUFFTYPE_SUCCESS')
export const saveSupplierStuffTypeFail = createAction('SETTING/SAVE_SUPPLIER_STUFFTYPE_FAIL')

export const fetchSupplierList = createAction('SETTING/FETCH_SUPPLIER_LIST')
export const fetchSupplierListSuccess = createAction('SETTING/FETCH_SUPPLIER_LIST_SUCCESS')
export const fetchSupplierListFail = createAction('SETTING/FETCH_SUPPLIER_LIST_FAIL')

export const saveParametersStart = createAction('SETTING/SAVE_PARAMETERS_START')
export const saveParametersSuccess = createAction('SETTING/SAVE_PARAMETERS_SUCCESS')
export const saveParametersFailure = createAction('SETTING/SAVE_PARAMETERS_FAIL')

export const fetchAccountType = createAction('SETTING/FETCH_ACCOUNT_TYPE')
export const fetchAccountTypeSuccess = createAction('SETTING/FETCH_ACCOUNT_TYPE_SUCCESS')
export const fetchAccountTypeFail = createAction('SETTING/FETCH_ACCOUNT_TYPE_FAIL')

export const fetchListCategory = createAction('SETTING/FETCH_CATEGORY')
export const fetchListCategorySuccess = createAction('SETTING/FETCH_CATEGORY_SUCCESS')
export const fetchListCategoryFail = createAction('SETTING/FETCH_CATEGORY_FAIL')

export const postSyncData = createAction('SETTING/POST_SYNC_DATA')
export const postSyncDataSuccess = createAction('SETTING/POST_SYNC_DATA_SUCCESS')
export const postSyncDataFail = createAction('SETTING/POST_SYNC_DATA_FAIL')

export const fetchListRestaurant = createAction('SETTING/FETCH_RESTAURANT')
export const fetchListRestaurantSuccess = createAction('SETTING/FETCH_RESTAURANT_SUCCESS')
export const fetchListRestaurantFail = createAction('SETTING/FETCH_RESTAURANT_FAIL')

export const fetchFullListRestaurant = createAction('SETTING/FETCH_FULL_RESTAURANT')
export const fetchFullListRestaurantSuccess = createAction('SETTING/FETCH_FULL_RESTAURANT_SUCCESS')
export const fetchFullListRestaurantFail = createAction('SETTING/FETCH_FULL_RESTAURANT_FAIL')

export const fetchAppPlantsStart = createAction('SETTING/FETCH_APP_PLANTS_START')
export const fetchAppPlantsSuccess = createAction('SETTING/FETCH_APP_PLANTS_SUCCESS')
export const fetchAppPlantsFail = createAction('SETTING/FETCH_APP_PLANTS_FAIL')

export const fetchSpecifyAppPLantStart = createAction('SETTING/FETCH_SPECIFY_APP_PLANT_START')
export const fetchSpecifyAppPLantSuccess = createAction('SETTING/FETCH_SPECIFY_APP_PLANT_SUCCESS')
export const fetchSpecifyAppPLantFail = createAction('SETTING/FETCH_SPECIFY_APP_PLANT_FAIL')

export const pushNotifications = createAction('SETTING/PUSH_NOTIFICATIONS')
export const pushNotificationsSuccess = createAction('SETTING/PUSH_NOTIFICATIONS_SUCCESS')
export const pushNotificationsFail = createAction('SETTING/PUSH_NOTIFICATIONS_FAIL')

export const postRestaurantSetting = createAction('SETTING/POST_RESTAURANT_SETTING')
export const postRestaurantSettingSuccess = createAction('SETTING/POST_RESTAURANT_SETTING_SUCCESS')
export const postRestaurantSettingFail = createAction('SETTING/POST_RESTAURANT_SETTING_FAIL')

export const putSlocForPlantStart = createAction('SETTING/PUT_SLOC_FOR_PLANT_START')
export const putSlocForPlantSuccess = createAction('SETTING/PUT_SLOC_FOR_PLANT_SUCCESS')
export const putSlocForPlantFail = createAction('SETTING/PUT_SLOC_FOR_PLANT_FAIL')

export const sendNoticeStart = createAction('SETTING/SEND_NOTICE_START')
export const sendNoticeSuccess = createAction('SETTING/SEND_NOTICE_SUCCESS')
export const sendNoticeFail = createAction('SETTING/SEND_NOTICE_FAIL')

export const getStuffType = createAction('SETTING/GET_STUFF_TYPE')
export const getStuffTypeSuccess = createAction('SETTING/GET_STUFF_TYPE_SUCCESS')
export const getStuffTypeFail = createAction('SETTING/GET_STUFF_TYPE_FAIL')

export const uploadFile = createAction('SETTING/UPLOAD_FILE')
export const uploadFileSuccess = createAction('SETTING/UPLOAD_FILE_SUCCESS')
export const uploadFileFail = createAction('SETTING/UPLOAD_FILE_FAIL')

export const updatePlantSupplier = createAction('SETTING/UPDATE_PLANT_FOR_SUPPLIER')
export const updatePlantSupplierSuccess = createAction('SETTING/UPDATE_PLANT_FOR_SUPPLIER_SUCCESS')
export const updatePlantSupplierFail = createAction('SETTING/UPDATE_PLANT_FOR_SUPPLIER_FAILURE')

export const updateMaterialSupplier = createAction('SETTING/UPDATE_MATERIAL_FOR_SUPPLIER')
export const updateMaterialSupplierSuccess = createAction('SETTING/UPDATE_MATERIAL_FOR_SUPPLIER_SUCCESS')
export const updateMaterialSupplierFail = createAction('SETTING/UPDATE_MATERIAL_FOR_SUPPLIER_FAILURE')

export const fetchSapMaterial = createAction('SETTING/FETCH_SAP_MATERIAL')
export const fetchSapMaterialSuccess = createAction('SETTING/FETCH_SAP_MATERIAL_SUCCESS')
export const fetchSapMaterialFail = createAction('SETTING/FETCH_SAP_MATERIAL_FAIL')

export const postStuffSupplierUpdate = createAction('SETTING/STUFF_SUPPLIER_UPDATE')
export const postStuffSupplierUpdateSuccess = createAction('SETTING/STUFF_SUPPLIER_UPDATE_SUCCESS')
export const postStuffSupplierUpdateFail = createAction('SETTING/STUFF_SUPPLIER_UPDATE_FAIL')

export const getSampleStuffSupplier = createAction('SETTING/GET_SAMPLE_STUFF_SUPPLIER')
export const getSampleStuffSupplierSuccess = createAction('SETTING/GET_SAMPLE_STUFF_SUPPLIER_SUCCESS')
export const getSampleStuffSupplierFail = createAction('SETTING/GET_SAMPLE_STUFF_SUPPLIER_FAIL')

export const getSampleStuffType = createAction('SETTING/GET_SAMPLE_STUFF_TYPE')
export const getSampleStuffTypeSuccess = createAction('SETTING/GET_SAMPLE_STUFF_TYPE_SUCCESS')
export const getSampleStuffTypeFail = createAction('SETTING/GET_SAMPLE_STUFF_TYPE_FAIL')

export const getDetailSystemParams = createAction('SETTING/GET_DETAIL_SYSTEM_PARAMS')
export const getDetailSystemParamsSuccess = createAction('SETTING/GET_DETAIL_SYSTEM_PARAMS_SUCCESS')
export const getDetailSystemParamsFail = createAction('SETTING/GET_DETAIL_SYSTEM_PARAMS_FAIL')

export const getUnMapMaterials = createAction('SETTING/GET_UNMAPPING_MATERIALS')
export const getUnMapMaterialsSuccess = createAction('SETTING/GET_UNMAPPING_MATERIALS_SUCCESS')
export const getUnMapMaterialsFail = createAction('SETTING/GET_UNMAPPING_MATERIALS_FAIL')

export const getSAPMaterialTypes = createAction('SETTING/GET_SAP_MATERIAL_TYPE')
export const getSAPMaterialTypesSuccess = createAction('SETTING/GET_SAP_MATERIAL_TYPE_SUCCESS')
export const getSAPMaterialTypesFail = createAction('SETTING/GET_SAP_MATERIAL_TYPE_FAIL')

export const getOneSAPMaterialTypes = createAction('SETTING/GET_ONE_SAP_MATERIAL_TYPE')
export const getOneSAPMaterialTypesSuccess = createAction('SETTING/GET_ONE_SAP_MATERIAL_TYPE_SUCCESS')
export const getOneSAPMaterialTypesFail = createAction('SETTING/GET_ONE_SAP_MATERIAL_TYPE_FAIL')

export const getSAPClassify = createAction('SETTING/GET_SAP_CLASSIFY')
export const getSAPClassifySuccess = createAction('SETTING/GET_SAP_CLASSIFY_SUCCESS')
export const getSAPClassifyFail = createAction('SETTING/GET_SAP_CLASSIFY_FAIL')

export const postSaveSAPType = createAction('SETTING/SAVE_SAP_TYPE')
export const postSaveSAPTypeSuccess = createAction('SETTING/SAVE_SAP_TYPE_SUCCESS')
export const postSaveSAPTypeFail = createAction('SETTING/SAVE_SAP_TYPE_FAIL')

export const delSAPType = createAction('SETTING/DEL_SAP_TYPE')
export const delSAPTypeSuccess = createAction('SETTING/DEL_SAP_TYPE_SUCCESS')
export const delSAPTypeFail = createAction('SETTING/DEL_SAP_TYPE_FAIL')
export const getProcessConfigSys = createAction('SETTING/GET_PROCESSING_SYSTEM_CONFIG')
export const getProcessConfigSysSuccess = createAction('SETTING/GET_PROCESSING_SYSTEM_CONFIG_SUCCESS')
export const getProcessConfigSysFail = createAction('SETTING/GET_PROCESSING_SYSTEM_CONFIG_FAIL')

export const postProcessSysConfig = createAction('SETTING/POST_PROCESSING_SYSTEM_CONFIG')
export const postProcessSysConfigSuccess = createAction('SETTING/POST_PROCESSING_SYSTEM_CONFIG_SUCCESS')
export const postProcessSysConfigFail = createAction('SETTING/POST_PROCESSING_SYSTEM_CONFIG_FAIL')

export const delProcessSystemConfig = createAction('SETTING/DELETE_PROCESSING_SYSTEM_CONFIG')
export const delProcessSystemConfigSuccess = createAction('SETTING/DELETE_PROCESSING_SYSTEM_CONFIG_SUCCESS')
export const delProcessSystemConfigFail = createAction('SETTING/DELETE_PROCESSING_SYSTEM_CONFIG_FAIL')

export const getComboAccess = createAction('SETTING/GET_COMBO_ACCESS')
export const getComboAccessSuccess = createAction('SETTING/GET_COMBO_ACCESS_SUCCESS')
export const getComboAccessFail = createAction('SETTING/GET_COMBO_ACCESS_FAIL')

export const postAccountType = createAction('SETTING/POST_ACCOUNT_TYPE')
export const postAccountTypeSuccess = createAction('SETTING/POST_ACCOUNT_TYPE_SUCCESS')
export const postAccountTypeFail = createAction('SETTING/POST_ACCOUNT_TYPE_FAIL')

export const getOneAccountType = createAction('SETTING/GET_ONE_ACCOUNT_TYPE')
export const getOneAccountTypeSuccess = createAction('SETTING/GET_ONE_ACCOUNT_TYPE_SUCCESS')
export const getOneAccountTypeFail = createAction('SETTING/GET_ONE_ACCOUNT_TYPE_FAIL')

export const putOneAccountType = createAction('SETTING/PUT_ONE_ACCOUNT_TYPE')
export const putOneAccountTypeSuccess = createAction('SETTING/PUT_ONE_ACCOUNT_TYPE_SUCCESS')
export const putOneAccountTypeFail = createAction('SETTING/PUT_ONE_ACCOUNT_TYPE_FAIL')

export const delOneAccountType = createAction('SETTING/DEL_ONE_ACCOUNT_TYPE')
export const delOneAccountTypeSuccess = createAction('SETTING/DEL_ONE_ACCOUNT_TYPE_SUCCESS')
export const delOneAccountTypeFail = createAction('SETTING/DEL_ONE_ACCOUNT_TYPE_FAIL')

export const getMappingsupplierRestaurant = createAction('SETTING/GET_MAPPING_SUPPLIER_RESTAURANT')
export const getMappingsupplierRestaurantSuccess = createAction('SETTING/GET_MAPPING_SUPPLIER_RESTAURANT_SUCCESS')
export const getMappingsupplierRestaurantFail = createAction('SETTING/GET_MAPPING_SUPPLIER_RESTAURANT_FAIL')
