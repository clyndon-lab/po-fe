import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import accountManagementReducer from './account-management.reducer'
import authReducer from './auth.reducer'
import comboReducer from './combo.reducer'
import complaintsReducer from './complaint.reducer'
import deliveries from './delivery.reducer'
import homeReducer from './home.reducer'
import ordersReducer from './orders.reducer'
import postReducer from './posts.reducer'
import settingReducer from './setting.reducer'

export const staticReducers = {
  posts: postReducer,
  accountManagement: accountManagementReducer,
  settings: settingReducer,
  orders: ordersReducer,
  home: homeReducer,
  complaint: complaintsReducer,
  combo: comboReducer,
  deliveries: deliveries,
  auths: authReducer
}

export default (history) =>
  combineReducers({
    ...staticReducers,
    router: connectRouter(history),
  })