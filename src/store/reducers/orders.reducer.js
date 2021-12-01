import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import * as actions from '../actions/orders.action'

const INITIAL_STATE = freeze({
  orders: null,
  totalOrderCount: 0,

  ordersByID: null,

  poGoodTypes: null,
  totalTypesCount: 0,

  orderSystems: null,
  totalOrderSystemsCount: 0,

  createOrder: null,

  deletedOrder: null,

  suppliers: [],
  totalSuppliersCount: 0,

  updatedOrder: null,

  stuffTypes: null,
  totalStuffTypes: 0,

  saleProducts: [],

  isLoading: false,
  errorMessage: null,

  deliveryList: [],
  totalDelivery: 0,
  isSuccess: null,

  loadingOrder: false
})

export default handleActions(
  {
    [actions.addSaleProduct]: (state, payload) => {
      return freeze({
        ...state,
        saleProducts: payload.payload
      })
    },

    [actions.fetchOrdersStart]: (state) => {
      return freeze({
        ...state,
        isSuccess: false,
        isLoading: true
      })
    },
    [actions.fetchOrdersSuccess]: (state, actions) => {
      return freeze({
        ...state,
        orders: actions.payload.DataSource,
        totalOrderCount: actions.payload.TotalCount,
        isLoading: false
      })
    },
    [actions.fetchOrdersFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Fetch Order by ID
    [actions.fetchOrderByIDStart]: (state) => {
      return freeze({
        ...state,
        loadingOrder: false,
        isLoading: true
      })
    },
    [actions.fetchOrderByIDSuccess]: (state, actions) => {
      return freeze({
        ...state,
        ordersByID: actions.payload.ResultObj,
        loadingOrder: false,
        isLoading: false
      })
    },
    [actions.fetchOrderByIDFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        loadingOrder: false,
        isLoading: false
      })
    },

    // PO Good types
    [actions.fetchGoodTypesStart]: (state) => {
      return freeze({
        ...state,
        loadingOrder: true,
        isLoading: true
      })
    },
    [actions.fetchGoodTypesSuccess]: (state, actions) => {
      return freeze({
        ...state,
        poGoodTypes: actions.payload.DataSource,
        totalTypesCount: actions.payload.TotalCount,
        loadingOrder: false,
        isLoading: false
      })
    },
    [actions.fetchGoodTypesFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        loadingOrder: false,
        isLoading: false
      })
    },

    // Order-system list
    [actions.fetchOrderSystemListStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchOrderSystemListSuccess]: (state, actions) => {
      return freeze({
        ...state,
        orderSystems: actions.payload.DataSource,
        totalOrderSystemsCount: actions.payload.TotalCount,
        isLoading: false
      })
    },
    [actions.fetchOrderSystemListFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Suppliers by page
    [actions.fetchSupplierByPageStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchSupplierByPageSuccess]: (state, actions) => {
      return freeze({
        ...state,
        suppliers: actions.payload,
        totalSuppliersCount: actions.payload.TotalCount,
        isLoading: false
      })
    },
    [actions.fetchSupplierByPageFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Stuff-types
    [actions.fetchStuffTypesStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true,
        loadingOrder: true
      })
    },
    [actions.fetchStuffTypesSuccess]: (state, actions) => {
      return freeze({
        ...state,
        stuffTypes: actions.payload.DataSource,
        totalStuffTypes: actions.payload.TotalCount,
        loadingOrder: false,
        isLoading: false
      })
    },
    [actions.fetchStuffTypesFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        loadingOrder: false,
        isLoading: false
      })
    },

    // Create order
    [actions.createOrderStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.createOrderSuccess]: (state, actions) => {
      return freeze({
        ...state,
        createOrder: actions.payload.ResultObj,
        isLoading: false
      })
    },
    [actions.createOrderFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Update order
    [actions.updateOrderStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.updateOrderSuccess]: (state, actions) => {
      return freeze({
        ...state,
        updatedOrder: actions.payload,
        isLoading: false
      })
    },
    [actions.updateOrderFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // Delete order
    [actions.deleteOrderStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true,
        isSuccess: false
      })
    },
    [actions.deleteOrderSuccess]: (state, actions) => {
      return freeze({
        ...state,
        deletedOrder: actions.payload,
        isLoading: false
      })
    },
    [actions.deleteOrderFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    // get delivery list
    [actions.getDeliveryList]: (state) => {
      return freeze({
        ...state,
        isLoading: true,
        isSuccess: false
      })
    },
    [actions.getDeliveryListSuccess]: (state, actions) => {
      return freeze({
        ...state,
        deliveryList: actions.payload.DataSource,
        totalDelivery: actions.payload.TotalCount,
        isLoading: false
      })
    },
    [actions.getDeliveryListFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    //create delivery ticket
    [actions.createDelivery]: (state) => {
      return freeze({
        ...state,
        isLoading: true,
        isSuccess: false
      })
    },
    [actions.createDeliverySuccess]: (state) => {
      return freeze({
        ...state,
        isSuccess: true,
        isLoading: false
      })
    },
    [actions.createDeliveryFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false,
        isSuccess: false
      })
    }
  },
  INITIAL_STATE
)
