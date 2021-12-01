import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import * as actions from '../actions/account-management'

const INITIAL_STATE = freeze({
  roles: null,
  rolesActive: [],
  accountList: [],
  account: null,
  isLoading: false,
  totalAccount: 0,
  errorMessage: null,
  addLoading: false,
  finished: false,
  accountByEmail: [],
  accountByUserName: [],
})

export default handleActions(
  {
    [actions.fetchRoleList]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchRoleListSuccess]: (state, actions) => {
      return freeze({
        ...state,
        roles: actions.payload?.DataSource.map((item) => {
          return {
            value: item.Id,
            name: item.Name
          }
        }),
        isLoading: false
      })
    },
    [actions.fetchRoleListFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.fetchAccountList]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchAccountListSuccess]: (state, actions) => {
      return freeze({
        ...state,
        accountList: actions.payload?.DataSource,
        totalAccount: actions.payload?.TotalCount,
        isLoading: false,
        finished: false
      })
    },
    [actions.fetchAccountListFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.fetchOneAccount]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchOneAccountSuccess]: (state, actions) => {
      return freeze({
        ...state,
        account: actions.payload?.ResultObj,
        isLoading: false
      })
    },
    [actions.fetchOneAccountFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.createAccount]: (state) => {
      return freeze({
        ...state,
        addLoading: true,
        isLoading: true
      })
    },
    [actions.createAccountSuccess]: (state) => {
      return freeze({
        ...state,
        isLoading: false,
        // accountList: [actions.payload?.ResultObj, ...state.accountList],
        addLoading: false,
        finished: true
      })
    },
    [actions.createAccountFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        addLoading: false,
        isLoading: false,
        finished: true
      })
    },
    [actions.editAccount]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.editAccountSuccess]: (state, actions) => {
      return freeze({
        ...state,
        account: actions.payload,
        accountList: state.accountList.map((item) => {
          if (item.Id === actions.payload.Id) {
            return actions.payload
          } else return item
        }),
        isLoading: false
      })
    },
    [actions.editAccountFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.changePassword]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.changePasswordSuccess]: (state) => {
      return freeze({
        ...state,
        // account: actions.payload?.ResultObj,
        isLoading: false
      })
    },
    [actions.changePasswordFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.fetchRoleActiveList]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchRoleActiveListSuccess]: (state, actions) => {
      return freeze({
        ...state,
        rolesActive: actions.payload?.DataSource,
        isLoading: false
      })
    },
    [actions.fetchRoleActiveListFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.fetchAccountByEmail]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchAccountByEmailSuccess]: (state, actions) => {
      return freeze({
        ...state,
        accountByEmail: actions.payload?.DataSource,
        isLoading: false
      })
    },
    [actions.fetchAccountByEmailFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
    [actions.fetchAccountByUserName]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.fetchAccountByUserNameSuccess]: (state, actions) => {
      return freeze({
        ...state,
        accountByUserName: actions.payload?.DataSource,
        isLoading: false
      })
    },
    [actions.fetchAccountByUserNameFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
  },
  INITIAL_STATE
)
