import '@assets/css/orders.css'

import CButton from '@components/common/CButton'
import CConfirmModal from '@components/common/CConfirmModal'
import CInput from '@components/common/CInput'
import CModal from '@components/common/CModal'
import {
  createAccount,
  fetchAccountByEmail,
  fetchAccountByUserName,
  fetchRoleActiveList,
  searchRoleActiveList
} from '@store/thunks/account-management.thunk'
import { fetchSupplierList, searchSupplierList } from '@store/thunks/setting.thunk'
import { Button, Col, Form, Row } from 'antd'
import { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const statusOptions = [
  {
    Name: 'Đang hoạt động',
    Code: 1
  },
  {
    Name: 'Ngưng hoạt động',
    Code: 0
  }
]

const AccountForm = ({ visible, handleVisible }) => {
  const dispatch = useDispatch()
  const { rolesActive, addLoading, accountByUserName, accountByEmail } = useSelector(
    (state) => state['accountManagement']
  )
  const { suppliers } = useSelector((state) => state['settings'])
  const [roleList, setRoleList] = useState([])
  const [form] = Form.useForm()
  const btn = createRef()
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState(false)
  const [accByEmail, setAccByEmail] = useState([])
  const [accByUserName, setAccByUserName] = useState([])
  const [suppliersId, setSuppliersId] = useState(null)
  const [appRoleId, setAppRoleId] = useState(null)
  const [appRole, setAppRole] = useState({})

  const [password, setPassword] = useState('')

  useEffect(() => {
    setRoleList(rolesActive)
  }, [rolesActive])

  useEffect(() => {
    dispatch(fetchRoleActiveList({ roleStatus: 1, take: 20, roleType: '0,2' }))
    if (!suppliers || suppliers?.length === 0) dispatch(fetchSupplierList({ take: 30 }))
    form.resetFields()
  }, [visible])

  useEffect(() => {
    if (accountByEmail?.length === 0) setAccByEmail([])
    setAccByEmail([...accByEmail, ...accountByEmail])
  }, [accountByEmail])

  useEffect(() => {
    setAccByUserName([...accByUserName, ...accountByUserName])
  }, [accountByUserName])

  useEffect(() => {
    if (email?.length > 0) dispatch(fetchAccountByEmail({ email, take: 10 }))
  }, [email])

  useEffect(() => {
    if (userName?.length > 0) dispatch(fetchAccountByUserName({ userName, take: 10 }))
  }, [userName])

  useEffect(() => {
    setAppRole(roleList.find((r) => r.Id === appRoleId))
  }, [appRoleId])

  const handleFinish = async (data) => {
    handleCreateAccount(data)
  }

  const handleCreateAccount = async (data) => {
    if (data !== null) {
      data = { ...data, AppRoleId: appRoleId }
      if (appRole?.RoleType === 2) {
        data.suppliersId = suppliersId
      }
      await dispatch(createAccount(data))
      await setIsShowConfirm(false)
      await handleVisible(false)
    }
  }

  const getSuppliers = (value) => {
    return searchSupplierList({ take: 20, codeOrNameSupplier: value })
  }

  const getRoleActiveList = (value) => {
    return searchRoleActiveList({ take: 20, name: value, roleType: '0,2' })
  }

  const handleCancel = async () => {
    await setIsShowConfirm(false)
    handleVisible(false)
  }

  const isExistingEmail = (value) => {
    if (value) {
      const user = accByEmail?.find((user) => user.Email === value)
      if (user?.Email === value?.trim()) {
        return true
      }
    }
    return false
  }

  const isExistingUserName = (value) => {
    if (value) {
      const user = accByUserName?.find((user) => user.UserName === value)
      if (user?.UserName === value?.trim()) {
        return true
      }
    }
    return false
  }

  const Footer = (
    <div>
      <CButton type="secondary" onClick={() => setIsShowConfirm(true)}>
        Thoát
      </CButton>
      <CButton type="primary" onClick={() => btn.current.click()}>
        Lưu
      </CButton>
    </div>
  )

  return (
    <CModal
      w={850}
      footer={Footer}
      title="Thêm mới người dùng"
      visible={visible}
      handleVisible={() => handleVisible(!visible)}
    >
      <div>
        <Form onFinish={(e) => handleFinish(e)} form={form}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item rules={[{ required: true, message: 'Xin nhập Họ tên!' }]} name="FullName">
                <CInput important label="Họ tên" placeholder="Nhập tên" inputType="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  { required: true, message: 'Xin nhập Email!' },
                  { type: 'email', message: 'Email chưa đúng định dạng!' },
                  () => ({
                    validator(_, value) {
                      if (isExistingEmail(value?.toLowerCase())) {
                        return Promise.reject(new Error('Email này đã tồn tại, vui lòng nhâp email khác!'))
                      }

                      return Promise.resolve()
                    }
                  })
                ]}
                name="Email"
              >
                <CInput
                  important
                  label="Email"
                  placeholder="Nhập Email"
                  onChange={(e) => {
                    setEmail(e.target.value?.toLowerCase())
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="mt-6">
              <Form.Item
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  {
                    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    message: 'Số điện thoại chưa đúng định dạng!'
                  }
                ]}
                name="PhoneNumber"
              >
                <CInput important type="number" label="Số điện thoại" placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12} className="mt-6">
              <Form.Item rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]} name="Address">
                <CInput important label="Địa chỉ" placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
            <Col span={12} className="mt-6">
              <Form.Item
                rules={[
                  {
                    pattern: new RegExp('^[a-zA-Z0-9_.-]*$'),
                    message: 'Vui lòng nhập kí tự không dấu và không chứa dấu cách!'
                  },
                  { required: true, message: 'Xin nhập tên đăng nhập!' },
                  () => ({
                    validator(_, value) {
                      if (isExistingUserName(value)) {
                        return Promise.reject(
                          new Error('Tên đăng nhập này đã tồn tại, vui lòng nhập tên đăng nhập khác!')
                        )
                      }
                      return Promise.resolve()
                    }
                  })
                ]}
                name="UserName"
              >
                <CInput
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col span={12} className="mt-6 h-[52px]">
              <Form.Item rules={[{ required: true, message: 'Xin chọn trạng thái tài khoản!' }]} name="Status">
                <CInput
                  important
                  label="Trạng thái"
                  placeholder="Chọn trạng thái"
                  inputType="Select"
                  options={statusOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="mt-6">
              <Form.Item rules={[{ required: true, message: 'Xin chọn Nhóm quyền!' }]} name="AppRoleId">
                <CInput
                  label="Nhóm quyền"
                  placeholder="Chọn nhóm quyền"
                  inputType="CDebounceSelect"
                  filterOption={false}
                  fetchOptions={getRoleActiveList}
                  value={appRoleId}
                  onChange={(newValue) => setAppRoleId(newValue)}
                  debounceTimeout="1000"
                  defaultOptions={roleList}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="mt-6">
              {(!appRole || appRole?.RoleType === 2) && (
                <Form.Item rules={[{ required: true, message: 'Xin chọn phân quyền tài khoản!' }]} name="SuppliersId">
                  <CInput
                    important
                    label="Nhà cung cấp được phân quyền"
                    placeholder="Chọn nhà cung cấp được phân quyền"
                    inputType="CDebounceSelect"
                    filterOption={false}
                    fetchOptions={getSuppliers}
                    value={suppliersId}
                    onChange={(newValue) => {
                      setSuppliersId(newValue)
                    }}
                    debounceTimeout="1000"
                    defaultOptions={suppliers}
                  />
                </Form.Item>
              )}
              {appRole?.RoleType === 0 && (
                <Form.Item name="SuppliersId">
                  <CInput
                    important
                    disabled={true}
                    label="Phân quyền tài khoản"
                    placeholder="Chọn Phân quyền tài khoản"
                  />
                </Form.Item>
              )}
            </Col>

            <Col span={12} className="mt-6">
              <Form.Item
                rules={[
                  { required: true, message: 'Xin nhập mật khẩu!' },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    /*eslint-disable */
                    message:
                      'Vui lòng nhập mật khẩu ít nhất 8 ký tự không dấu, trong đó có ít nhất 1 ký tự thường, 1 ký tự hoa, 1 ký tự số và 1 ký tự đặc biệt'
                  }
                ]}
                name="Password"
              >
                <CInput
                  onChange={(e) => setPassword(e.target.value)}
                  label="Mật khẩu"
                  inputType="Password"
                  placeholder="Nhập mật khẩu"
                  important
                />
              </Form.Item>
            </Col>
            <Col span={12} className="mt-6">
              <Form.Item
                rules={[
                  { required: true, message: 'Xin nhập mật khẩu xác nhận!' },
                  () => ({
                    validator(_, value) {
                      if (value && password !== value) {
                        return Promise.reject(new Error('Mật khẩu xác nhận không trùng khớp!'))
                      }

                      return Promise.resolve()
                    }
                  })
                ]}
                name="PasswordConfirm"
              >
                <CInput
                  inputType="Password"
                  type="password"
                  label="Xác nhận mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                  important
                />
              </Form.Item>
            </Col>
            <Form.Item>
              <Button loading={addLoading} ref={btn} htmlType="submit" className="hidden">
                Thêm
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <CConfirmModal
        visible={isShowConfirm}
        onOk={handleCancel}
        handleVisible={() => setIsShowConfirm(!isShowConfirm)}
        loading={addLoading}
      ></CConfirmModal>
    </CModal>
  )
}

export default AccountForm
