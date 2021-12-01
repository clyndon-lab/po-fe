import { createAction } from 'redux-actions'

import DeliveryTypes from '../actionTypes/delivery.type'

export const createDeliveryStart = createAction(DeliveryTypes.CREATE_DELIVERY_START)
export const createDeliverySuccess = createAction(DeliveryTypes.CREATE_DELIVERY_SUCCESS)
export const createDeliveryFailure = createAction(DeliveryTypes.CREATE_DELIVERY_FAILURE)

export const getOneDelivery = createAction('DELIVERY/GET_ONE_DELIVERY')
export const getOneDeliverySuccess = createAction('DELIVERY/GET_ONE_DELIVERY_SUCCESS')
export const getOneDeliveryFailure = createAction('DELIVERY/GET_ONE_DELIVERY_FAIL')

export const updateDelivery = createAction('DELIVERY/UPDATE_DELIVERY')
export const updateDeliverySuccess = createAction('DELIVERY/UPDATE_DELIVERY_SUCCESS')
export const updateDeliveryFailure = createAction('DELIVERY/UPDATE_DELIVERY_FAIL')

export const updateDeliveryStatus = createAction('DELIVERY/UPDATE_DELIVERY_STATUS')
export const updateDeliveryStatusSuccess = createAction('DELIVERY/UPDATE_DELIVERY_STATUS_SUCCESS')
export const updateDeliveryStatusFailure = createAction('DELIVERY/UPDATE_DELIVERY_STATUS_FAIL')
