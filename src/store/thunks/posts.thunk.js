import { getPost } from '../../apis/posts'
import { fetchPostsFailure, fetchPostsStart, fetchPostsSuccess } from '../actions/posts.action'

export const fetchPost = () => {
  return dispatch => {
    dispatch(fetchPostsStart())

    getPost().then(res => {
      console.log('RESPONSE', res.data)
      dispatch(fetchPostsSuccess(res))
    }).catch(err => dispatch(fetchPostsFailure(err.message)))
  }
}