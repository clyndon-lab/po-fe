import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import * as actions from '../actions/delivery.action'

const INITIAL_STATE = freeze({
  createdDelivery: null,
  deliveryTicket: null,
  isLoading: false,
  errorMessage: null,
  isSuccess: false
})

export default handleActions(
  {
    [actions.createDeliveryStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.createDeliverySuccess]: (state, actions) => {
      return freeze({
        ...state,
        createdDelivery: actions.payload,
        isLoading: false
      })
    },
    [actions.createDeliveryFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    //get detail
    [actions.getOneDelivery]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getOneDeliverySuccess]: (state, actions) => {
      return freeze({
        ...state,
        deliveryTicket: actions.payload.ResultObj,
        isLoading: false
      })
    },
    [actions.getOneDeliveryFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    //update delivery
    [actions.updateDelivery]: (state) => {
      return freeze({
        ...state,
        isSuccess: false,
        isLoading: true
      })
    },
    [actions.updateDeliverySuccess]: (state) => {
      return freeze({
        ...state,
        isSuccess: true,
        isLoading: false
      })
    },
    [actions.updateDeliveryFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isSuccess: false,
        isLoading: false
      })
    }
  },
  INITIAL_STATE
)
