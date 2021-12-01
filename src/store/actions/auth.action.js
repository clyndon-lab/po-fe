import { createAction } from 'redux-actions'

export const loginWithHeader = createAction('AUTH/LOGIN_WITH_TOKEN')
export const loginWithHeaderSuccess = createAction('AUTH/LOGIN_WITH_TOKEN_SUCCESS')
export const loginWithHeaderFail = createAction('AUTH/LOGIN_WITH_TOKEN_FAIL')
