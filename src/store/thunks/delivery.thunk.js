import { message } from 'antd'

import * as apis from '../../apis/delivery.api'
import * as actions from '../actions/delivery.action'

export const getOneDelivery = (id) => {
  return (dispatch) => {
    dispatch(actions.getOneDelivery())

    apis
      .getOneDelivery(id)
      .then((res) => {
        if (res?.IsSuccessed === true) {
          // message.success(res.Message)
          dispatch(actions.getOneDeliverySuccess(res))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.getOneDeliveryFail())
        }
      })
      .catch((err) => dispatch(actions.getOneDeliveryFail(err.message)))
  }
}

export const updateDelivery = (payload) => {
  return (dispatch) => {
    dispatch(actions.updateDelivery())

    apis
      .updateDelivery(payload)
      .then((res) => {
        if (res?.IsSuccessed === true) {
          message.success('Cập nhật phiếu giao hàng thành công')
          dispatch(actions.updateDeliverySuccess(res))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.updateDeliveryFail())
        }
      })
      .catch((err) => dispatch(actions.updateDeliveryFail(err.message)))
  }
}

export const updateDeliveryStatus = (payload) => {
  return (dispatch) => {
    dispatch(actions.updateDeliveryStatus())

    apis
      .updateDeliveryStatus(payload)
      .then((res) => {
        if (res?.IsSuccessed === true) {
          message.success(res.Message)
          dispatch(actions.updateDeliveryStatusSuccess(res))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.updateDeliveryStatusFail())
        }
      })
      .catch((err) => dispatch(actions.updateDeliveryStatusFail(err.message)))
  }
}
