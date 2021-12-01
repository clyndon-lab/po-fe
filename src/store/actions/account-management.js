import { createAction } from 'redux-actions'

export const createAccount = createAction('ACCOUNT-MANAGEMENT/CREATE_ACCOUNT')
export const createAccountSuccess = createAction('ACCOUNT-MANAGEMENT/CREATE_ACCOUNT_SUCCESS')
export const createAccountFail = createAction('ACCOUNT-MANAGEMENT/CREATE_ACCOUNT_FAIL')

export const editAccount = createAction('ACCOUNT-MANAGEMENT/EDIT_ACCOUNT')
export const editAccountSuccess = createAction('ACCOUNT-MANAGEMENT/EDIT_ACCOUNT_SUCCESS')
export const editAccountFail = createAction('ACCOUNT-MANAGEMENT/EDIT_ACCOUNT_FAIL')

export const updateStatus = createAction('ACCOUNT-MANAGEMENT/UPDATE_STATUS')
export const updateStatusSuccess = createAction('ACCOUNT-MANAGEMENT/UPDATE_STATUS_SUCCESS')
export const updateStatusFail = createAction('ACCOUNT-MANAGEMENT/UPDATE_STATUS_FAIL')

export const changePassword = createAction('ACCOUNT-MANAGEMENT/CHANGE_PASSWORD')
export const changePasswordSuccess = createAction('ACCOUNT-MANAGEMENT/CHANGE_PASSWORD_SUCCESS')
export const changePasswordFail = createAction('ACCOUNT-MANAGEMENT/CHANGE_PASSWORD_FAIL')

export const fetchRoleList = createAction('ACCOUNT-MANAGEMENT/FETCH_ROLE_LIST')
export const fetchRoleListSuccess = createAction('ACCOUNT-MANAGEMENT/FETCH_ROLE_LIST_SUCCESS')
export const fetchRoleListFail = createAction('ACCOUNT-MANAGEMENT/FETCH_ROLE_LIST_FAIL')

export const fetchAccountList = createAction('ACCOUNT-MANAGEMENT/FETCH_ACCOUNT_LIST')
export const fetchAccountListSuccess = createAction('ACCOUNT-MANAGEMENT/FETCH_ACCOUNT_LIST_SUCCESS')
export const fetchAccountListFail = createAction('ACCOUNT-MANAGEMENT/FETCH_ACCOUNT_LIST_FAIL')

export const fetchAccountByEmail = createAction('ACCOUNT-MANAGEMENT/FETCH_ACCOUNT_BY_EMAIL')
export const fetchAccountByEmailSuccess = createAction('ACCOUNT-MANAGEMENT/FETCH_ACCOUNT_BY_EMAIL_SUCCESS')
export const fetchAccountByEmailFail = createAction('ACCOUNT-MANAGEMENT/FETCH_ACCOUNT_BY_EMAIL_FAIL')

export const fetchAccountByUserName = createAction('ACCOUNT-MANAGEMENT/FETCH_ACCOUNT_BY_USER_NAME')
export const fetchAccountByUserNameSuccess = createAction('ACCOUNT-MANAGEMENT/FETCH_ACCOUNT_BY_USER_NAME_SUCCESS')
export const fetchAccountByUserNameFail = createAction('ACCOUNT-MANAGEMENT/FETCH_ACCOUNT_BY_USER_NAME_FAIL')

export const fetchOneAccount = createAction('ACCOUNT-MANAGEMENT/FETCH_ONE_ACCOUNT')
export const fetchOneAccountSuccess = createAction('ACCOUNT-MANAGEMENT/FETCH_ONE_ACCOUNT_SUCCESS')
export const fetchOneAccountFail = createAction('ACCOUNT-MANAGEMENT/FETCH_ONE_ACCOUNT_FAIL')

export const fetchRoleActiveList = createAction('ACCOUNT-MANAGEMENT/FETCH_ROLE_ACTIVE_LIST')
export const fetchRoleActiveListSuccess = createAction('ACCOUNT-MANAGEMENT/FETCH_ROLE_ACTIVE_LIST_SUCCESS')
export const fetchRoleActiveListFail = createAction('ACCOUNT-MANAGEMENT/FETCH_ROLE_ACTIVE_LIST_FAIL')