import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import * as actions from '../actions/home.action'

const INITIAL_STATE = freeze({
  orderList: [],
  returnGood: [],
  deliveryList: [],
  amountOrder: null,
  amountDelivery: null,
  amountReturn: null,
  isLoading: false,
  isLoadingDelivery: false,
  isLoadingReturn: false,
  errorMessage: '',
  isLoadingAmount: false,
})

export default handleActions(
  {
    [actions.fetchOrderList]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchOrderListSuccess]: (state, actions) => {
      return freeze({
        ...state,
        orderList: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.fetchOrderListFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.fetchDeliveryList]: (state) => {
      return freeze({
        ...state,
        isLoadingDelivery: true
      })
    },
    [actions.fetchDeliveryListSuccess]: (state, actions) => {
      return freeze({
        ...state,
        deliveryList: actions.payload.DataSource,
        isLoadingDelivery: false
      })
    },
    [actions.fetchDeliveryListFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoadingDelivery: false
      })
    },
    [actions.fetchReturnGood]: (state) => {
      return freeze({
        ...state,
        isLoadingReturn: true
      })
    },
    [actions.fetchReturnGoodSuccess]: (state, actions) => {
      return freeze({
        ...state,
        returnGood: actions.payload.DataSource,
        isLoadingReturn: false
      })
    },
    [actions.fetchReturnGoodFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoadingReturn: false
      })
    },
    [actions.fetchAmountOrder]: (state) => {
      return freeze({
        ...state,
        isLoadingAmount: true
      })
    },
    [actions.fetchAmountOrderSuccess]: (state, actions) => {
      return freeze({
        ...state,
        amountOrder: actions.payload.ResultObj,
        isLoadingAmount: false
      })
    },
    [actions.fetchAmountOrderFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoadingAmount: false
      })
    },
    [actions.fetchAmountReturn]: (state) => {
      return freeze({
        ...state,
        isLoadingAmount: true
      })
    },
    [actions.fetchAmountReturnSuccess]: (state, actions) => {
      return freeze({
        ...state,
        amountReturn: actions.payload.ResultObj,
        isLoadingAmount: false
      })
    },
    [actions.fetchAmountReturnFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoadingAmount: false
      })
    },
    [actions.fetchAmountDelivery]: (state) => {
      return freeze({
        ...state,
        isLoadingAmount: true
      })
    },
    [actions.fetchAmountDeliverySuccess]: (state, actions) => {
      return freeze({
        ...state,
        amountDelivery: actions.payload.ResultObj,
        isLoadingAmount: false
      })
    },
    [actions.fetchAmountDeliveryFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoadingAmount: false
      })
    }
  },
  INITIAL_STATE
)
