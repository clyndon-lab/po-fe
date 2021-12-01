import { createAction } from 'redux-actions'

import OrdersActionType from '../actionTypes/orders.type'

export const addSaleProduct = createAction(OrdersActionType.ADD_SALE_PRODUCT)

export const fetchOrdersStart = createAction(OrdersActionType.FETCH_ORDERS_START)
export const fetchOrdersSuccess = createAction(OrdersActionType.FETCH_ORDERS_SUCCESS)
export const fetchOrdersFailure = createAction(OrdersActionType.FETCH_ORDERS_FAILURE)

export const fetchOrderByIDStart = createAction(OrdersActionType.FETCH_ORDER_BY_ID_START)
export const fetchOrderByIDSuccess = createAction(OrdersActionType.FETCH_ORDER_BY_ID_SUCCESS)
export const fetchOrderByIDFailure = createAction(OrdersActionType.FETCH_STUFF_TYPES_FAILURE)

export const fetchGoodTypesStart = createAction(OrdersActionType.FETCH_GOODTYPES_START)
export const fetchGoodTypesSuccess = createAction(OrdersActionType.FETCH_GOODTYPES_SUCCESS)
export const fetchGoodTypesFailure = createAction(OrdersActionType.FETCH_GOODTYPES_FAILURE)

export const fetchOrderSystemListStart = createAction(OrdersActionType.FETCH_ORDERS_SYSTEM_LIST_START)
export const fetchOrderSystemListSuccess = createAction(OrdersActionType.FETCH_ORDERS_SYSTEM_LIST_SUCCESS)
export const fetchOrderSystemListFailure = createAction(OrdersActionType.FETCH_ORDERS_SYSTEM_LIST_FAILURE)

export const fetchSupplierByPageStart = createAction(OrdersActionType.FETCH_SUPPLIERS_BY_PAGE_START)
export const fetchSupplierByPageSuccess = createAction(OrdersActionType.FETCH_SUPPLIERS_BY_PAGE_SUCCESS)
export const fetchSupplierByPageFailure = createAction(OrdersActionType.FETCH_SUPPLIERS_BY_PAGE_FAILURE)

export const fetchStuffTypesStart = createAction(OrdersActionType.FETCH_STUFF_TYPES_START)
export const fetchStuffTypesSuccess = createAction(OrdersActionType.FETCH_STUFF_TYPES_SUCCESS)
export const fetchStuffTypesFailure = createAction(OrdersActionType.FETCH_STUFF_TYPES_FAILURE)

export const createOrderStart = createAction(OrdersActionType.CREATE_ORDER_START)
export const createOrderSuccess = createAction(OrdersActionType.CREATE_ORDER_SUCCESS)
export const createOrderFailure = createAction(OrdersActionType.CREATE_ORDER_FAILURE)

export const updateOrderStart = createAction(OrdersActionType.UPDATE_ORDER_START)
export const updateOrderSuccess = createAction(OrdersActionType.UPDATE_ORDER_SUCCESS)
export const updateOrderFailure = createAction(OrdersActionType.UPDATE_ORDER_FAILURE)

export const deleteOrderStart = createAction(OrdersActionType.DELETE_ORDER_START)
export const deleteOrderSuccess = createAction(OrdersActionType.DELETE_ORDER_SUCCESS)
export const deleteOrderFailure = createAction(OrdersActionType.DELETE_ORDER_FAILURE)

export const getDeliveryList = createAction('ORDER/GET_DELIVERY_LIST')
export const getDeliveryListSuccess = createAction('ORDER/GET_DELIVERY_LIST_SUCCESS')
export const getDeliveryListFailure = createAction('ORDER/GET_DELIVERY_LIST_FAIL')

export const getDetailDelivery = createAction('ORDER/GET_DETAIL_DELIVERY')
export const getDetailDeliverySuccess = createAction('ORDER/GET_DETAIL_DELIVERY_SUCCESS')
export const getDetailDeliveryFailure = createAction('ORDER/GET_DETAIL_DELIVERY_FAIL')

export const createDelivery = createAction('ORDER/CREATE_DELIVERY')
export const createDeliverySuccess = createAction('ORDER/CREATE_DELIVERY_SUCCESS')
export const createDeliveryFailure = createAction('ORDER/CREATE_DELIVERY_FAIL')

export const updateOrderStatus = createAction('ORDER/UPDATE_ORDER_STATUS')
export const updateOrderStatusSuccess = createAction('ORDER/UPDATE_ORDER_STATUS_SUCCESS')
export const updateOrderStatusFail = createAction('ORDER/UPDATE_ORDER_STATUS_FAIL')
