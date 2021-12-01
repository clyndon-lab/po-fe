import * as apis from '../../apis/home.api'
import * as actions from '../actions/home.action'

export const getOrderList = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchOrderList())

    apis
      .getOrderList(query)
      .then((res) => {
        dispatch(actions.fetchOrderListSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchOrderListFail(err.message)))
  }
}

export const getReturnGood = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchReturnGood())

    apis
      .getReturnGood(query)
      .then((res) => {
        dispatch(actions.fetchReturnGoodSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchReturnGoodFail(err.message)))
  }
}

export const getDeliveryList = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchDeliveryList())

    apis
      .getDeliveryList(query)
      .then((res) => {
        dispatch(actions.fetchDeliveryListSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchDeliveryListFail(err.message)))
  }
}

export const getAmount = (type) => {
  if (type === 'ORDER')
    return (dispatch) => {
      dispatch(actions.fetchAmountOrder())
      apis
        .getAmount(type)
        .then((res) => {
          dispatch(actions.fetchAmountOrderSuccess(res))
        })
        .catch((err) => dispatch(actions.fetchAmountOrderFail(err.message)))
    }
  else if (type === 'RETURNGOOD')
    return (dispatch) => {
      dispatch(actions.fetchAmountReturn())
      apis
        .getAmount(type)
        .then((res) => {
          dispatch(actions.fetchAmountReturnSuccess(res))
        })
        .catch((err) => dispatch(actions.fetchAmountReturnFail(err.message)))
    }
  else if (type === 'DELIVERY')
    return (dispatch) => {
      dispatch(actions.fetchAmountDelivery())
      apis
        .getAmount(type)
        .then((res) => {
          dispatch(actions.fetchAmountDeliverySuccess(res))
        })
        .catch((err) => dispatch(actions.fetchAmountDeliveryFail(err.message)))
    }
}
