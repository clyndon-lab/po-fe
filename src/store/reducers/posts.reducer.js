import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import * as actions from '../actions/posts.action'

const INITIAL_STATE = freeze({
  posts: null,
  isFetching: false,
  errorMessage: null,
})

export default handleActions(
  {
    [actions.fetchPostsStart]: (state, actions) => {
      console.log(actions)
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: true,
      })
    },
    [actions.fetchPostsSuccess]: (state, actions) => {
      return freeze({
        ...state,
        posts: actions.payload,
        isFetching: false,
      })
    },
    [actions.fetchPostsFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
      })
    },
  },
  INITIAL_STATE
)
