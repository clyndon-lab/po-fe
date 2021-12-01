import { message } from 'antd'

import * as apis from '../../apis/combo.api'
import * as actions from '../actions/combo.action'

export const getSuppliersByStuffType = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchSupplierByStuffType())

    apis.getSupplierByStuffType(query).then((res) => {
      dispatch(actions.fetchSupplierByStuffTypeSuccess(res))
    }).catch((err) => dispatch(actions.fetchSupplierByStuffTypeFail(err.message)))
  }
}

export const getMaterialGroupList = () => {
  return (dispatch) => {
    dispatch(actions.fetchMaterialGroupList())

    apis.getMaterialGroupList().then((res) => {
      dispatch(actions.fetchMaterialGroupListSuccess(res))
    }).catch((err) => dispatch(actions.fetchMaterialGroupListFail(err.message)))
  }
}

export const getSpecificMaterialList = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchSpecificMaterial())

    apis.getSpecificMaterial(query).then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      dispatch(actions.fetchSpecificMaterialSuccess(res))
    }).catch((err) => dispatch(actions.fetchSpecificMaterialFail(err.message)))
  }
}

export const getPlantsByMaterialGroup = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchPlantsByMaterialGroup())

    apis.getPlantByMaterialGroup(query).then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      dispatch(actions.fetchPlantsByMaterialGroupSuccess(res))
    }).catch((err) => dispatch(actions.fetchPlantsByMaterialGroupFail(err.message)))
  }
}

export const getSlocsByPlant = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchSlocByPlant())

    apis.getSlocByPlant(query).then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      dispatch(actions.fetchSlocByPlantSuccess(res))
    }).catch((err) => dispatch(actions.fetchSlocByPlantFail(err.message)))
  }
}

export const getPOStatusType = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchPOStatusType())

    apis.getPOStatus(query).then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      dispatch(actions.fetchPOStatusTypeSuccess(res))
    }).catch((err) => dispatch(actions.fetchPOStatusTypeFail(err.message)))
  }
}

// AMS
export const getAMSCategories = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchAMSCategories())

    apis.getCategoryAMS(query).then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      // else message.success(res.Message)
      dispatch(actions.fetchAMSCategoriesSuccess(res))
    }).catch((err) => dispatch(actions.fetchAMSCategoriesFail(err.message)))
  }
}

export const getAMSStocks = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchStockAMS())

    apis.getStockAMS(query).then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      // else message.success(res.Message)
      dispatch(actions.fetchStockAMSSuccess(res))
    }).catch((err) => dispatch(actions.fetchStockAMSFail(err.message)))
  }
}

export const getAMSProducts = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchAMSProduct())

    apis.getProductAMS(query).then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      // else message.success(res.Message)
      dispatch(actions.fetchAMSProductSuccess(res))
    }).catch((err) => dispatch(actions.fetchAMSProductFail(err.message)))
  }
}

export const getAMSConfigQuantity = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchConfigQuantityAMS())

    apis.getConfigQuanityAMS(query).then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      // else message.success(res.Message)
      dispatch(actions.fetchConfigQuantityAMSSuccess(res))
    }).catch((err) => dispatch(actions.fetchConfigQuantityAMSFail(err.message)))
  }
}

export const fetchLoginInfo = () => {
  return (dispatch) => {
    dispatch(actions.getLoginInfo())

    apis.getLoginInfo().then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      dispatch(actions.getLoginInfoSuccess(res))
    }).catch((err) => dispatch(actions.getLoginInfoFail(err.message)))
  }
}

export const getSapSuppliers = () => {
  return (dispatch) => {
    dispatch(actions.fetchSapSupplier())

    apis.getSapSupplier().then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      dispatch(actions.fetchSapSupplierSuccess(res))
    }).catch((err) => dispatch(actions.fetchSapSupplierFail(err.message)))
  }
}

export const getSupplierInfoAsync = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchSupplierInfo())

    apis.getSupplierInfo(query).then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      dispatch(actions.fetchSupplierInfoSuccess(res))
    }).catch((err) => dispatch(actions.fetchSupplierInfoFail(err.message)))
  }
}


export const getConfigBySupplier = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchConfigBySupplier())

    apis.getConfigBySupplierId(query).then((res) => {
      if (!res.IsSuccessed && res.Message) message.error(res.Message)
      dispatch(actions.fetchConfigBySupplierSuccess(res))
    }).catch((err) => dispatch(actions.fetchConfigBySupplierSuccess(err.message)))
  }
}