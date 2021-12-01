import { saveFile } from '@utils/core.utils'
import { message } from 'antd'

import * as apis from '../../apis/settings.api'
import * as actions from '../actions/setting.action'

export const saveSupplierStuffTypeUpdate = (query) => {
  return (dispatch) => {
    dispatch(actions.saveSupplierStuffType())

    apis
      .postSaveSupplierStuffType(query)
      .then((res) => {
        if (res.IsSuccessed) message.success(res.Message)
        else message.error(res.Message)
        setTimeout(() => location.reload(), 500)
      })
      .catch((err) => dispatch(actions.fetchSupplierListFail(err.message)))
  }
}

export const fetchSupplierList = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchSupplierList())

    apis
      .getSuppliers(query)
      .then((res) => {
        dispatch(actions.fetchSupplierListSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchSupplierListFail(err.message)))
  }
}

export const searchSupplierList = async (query) => {
  return await apis.getSuppliers(query)
}

export const saveParamsAsync = (query) => {
  return (dispatch) => {
    dispatch(actions.saveParametersStart())

    apis
      .saveParameters(query)
      .then((res) => {
        if (!res?.IsSuccessed) message.error(res.Message)
        else message.success(res.Message)
        dispatch(actions.saveParametersSuccess(res))
      })
      .catch((err) => {
        message.error(err.message)
        dispatch(actions.saveParametersFailure(err.message))
      })
  }
}

export const getAccountType = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchAccountType())

    apis
      .getAccountType(query)
      .then((res) => {
        dispatch(actions.fetchAccountTypeSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchAccountTypeFail(err.message)))
  }
}

export const getListCategories = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchListCategory())

    apis
      .getListCategories(query)
      .then((res) => {
        dispatch(actions.fetchListCategorySuccess(res))
      })
      .catch((err) => dispatch(actions.fetchListCategoryFail(err.message)))
  }
}

export const postSyncData = (query) => {
  return (dispatch) => {
    dispatch(actions.postSyncData())

    apis
      .postSyncData(query)
      .then((res) => {
        dispatch(actions.postSyncDataSuccess(res))
      })
      .catch((err) => dispatch(actions.postSyncDataFail(err.message)))
  }
}

export const getListRestaurant = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchListRestaurant())

    apis
      .getListRestaurant(query)
      .then((res) => {
        dispatch(actions.fetchListRestaurantSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchListRestaurantFail(err.message)))
  }
}

export const searchRestaurantList = (query) => {
  return apis.getListRestaurant(query)
}

export const getFullRestaurant = () => {
  return (dispatch) => {
    dispatch(actions.fetchFullListRestaurant())

    apis
      .getFullListRestaurantAPI()
      .then((res) => {
        dispatch(actions.fetchFullListRestaurantSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchFullListRestaurantFail(err.message)))
  }
}

export const getListAppPlants = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchAppPlantsStart())

    apis
      .getListAppPlantsApi(query)
      .then((res) => {
        dispatch(actions.fetchAppPlantsSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchAppPlantsFail(err.message)))
  }
}

export const getAppPlantById = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchSpecifyAppPLantStart())

    apis
      .getAppPlantByIdApi(query)
      .then((res) => {
        dispatch(actions.fetchSpecifyAppPLantSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchSpecifyAppPLantFail(err.message)))
  }
}

export const updateSlocForPlant = (query) => {
  return (dispatch) => {
    dispatch(actions.putSlocForPlantStart())

    apis
      .putSlocForAppPlantAPI(query)
      .then((res) => {
        if (!res?.IsSuccessed) message.error(res?.Message)
        else message.success(res?.Message)
        dispatch(actions.putSlocForPlantSuccess(res))
      })
      .catch((err) => dispatch(actions.putSlocForPlantFail(err.message)))
  }
}

export const pushNotifications = (query) => {
  return (dispatch) => {
    dispatch(actions.pushNotifications())

    apis
      .pushNotifications(query)
      .then((res) => {
        dispatch(actions.pushNotificationsSuccess(res))
      })
      .catch((err) => dispatch(actions.pushNotificationsFail(err.message)))
  }
}

export const postRestaurantSetting = (payload) => {
  const body = payload.map((o) => {
    return {
      Id: o.Id,
      OrderLimit: o.OrderLimit
    }
  })

  return (dispatch) => {
    dispatch(actions.postRestaurantSetting())

    apis
      .postRestaurantSetting(body)
      .then((res) => {
        if (!res?.IsSuccessed) {
          message.success(res.Message)
          dispatch(actions.postRestaurantSettingFail())
        } else {
          message.success(res.Message)
          dispatch(actions.postRestaurantSettingSuccess(payload))
        }
      })
      .catch((err) => dispatch(actions.postRestaurantSettingFail(err.message)))
  }
}

export const sendNotifications = (query) => {
  return (dispatch) => {
    dispatch(actions.sendNoticeStart())

    apis
      .postNotification(query)
      .then((res) => {
        if (!res?.IsSuccessed) message.error(res?.Message)
        else message.success(res?.Message)
        dispatch(actions.sendNoticeSuccess(res))
      })
      .catch((err) => dispatch(actions.sendNoticeFail(err.message)))
  }
}

export const getStuffType = (query) => {
  return (dispatch) => {
    dispatch(actions.getStuffType())

    apis
      .getStuffType(query)
      .then((res) => {
        dispatch(actions.getStuffTypeSuccess(res))
      })
      .catch((err) => dispatch(actions.getStuffTypeFail(err.message)))
  }
}

export const uploadFile = (data) => {
  return (dispatch) => {
    dispatch(actions.uploadFile())

    apis
      .uploadFile(data)
      .then((res) => {
        dispatch(actions.uploadFileSuccess(res))
      })
      .catch((err) => dispatch(actions.uploadFileFail(err.message)))
  }
}

export const updatePlantForSupplier = (query) => {
  return (dispatch) => {
    dispatch(actions.updatePlantSupplier())

    apis
      .mergePlant(query)
      .then((res) => {
        if (!res.IsSuccessed && res.Message) message.error(res.Message)
        else message.success(res.Message)
        dispatch(actions.updatePlantSupplierSuccess(res))
      })
      .catch((err) => dispatch(actions.updatePlantSupplierFail(err.message)))
  }
}

export const updateMaterialForSupplier = (query) => {
  return (dispatch) => {
    dispatch(actions.updateMaterialSupplier())

    apis
      .mergeMaterial(query)
      .then((res) => {
        if (!res.IsSuccessed && res.Message) message.error(res.Message)
        else message.success(res.Message)
        dispatch(actions.updateMaterialSupplierSuccess(res))
      })
      .catch((err) => dispatch(actions.updateMaterialSupplierFail(err.message)))
  }
}

export const getSAPMaterialList = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchSapMaterial())

    apis
      .getSAPMaterial(query)
      .then((res) => {
        if (!res.IsSuccessed && res.Message) message.error(res.Message)
        else message.success(res.Message)
        dispatch(actions.fetchSapMaterialSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchSapMaterialFail(err.message)))
  }
}
export const postStuffUpdate = (data, id) => {
  if (data?.type === 1) {
    return (dispatch) => {
      dispatch(actions.postStuffSupplierUpdate())

      apis
        .postStuffTypeUpdate(data.file, id)
        .then((res) => {
          if (res.IsSuccessed === true) {
            message.success(res.Message)
            dispatch(actions.postStuffSupplierUpdateSuccess(res))
          } else {
            message.error(res.Message)
            dispatch(actions.postStuffSupplierUpdateFail())
          }
        })
        .catch((err) => dispatch(actions.postStuffSupplierUpdateFail(err.message)))
    }
  } else if (data?.type === 2) {
    return (dispatch) => {
      dispatch(actions.postStuffSupplierUpdate())

      apis
        .postStuffSupplierUpdate(data.file, id)
        .then((res) => {
          if (res.IsSuccessed === true) {
            message.success(res.Message)
            dispatch(actions.postStuffSupplierUpdateSuccess(res))
          } else {
            message.error(res.Message)
            dispatch(actions.postStuffSupplierUpdateFail())
          }
        })
        .catch((err) => dispatch(actions.postStuffSupplierUpdateFail(err.message)))
    }
  }
}

export const getSampleStuffSupplier = (data, id) => {
  return (dispatch) => {
    dispatch(actions.getSampleStuffSupplier())

    apis
      .getSampleStuffSupplier(data, id)
      .then((res) => {
        if (res.IsSuccessed === true) {
          dispatch(actions.getSampleStuffSupplierSuccess(res))
          saveFile(res.DataSource, 'POSupplier.xlsx')
        } else {
          dispatch(actions.getSampleStuffSupplierFail())
        }
      })
      .catch((err) => dispatch(actions.postStuffSupplierUpdateFail(err.message)))
  }
}

export const getSampleStuffType = (data, id) => {
  return (dispatch) => {
    dispatch(actions.getSampleStuffType())
    apis
      .getSampleStuffType(data, id)
      .then((res) => {
        if (res.IsSuccessed === true) {
          dispatch(actions.getSampleStuffTypeSuccess(res))
          saveFile(res.DataSource, 'POTypes.xlsx')
        } else {
          dispatch(actions.getSampleStuffTypeFail())
        }
      })
      .catch((err) => dispatch(actions.getSampleStuffTypeFail(err.message)))
  }
}

export const getDetailSystemParameter = () => {
  return (dispatch) => {
    dispatch(actions.getDetailSystemParams())

    apis
      .getDetailParameters()
      .then((res) => {
        if (!res.IsSuccessed && res.Message) message.error(res.Message)
        dispatch(actions.getDetailSystemParamsSuccess(res))
      })
      .catch((err) => dispatch(actions.getDetailSystemParamsFail(err.message)))
  }
}

export const getUnMappingMaterialsActions = (query) => {
  return (dispatch) => {
    dispatch(actions.getUnMapMaterials())

    apis
      .getUnMappingMaterials(query)
      .then((res) => {
        dispatch(actions.getUnMapMaterialsSuccess(res))
      })
      .catch((err) => dispatch(actions.getUnMapMaterialsFail(err.message)))
  }
}

export const getSAPMaterialTypes = (query) => {
  return (dispatch) => {
    dispatch(actions.getSAPMaterialTypes())

    apis
      .getSAPMaterialTypes(query)
      .then((res) => {
        dispatch(actions.getSAPMaterialTypesSuccess(res))
      })
      .catch((err) => dispatch(actions.getSAPMaterialTypesFail(err.message)))
  }
}

export const getOneSAPMaterialTypes = (query) => {
  return (dispatch) => {
    dispatch(actions.getOneSAPMaterialTypes())

    apis
      .getOneSAPMaterialTypes(query)
      .then((res) => {
        dispatch(actions.getOneSAPMaterialTypesSuccess(res))
      })
      .catch((err) => dispatch(actions.getOneSAPMaterialTypesFail(err.message)))
  }
}

export const getSAPClassify = () => {
  return (dispatch) => {
    dispatch(actions.getSAPClassify())

    apis
      .getSAPClassify()
      .then((res) => {
        dispatch(actions.getSAPClassifySuccess(res))
      })
      .catch((err) => dispatch(actions.getSAPClassifyFail(err.message)))
  }
}

export const postSaveSAPType = (data) => {
  const payload = {
    Id: data?.Id,
    Code: data?.Code,
    Description: data?.Description,
    GoodsTypeId: data?.GoodsTypeId
  }

  return (dispatch) => {
    dispatch(actions.postSaveSAPType())

    apis
      .postSaveSAPType(payload)
      .then((res) => {
        if (res?.IsSuccessed === true) {
          message.success(res.Message)
          dispatch(actions.postSaveSAPTypeSuccess(data))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.postSaveSAPTypeFail())
        }
      })
      .catch((err) => dispatch(actions.postSaveSAPTypeFail(err.message)))
  }
}

export const delSAPType = (id) => {
  return (dispatch) => {
    dispatch(actions.delSAPType(id))

    apis
      .delSAPType()
      .then((res) => {
        if (res?.IsSuccessed === true) {
          message.success(res.Message)
          dispatch(actions.delSAPTypeSuccess(id))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.delSAPTypeFail())
        }
      })
      .catch((err) => dispatch(actions.delSAPTypeFail(err.message)))
  }
}

export const getConfigProcessSystem = (query) => {
  return (dispatch) => {
    dispatch(actions.getProcessConfigSys())

    apis
      .getProcessingConfigSys(query)
      .then((res) => {
        dispatch(actions.getProcessConfigSysSuccess(res))
      })
      .catch((err) => dispatch(actions.getSampleStuffSupplierFail(err.message)))
  }
}

export const postProcessingSystemConfig = (query) => {
  return (dispatch) => {
    dispatch(actions.postProcessSysConfig())

    apis
      .postProcessSysConfig(query)
      .then((res) => {
        dispatch(actions.postProcessSysConfigSuccess(res))
        if (!res.IsSuccessed && res.Message) message.error(res.Message)
        else {
          message.success(res.Message)
          setTimeout(() => {
            location.reload()
          }, 500)
        }
      })
      .catch((err) => dispatch(actions.postProcessSysConfigFail(err.message)))
  }
}

export const delProcessingSystemConfig = (query) => {
  return (dispatch) => {
    dispatch(actions.delProcessSystemConfig())

    apis
      .delProcessSysConfig(query)
      .then((res) => {
        dispatch(actions.delProcessSystemConfigSuccess(res))
        if (!res.IsSuccessed) {
          message.error(res.Message)
          location.reload()
        } else {
          message.success(res.Message)
          setTimeout(() => {
            location.reload()
          }, 500)
        }
      })
      .catch((err) => dispatch(actions.delProcessSystemConfigFail(err.message)))
  }
}

export const getComboAccess = () => {
  return (dispatch) => {
    dispatch(actions.getComboAccess())

    apis
      .getComboAccess()
      .then((res) => {
        if (res?.IsSuccessed === true) {
          // message.success(res.Message)
          dispatch(actions.getComboAccessSuccess(res))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.getComboAccessFail())
        }
      })
      .catch((err) => dispatch(actions.getComboAccessFail(err.message)))
  }
}

export const postAccountType = (data) => {
  return (dispatch) => {
    dispatch(actions.postAccountType())

    apis
      .postAccountType(data)
      .then((res) => {
        if (res?.IsSuccessed === true) {
          message.success('Thêm mới nhóm quyền thành công')
          dispatch(actions.postAccountTypeSuccess(data))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.postAccountTypeFail())
        }
      })
      .catch((err) => dispatch(actions.postAccountTypeFail(err.message)))
  }
}

export const getOneAccountType = (id) => {
  return (dispatch) => {
    dispatch(actions.getOneAccountType())

    apis
      .getOneAccountType(id)
      .then((res) => {
        if (res?.IsSuccessed === true) {
          // message.success(res.Message)
          dispatch(actions.getOneAccountTypeSuccess(res))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.getOneAccountTypeFail())
        }
      })
      .catch((err) => dispatch(actions.getOneAccountTypeFail(err.message)))
  }
}

export const putOneAccountType = (data) => {
  return (dispatch) => {
    dispatch(actions.putOneAccountType())

    apis
      .putOneAccountType(data)
      .then((res) => {
        if (res?.IsSuccessed === true) {
          message.success(res.Message)
          dispatch(actions.putOneAccountTypeSuccess(data))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.putOneAccountTypeFail())
        }
      })
      .catch((err) => dispatch(actions.putOneAccountTypeFail(err.message)))
  }
}

export const delOneAccountType = (id) => {
  return (dispatch) => {
    dispatch(actions.delOneAccountType())

    apis
      .delOneAccountType(id)
      .then((res) => {
        if (res?.IsSuccessed === true) {
          message.success(res.Message)
          dispatch(actions.delOneAccountTypeSuccess(id))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.delOneAccountTypeFail())
        }
      })
      .catch((err) => dispatch(actions.delOneAccountTypeFail(err.message)))
  }
}

export const getMappingsupplierRestaurant = (query) => {
  return (dispatch) => {
    dispatch(actions.getMappingsupplierRestaurant())

    apis
      .getMappingsupplierRestaurant(query)
      .then((res) => {
        dispatch(actions.getMappingsupplierRestaurantSuccess(res))
      })
      .catch((err) => dispatch(actions.getMappingsupplierRestaurantFail(err.message)))
  }
}
