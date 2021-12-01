import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import * as actions from '../actions/auth.action'

const INITIAL_STATE = freeze({
  account: null,
  isLoading: null
})

export default handleActions(
  {
    [actions.loginWithHeader]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.loginWithHeaderSuccess]: (state, actions) => {
      return freeze({
        ...state,
        account: actions.payload.ResultObj,
        isLoading: false
      })
    },
    [actions.loginWithHeaderFail]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
  },
  INITIAL_STATE
)
