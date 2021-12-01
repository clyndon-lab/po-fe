import { createAction } from 'redux-actions'

import PostsActionTypes from '../actionTypes/posts.type'

export const fetchPostsStart = createAction(PostsActionTypes.FETCH_POST_START)

export const fetchPostsSuccess = createAction(PostsActionTypes.FETCH_POST_SUCCESS)

export const fetchPostsFailure = createAction(PostsActionTypes.FETCH_POST_FAILURE)