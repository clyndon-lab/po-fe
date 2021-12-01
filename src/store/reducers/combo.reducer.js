import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import * as actions from '../actions/combo.action'

const INITIAL_STATE = freeze({
  materialGroupList: [],

  suppliersByStuffType: [],

  specMaterialList: [],
  specMaterialList2: [],

  plantsByMaterial: [],

  slocsByPlant: [],

  categories: [],
  flowRequests: [],

  stocksAMS: [],
  productsAMS: [],
  configQuantityAMS: {},

  statusType: [],

  sapSuppliers: [],

  configBySupplier: [],

  loginInfo: null,

  supplierInfo: null,

  isFetching: false,
  errorMessage: null,

  loadingCombo: false,
  loadingAMSProducts: false,
})

export default handleActions(
  {
    [actions.fetchSupplierByStuffType]: (state, actions) => {
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: true,
      })
    },
    [actions.fetchSupplierByStuffTypeSuccess]: (state, actions) => {
      return freeze({
        ...state,
        suppliersByStuffType: actions.payload.ResultObj,
        isFetching: false,
      })
    },
    [actions.fetchSupplierByStuffTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },

    [actions.fetchMaterialGroupList]: (state, actions) => {
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: true,
      })
    },
    [actions.fetchMaterialGroupListSuccess]: (state, actions) => {
      return freeze({
        ...state,
        materialGroupList: actions.payload.DataSource,
        isFetching: false,
      })
    },
    [actions.fetchMaterialGroupListFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },

    // specMaterialList
    [actions.fetchSpecificMaterial]: (state, actions) => {
      console.log(actions)
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: true,
      })
    },
    [actions.fetchSpecificMaterialSuccess]: (state, actions) => {
      console.log('actions.payload.DataSource', actions.payload.DataSource)
      return freeze({
        ...state,
        specMaterialList: actions.payload.DataSource,
        isFetching: false,
      })
    },
    [actions.fetchSpecificMaterialFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },

    // PLANT BY MATERIAL GROUP
    [actions.fetchPlantsByMaterialGroup]: (state, actions) => {
      console.log(actions)
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: true,
      })
    },
    [actions.fetchPlantsByMaterialGroupSuccess]: (state, actions) => {
      return freeze({
        ...state,
        plantsByMaterial: actions.payload.DataSource,
        isFetching: false,
      })
    },
    [actions.fetchPlantsByMaterialGroupFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },

    // SLOCS BY PLANT
    [actions.fetchSlocByPlant]: (state, actions) => {
      console.log(actions)
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: true,
      })
    },
    [actions.fetchSlocByPlantSuccess]: (state, actions) => {
      return freeze({
        ...state,
        slocsByPlant: actions.payload.DataSource,
        isFetching: false,
      })
    },
    [actions.fetchSlocByPlantFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },


    // AMS CATEGORIES
    [actions.fetchAMSCategories]: (state, actions) => {
      console.log(actions)
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: true,
      })
    },
    [actions.fetchAMSCategoriesSuccess]: (state, actions) => {
      return freeze({
        ...state,
        categories: actions.payload.ResultObj.list_type_product_order,
        flowRequests: actions.payload.ResultObj.list_asset_request_type,
        isFetching: false,
      })
    },
    [actions.fetchAMSCategoriesFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },

    // AMS STOCK
    [actions.fetchStockAMS]: (state, actions) => {
      console.log(actions)
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: true,
      })
    },
    [actions.fetchStockAMSSuccess]: (state, actions) => {
      return freeze({
        ...state,
        stocksAMS: actions.payload.ResultObj,
        isFetching: false,
      })
    },
    [actions.fetchStockAMSFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },

    // AMS WAREHOUSE
    [actions.fetchAMSProduct]: (state, actions) => {
      console.log(actions)
      return freeze({
        ...state,
        posts: actions.payload,
        loadingAMSProducts: true,
      })
    },
    [actions.fetchAMSProductSuccess]: (state, actions) => {
      return freeze({
        ...state,
        productsAMS: actions.payload.ResultObj,
        loadingAMSProducts: false,
      })
    },
    [actions.fetchAMSProductFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        loadingAMSProducts: false,
      })
    },

    // AMS CONFIG QUANTITY
    [actions.fetchConfigQuantityAMS]: (state, actions) => {
      console.log(actions)
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: true,
      })
    },
    [actions.fetchConfigQuantityAMSSuccess]: (state, actions) => {
      return freeze({
        ...state,
        configQuantityAMS: actions.payload.ResultObj,
        isFetching: false,
      })
    },
    [actions.fetchConfigQuantityAMSFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },

    // PO status type
    [actions.fetchPOStatusType]: (state, actions) => {
      console.log(actions)
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: true,
        loadingCombo: true
      })
    },
    [actions.fetchPOStatusTypeSuccess]: (state, actions) => {
      return freeze({
        ...state,
        statusType: actions.payload.DataSource,
        isFetching: false,
        loadingCombo: false
      })
    },
    [actions.fetchPOStatusTypeFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        loadingCombo: false
      })
    },

    // Login Info
    [actions.getLoginInfo]: (state) => {
      return freeze({
        ...state,
        isFetching: true,
      })
    },
    [actions.getLoginInfoSuccess]: (state, actions) => {
      return freeze({
        ...state,
        loginInfo: actions.payload.ResultObj,
        isFetching: false,
      })
    },
    [actions.getLoginInfoFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },

    // SAP suppliers
    [actions.fetchSapSupplier]: (state) => {
      return freeze({
        ...state,
        isFetching: true,
      })
    },
    [actions.fetchSapSupplierSuccess]: (state, actions) => {
      return freeze({
        ...state,
        sapSuppliers: actions.payload.DataSource,
        isFetching: false,
      })
    },
    [actions.fetchSapSupplierFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },


    // SUPPLIER info
    [actions.fetchSupplierInfo]: (state) => {
      return freeze({
        ...state,
        isFetching: true,
      })
    },
    [actions.fetchSupplierInfoSuccess]: (state, actions) => {
      return freeze({
        ...state,
        supplierInfo: actions.payload.ResultObj,
        isFetching: false,
      })
    },
    [actions.fetchSupplierInfoFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },

    // 
    [actions.fetchConfigBySupplier]: (state) => {
      return freeze({
        ...state,
        isFetching: true,
      })
    },
    [actions.fetchConfigBySupplierSuccess]: (state, actions) => {
      return freeze({
        ...state,
        configBySupplier: actions.payload.DataSource,
        isFetching: false,
      })
    },
    [actions.fetchConfigBySupplierFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },
  },
  INITIAL_STATE
)
