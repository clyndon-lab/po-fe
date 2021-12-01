import { message } from 'antd'

import * as apis from '../../apis/auth.api'
import * as actions from '../actions/auth.action'

export const loginWithHeader = () => {
  return (dispatch) => {
    dispatch(actions.loginWithHeader())

    apis
      .loginWithHeader()
      .then((res) => {
        if (res?.IsSuccessed === true) {
          // message.success('Cập nhật phiếu giao hàng thành công')
          dispatch(actions.loginWithHeaderSuccess(res))
        } else if (res?.IsSuccessed === false) {
          message.error(res.Message)
          dispatch(actions.loginWithHeaderSuccess(res))
          dispatch(actions.loginWithHeaderFail())
        }
      })
      .catch((err) => dispatch(actions.loginWithHeaderFail(err.message)))
  }
}
