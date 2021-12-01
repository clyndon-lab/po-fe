import { message } from 'antd'

import {
  createDelivery,
  createOrder,
  delOrder,
  getDeliveryList,
  getDetailDelivery,
  getOrders,
  getOrdersById,
  getOrderSystemList,
  getPOGoodTypes,
  getStuffTypes,
  getSupplierByPage,
  updateOrder,
  updateOrderStatus
} from '../../apis/orders.api'
import * as actions from '../actions/orders.action'

export const fetchOrdersList = (query) => {
  return dispatch => {
    dispatch(actions.fetchOrdersStart())

    getOrders(query).then(res => {
      if (!res.IsSuccessed && res.Message) message.success(res.Message)
      if (!res.DataSource.length) message.info('Chưa có đơn hàng nào tổn tại!')
      dispatch(actions.fetchOrdersSuccess(res))
    }).catch(err => dispatch(actions.fetchOrdersFailure(err.message)))
  }
}

export const fetchOrderByID = (query) => {
  return dispatch => {
    dispatch(actions.fetchOrderByIDStart())

    getOrdersById(query).then(res => {
      dispatch(actions.fetchOrderByIDSuccess(res))
    }).catch(err => dispatch(actions.fetchOrderByIDFailure(err.message)))
  }
}

export const fetchPOGoodTypes = () => {
  return dispatch => {
    dispatch(actions.fetchGoodTypesStart())

    getPOGoodTypes().then(res => {
      dispatch(actions.fetchGoodTypesSuccess(res))
    }).catch(err => dispatch(actions.fetchGoodTypesFailure(err.message)))
  }
}

export const fetchOrderSystems = () => {
  return dispatch => {
    dispatch(actions.fetchOrderSystemListStart())

    getOrderSystemList().then(res => {
      dispatch(actions.fetchOrderSystemListSuccess(res))
    }).catch(err => dispatch(actions.fetchOrderSystemListFailure(err.message)))
  }
}

export const fetchSupplierByPage = (query) => {
  return dispatch => {
    dispatch(actions.fetchSupplierByPageStart())

    getSupplierByPage(query).then(res => {
      // const formatData = res?.DataSource?.map(item => ({ Name: item.LongName, Code: item.Supplier }))
      dispatch(actions.fetchSupplierByPageSuccess(res.DataSource))
    }).catch(err => dispatch(actions.fetchSupplierByPageFailure(err.message)))
  }
}

export const fetchStuffTypes = () => {
  return dispatch => {
    dispatch(actions.fetchStuffTypesStart())

    getStuffTypes().then(res => {
      dispatch(actions.fetchStuffTypesSuccess(res))
    }).catch(err => dispatch(actions.fetchStuffTypesFailure(err.message)))
  }
}

export const createOrderAction = (query, history, isOnTemp) => {
  console.log('voday')
  return dispatch => {
    dispatch(actions.createOrderStart())

    createOrder(query).then(res => {
      dispatch(actions.createOrderSuccess(res))
      if (!res?.IsSuccessed) message.error(res.Message)
      else {
        message.success(res.Message)
        if (isOnTemp) history.push('/orders')
        else history.push(`/orders/detail/${res.ResultObj.Id}`)
      }
    }).catch(err => dispatch(actions.createOrderFailure(err.message)))
  }
}

export const updateOrderAction = (query, isUpdateCK, history, params) => {
  return dispatch => {
    dispatch(actions.updateOrderStart())

    updateOrder(query).then(res => {
      dispatch(actions.updateOrderSuccess(res))

      if (!res?.IsSuccessed) message.error(res.Message)
      else {
        message.success(res?.Message)
        setTimeout(() => {
          if (isUpdateCK) history.push(`/orders/detail-ck/${params.id}`)
          else location.reload()
        }, 500)
      }
    }).catch(err => {
      message.error(err.message)
      dispatch(actions.updateOrderFailure(err.message))
    })
  }
}

export const deleteOrder = (query, history) => {
  return dispatch => {
    dispatch(actions.deleteOrderStart())

    delOrder(query).then(res => {
      if (!res?.IsSuccessed) message.error(res.Message)
      else {
        message.success(res.Message)
        setTimeout(() => history.push('/order'), 1000)
      }
    }).catch(err => {
      message.error(err.message)
      dispatch(actions.deleteOrderFailure(err.message))
    })
  }
}

export const getDeliveries = (query) => {
  return dispatch => {
    dispatch(actions.getDeliveryList())

    getDeliveryList(query)
      .then((res) => {
        if (res.IsSuccessed === true) {
          dispatch(actions.getDeliveryListSuccess(res))
        } else {
          dispatch(actions.getDeliveryListFail())
        }
      })
      .catch((err) => dispatch(actions.getDeliveryListFailFail(err.message)))
  }
}

export const getDetailOneDelivery = (id) => {
  return dispatch => {
    dispatch(actions.getDetailDelivery())

    getDetailDelivery(id)
      .then((res) => {
        if (res.IsSuccessed === true) {
          dispatch(actions.getDetailDeliverySuccess(res))
        } else {
          dispatch(actions.getDetailDeliveryFail())
        }
      })
      .catch((err) => dispatch(actions.getDetailDeliveryFailFail(err.message)))
  }
}

export const createDeliveryTicket = (payload) => {
  return (dispatch) => {
    dispatch(actions.createDelivery())

    createDelivery(payload)
      .then((res) => {
        if (res?.IsSuccessed === true) {
          message.success('Tạo phiếu giao hàng thành công')
          dispatch(actions.createDeliverySuccess(payload))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.createDeliveryFail())
        }
      })
      .catch((err) => dispatch(actions.createDeliveryFail(err.message)))
  }
}

export const updateStatus = (payload) => {
  return (dispatch) => {
    dispatch(actions.createDelivery())

    updateOrderStatus(payload)
      .then((res) => {
        if (res?.IsSuccessed === true) {
          message.success(res.Message)
          dispatch(actions.updateOrderStatus(payload))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.updateOrderStatusFail())
        }
      })
      .catch((err) => dispatch(actions.updateOrderStatusFail(err.message)))
  }
}
