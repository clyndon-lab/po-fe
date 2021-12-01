import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import * as actions from '../actions/setting.action'

const INITIAL_STATE = freeze({
  suppliers: [],
  totalSuppliers: 0,
  savedParameter: null,
  accountType: [],
  categories: [],
  restaurants: [],
  stuffTypes: [],
  fileResult: null,

  fullRestaurant: [],
  mappingsupplierRestaurant: [],

  appPlants: [],
  totalAppPlants: 0,

  appPlantById: null,

  updatedSloc: null,

  sentNotice: null,

  systemDetailParams: {},

  updatedPlantForSupplier: null,
  updatedMaterialForSupplier: null,

  sapMaterials: [],

  unMapMaterials: [],

  processSystemConfigList: [],

  totalAccountType: 0,
  totalRestaurant: 0,
  isLoading: false,
  errorMessage: null,

  stuffSampleSupplier: [],
  stuffSampleType: [],
  sapMaterialTypes: [],
  sapMaterialType: null,
  sapClassify: [],
  comboAccess: [],
  oneAccountType: null,
  isSuccess: false,

  loadingSetting: false
})

export default handleActions(
  {
    [actions.saveSupplierStuffType]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.saveSupplierStuffTypeSuccess]: (state) => {
      return freeze({
        ...state,
        isLoading: false
      })
    },
    [actions.saveSupplierStuffTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.fetchSupplierList]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchSupplierListSuccess]: (state, actions) => {
      return freeze({
        ...state,
        suppliers: actions.payload.DataSource,
        totalSuppliers: actions.payload.TotalCount,
        isLoading: false
      })
    },
    [actions.fetchSupplierListFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.saveParametersStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.saveParametersSuccess]: (state, actions) => {
      return freeze({
        ...state,
        savedParameter: actions.payload,
        isLoading: false
      })
    },
    [actions.saveParametersFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.fetchAccountType]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchAccountTypeSuccess]: (state, actions) => {
      return freeze({
        ...state,
        accountType: actions.payload.DataSource,
        totalAccountType: actions.payload.TotalCount,
        isLoading: false
      })
    },
    [actions.fetchAccountTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.fetchListCategory]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchListCategorySuccess]: (state, actions) => {
      return freeze({
        ...state,
        categories: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.fetchListCategoryFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.postSyncData]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.postSyncDataSuccess]: (state) => {
      return freeze({
        ...state,
        // categories: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.postSyncDataFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.fetchListRestaurant]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchListRestaurantSuccess]: (state, actions) => {
      return freeze({
        ...state,
        restaurants: actions.payload.DataSource,
        totalRestaurant: actions.payload.TotalCount,
        isLoading: false
      })
    },
    [actions.fetchListRestaurantFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Fetch app plants
    [actions.fetchAppPlantsStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchAppPlantsSuccess]: (state, actions) => {
      return freeze({
        ...state,
        appPlants: actions.payload.DataSource,
        totalAppPlants: actions.payload.TotalCount,
        isLoading: false
      })
    },
    [actions.fetchAppPlantsFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Fetch app plants
    [actions.fetchSpecifyAppPLantStart]: (state) => {
      return freeze({
        ...state,
        loadingSetting: true,
        isLoading: true
      })
    },
    [actions.fetchSpecifyAppPLantSuccess]: (state, actions) => {
      return freeze({
        ...state,
        appPlantById: actions.payload.ResultObj,
        loadingSetting: false,
        isLoading: false
      })
    },
    [actions.fetchSpecifyAppPLantFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        loadingSetting: false,
        isLoading: false
      })
    },

    // Put Sloc for Plant
    [actions.putSlocForPlantStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.putSlocForPlantSuccess]: (state, actions) => {
      return freeze({
        ...state,
        updatedSloc: actions.payload,
        isLoading: false
      })
    },
    [actions.putSlocForPlantFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Fetch full list restaurant
    [actions.fetchFullListRestaurant]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchFullListRestaurantSuccess]: (state, actions) => {
      return freeze({
        ...state,
        fullRestaurant: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.fetchFullListRestaurantFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Send Notification
    [actions.sendNoticeStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.sendNoticeSuccess]: (state, actions) => {
      return freeze({
        ...state,
        sentNotice: actions.payload.ResultObj,
        isLoading: false
      })
    },
    [actions.sendNoticeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.postRestaurantSetting]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.postRestaurantSettingSuccess]: (state, actions) => {
      return freeze({
        ...state,
        restaurants: actions.payload,
        isLoading: false
      })
    },
    [actions.postRestaurantSettingFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.getStuffType]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getStuffTypeSuccess]: (state, actions) => {
      return freeze({
        ...state,
        stuffTypes: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.getStuffTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.uploadFile]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.uploadFileSuccess]: (state, actions) => {
      return freeze({
        ...state,
        fileResult: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.uploadFileFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Update Plant for Supplier
    [actions.updatePlantSupplier]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getSampleStuffSupplier]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.updatePlantSupplierSuccess]: (state, actions) => {
      return freeze({
        ...state,
        updatedPlantForSupplier: actions.payload.ResultObj,
        isLoading: false
      })
    },
    [actions.updatePlantSupplierFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Update Material for Supplier
    [actions.updateMaterialSupplier]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getSampleStuffType]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.updateMaterialSupplierSuccess]: (state, actions) => {
      return freeze({
        ...state,
        updatedMaterialForSupplier: actions.payload.ResultObj,
        isLoading: false
      })
    },
    [actions.updateMaterialSupplierFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // SAP materials list
    [actions.fetchSapMaterial]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchSapMaterialSuccess]: (state, actions) => {
      return freeze({
        ...state,
        sapMaterials: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.fetchSapMaterialFail]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getSampleStuffTypeSuccess]: (state, actions) => {
      return freeze({
        ...state,
        stuffSampleType: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.getSampleStuffTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // System detail parameters
    [actions.getDetailSystemParams]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getDetailSystemParamsSuccess]: (state, actions) => {
      return freeze({
        ...state,
        systemDetailParams: actions.payload.ResultObj,
        isLoading: false
      })
    },
    [actions.getDetailSystemParamsFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // System detail parameters
    [actions.getUnMapMaterials]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getUnMapMaterialsSuccess]: (state, actions) => {
      return freeze({
        ...state,
        unMapMaterials: actions.payload,
        isLoading: false
      })
    },
    [actions.getUnMapMaterialsFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.getSAPMaterialTypes]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getSAPMaterialTypesSuccess]: (state, actions) => {
      return freeze({
        ...state,
        sapMaterialTypes: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.getSAPMaterialTypesFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.getOneSAPMaterialTypes]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getOneSAPMaterialTypesSuccess]: (state, actions) => {
      return freeze({
        ...state,
        sapMaterialType: actions.payload.ResultObj,
        isLoading: false
      })
    },
    [actions.getOneSAPMaterialTypesFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.getSAPClassify]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getSAPClassifySuccess]: (state, actions) => {
      return freeze({
        ...state,
        sapClassify: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.getSAPClassifyFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Processing system config list
    [actions.getProcessConfigSys]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getProcessConfigSysSuccess]: (state, actions) => {
      return freeze({
        ...state,
        processSystemConfigList: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.getProcessConfigSysFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.postSaveSAPType]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },

    // Post Processing system config
    [actions.postProcessSysConfig]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.postSaveSAPTypeSuccess]: (state, actions) => {
      return freeze({
        ...state,
        sapMaterialTypes: state.sapMaterialTypes.map((item) => {
          if (item.Id === actions.payload.Id) {
            return {
              ...item,
              GoodsTypeId: actions.payload.Type.Code,
              POGoodsTypesName: actions.payload.Type.Name
            }
          } else return item
        }),
        isLoading: false
      })
    },
    [actions.postSaveSAPTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.postProcessSysConfigSuccess]: (state) => {
      return freeze({
        ...state,
        isLoading: false
      })
    },
    [actions.postProcessSysConfigFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.delSAPType]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    // Delete Processing system config
    [actions.delProcessSystemConfig]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.delSAPTypeSuccess]: (state, actions) => {
      return freeze({
        ...state,
        sapMaterialTypes: state.sapMaterialTypes.filter((item) => item.Id !== actions.payload),
        isLoading: false
      })
    },
    [actions.delSAPTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.delProcessSystemConfigSuccess]: (state) => {
      return freeze({
        ...state,
        isLoading: false
      })
    },
    [actions.delProcessSystemConfigFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.getComboAccess]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getComboAccessSuccess]: (state, actions) => {
      return freeze({
        ...state,
        comboAccess: actions.payload.ResultObj.Functions,
        isLoading: false
      })
    },
    [actions.getComboAccessFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.postAccountType]: (state) => {
      return freeze({
        ...state,
        isLoading: true,
        isSuccess: false
      })
    },
    [actions.postAccountTypeSuccess]: (state) => {
      return freeze({
        ...state,
        // comboAccess: [actions.payload.ResultObj.Functions],
        isLoading: false,
        isSuccess: true
      })
    },
    [actions.postAccountTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isSuccess: false,
        isLoading: false
      })
    },

    [actions.getOneAccountType]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getOneAccountTypeSuccess]: (state, actions) => {
      return freeze({
        ...state,
        oneAccountType: actions.payload.ResultObj,
        isLoading: false
      })
    },
    [actions.getOneAccountTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.delOneAccountType]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.delOneAccountTypeSuccess]: (state, actions) => {
      return freeze({
        ...state,
        accountType: state.accountType.filter(item => item.Id !== actions.payload),
        isLoading: false
      })
    },
    [actions.delOneAccountTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.putOneAccountType]: (state) => {
      return freeze({
        ...state,
        isSuccess: false,
        isLoading: true
      })
    },
    [actions.putOneAccountTypeSuccess]: (state) => {
      return freeze({
        ...state,
        // comboAccess: [actions.payload.ResultObj.Functions],
        isLoading: false,
        isSuccess: true
      })
    },
    [actions.putOneAccountTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isSuccess: false,
        isLoading: false
      })
    },

    [actions.getMappingsupplierRestaurant]: (state) => {
      return freeze({
        ...state,
        isSuccess: false,
        isLoading: true
      })
    },
    [actions.getMappingsupplierRestaurantSuccess]: (state, actions) => {
      return freeze({
        ...state,
        mappingsupplierRestaurant: actions.payload,
        isLoading: false,
        isSuccess: true
      })
    },
    [actions.getMappingsupplierRestaurantFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isSuccess: false,
        isLoading: false
      })
    },
  },

  INITIAL_STATE
)
