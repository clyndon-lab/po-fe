import { message } from 'antd'

import * as apis from '../../apis/account-management.api'
import * as actions from '../actions/account-management'

export const createAccount = (payload) => {
  return (dispatch) => {
    dispatch(actions.createAccount())

    apis
      .createAccount(payload)
      .then((res) => {
        if (!res?.IsSuccessed) {
          dispatch(actions.createAccountFail())
          message.error('Tạo tài khoản thất bại')
        } else {
          dispatch(actions.createAccountSuccess(payload))
          message.success('Tạo tài khoản thành công')
        }
      })
      .catch((err) => {
        dispatch(actions.createAccountFail(err.message))
        message.error('Tạo tài khoản thất bại ' + err.message)
      })
  }
}

export const editAccount = (payload) => {
  return (dispatch) => {
    dispatch(actions.editAccount())

    apis
      .editAccount(payload)
      .then((res) => {
        if (!res?.IsSuccessed) {
          dispatch(actions.editAccountFail())
          message.error('Cập nhật tài khoản thất bại')
        } else {
          message.success('Cập nhật tài khoản thành công')
          dispatch(actions.editAccountSuccess(payload))
        }
      })
      .catch((err) => {
        dispatch(actions.editAccountFail(err.message))
        message.success('Cập nhật tài khoản thất bại')
      })
  }
}

export const updateStatus = (payload) => {
  return (dispatch) => {
    dispatch(actions.updateStatus())

    apis
      .updateStatus(payload)
      .then((res) => {
        if (!res?.IsSuccessed) {
          dispatch(actions.updateStatusFail())
          message.error('Cập nhật trạng thái tài khoản thất bại')
        } else {
          message.success('Cập nhật trạng thái tài khoản thành công')
          dispatch(actions.updateStatusSuccess(payload))
        }
      })
      .catch((err) => {
        dispatch(actions.updateStatusFail(err.message))
        message.success('Cập nhật trạng thái tài khoản thất bại')
      })
  }
}

export const changePassword = (id) => {
  return (dispatch) => {
    dispatch(actions.changePassword())

    apis
      .changePassword(id)
      .then((res) => {
        if (!res?.IsSuccessed) {
          dispatch(actions.changePasswordFail())
          message.error('Đổi mật khẩu tài khoản thất bại')
        } else {
          dispatch(actions.changePasswordSuccess())
          message.success('Đổi mật khẩu tài khoản thành công')
        }
      })
      .catch((err) => {
        dispatch(actions.changePasswordFail(err.message))
        message.error('Đổi mật khẩu tài khoản thất bại ' + err.message)
      })
  }
}

export const fetchRoleList = () => {
  return (dispatch) => {
    dispatch(actions.fetchRoleList())

    apis
      .getRoleList()
      .then((res) => {
        dispatch(actions.fetchRoleListSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchRoleListFail(err.message)))
  }
}

export const getAccountList = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchAccountList())

    apis
      .getAccounts(query)
      .then((res) => {
        dispatch(actions.fetchAccountListSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchAccountListFail(err.message)))
  }
}

export const getOne = (id) => {
  return (dispatch) => {
    dispatch(actions.fetchOneAccount())

    apis
      .getOneAccount(id)
      .then((res) => {
        dispatch(actions.fetchOneAccountSuccess(res))
      })
      .catch((err) => {
        dispatch(actions.fetchOneAccountFail(err.message))
      })
  }
}

export const fetchRoleActiveList = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchRoleActiveList())

    apis
      .getRoleActiveList(query)
      .then((res) => {
        dispatch(actions.fetchRoleActiveListSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchRoleActiveListFail(err.message)))
  }
}

export const searchRoleActiveList = (query) => {
  return apis.getRoleActiveList(query)

}

export const fetchAccountByEmail = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchAccountByEmail())

    apis
      .getAccounts(query)
      .then((res) => {
        dispatch(actions.fetchAccountByEmailSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchAccountByEmailFail(err.message)))
  }
}

export const fetchAccountByUserName = (query) => {
  return (dispatch) => {
    dispatch(actions.fetchAccountByUserName())

    apis
      .getAccounts(query)
      .then((res) => {
        dispatch(actions.fetchAccountByUserNameSuccess(res))
      })
      .catch((err) => dispatch(actions.fetchAccountByUserNameFail(err.message)))
  }
}