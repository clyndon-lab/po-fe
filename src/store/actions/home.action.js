import { createAction } from 'redux-actions'

export const fetchOrderList = createAction('HOMEPAGE/FETCH_ORDER_LIST')
export const fetchOrderListSuccess = createAction('HOMEPAGE/FETCH_ORDER_LIST_SUCCESS')
export const fetchOrderListFail = createAction('HOMEPAGE/FETCH_ORDER_LIST_FAIL')

export const fetchReturnGood = createAction('HOMEPAGE/FETCH_RETURN_GOOD')
export const fetchReturnGoodSuccess = createAction('HOMEPAGE/FETCH_RETURN_GOOD_SUCCESS')
export const fetchReturnGoodFail = createAction('HOMEPAGE/FETCH_RETURN_GOOD_FAIL')

export const fetchDeliveryList = createAction('HOMEPAGE/FETCH_DELIVERY_LIST')
export const fetchDeliveryListSuccess = createAction('HOMEPAGE/FETCH_DELIVERY_LIST_SUCCESS')
export const fetchDeliveryListFail = createAction('HOMEPAGE/FETCH_DELIVERY_LIST_FAIL')

export const fetchAmountOrder = createAction('HOMEPAGE/FETCH_AMOUNT_ORDER')
export const fetchAmountOrderSuccess = createAction('HOMEPAGE/FETCH_AMOUNT_ORDER_SUCCESS')
export const fetchAmountOrderFail = createAction('HOMEPAGE/FETCH_AMOUNT_ORDER_FAIL')

export const fetchAmountReturn = createAction('HOMEPAGE/FETCH_AMOUNT_RETURN')
export const fetchAmountReturnSuccess = createAction('HOMEPAGE/FETCH_AMOUNT_RETURN_SUCCESS')
export const fetchAmountReturnFail = createAction('HOMEPAGE/FETCH_AMOUNT_RETURN_FAIL')

export const fetchAmountDelivery = createAction('HOMEPAGE/FETCH_AMOUNT_DELIVERY')
export const fetchAmountDeliverySuccess = createAction('HOMEPAGE/FETCH_AMOUNT_DELIVERY_SUCCESS')
export const fetchAmountDeliveryFail = createAction('HOMEPAGE/FETCH_AMOUNT_DELIVERY_FAIL')
