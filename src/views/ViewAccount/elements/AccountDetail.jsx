import '@assets/css/orders.css'

import CButton from '@components/common/CButton'
import CConfirmModal from '@components/common/CConfirmModal'
import CInput from '@components/common/CInput'
import CModal from '@components/common/CModal'
import CTag from '@components/common/CTag'
import {
  changePassword,
  editAccount,
  fetchAccountByEmail,
  fetchRoleActiveList,
  searchRoleActiveList
} from '@store/thunks/account-management.thunk'
import { fetchSupplierList, searchSupplierList } from '@store/thunks/setting.thunk'
import { Button, Col, Form, Row } from 'antd'
import { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AccountDetail = ({ visible, handleVisible }) => {
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

  const dispatch = useDispatch()
  const { account, rolesActive, addLoading, accountByEmail } = useSelector((state) => state['accountManagement'])
  const [form] = Form.useForm()
  const [roleList, setRoleList] = useState([])
  const [isChangePass, setIsChangePass] = useState(false)
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const { suppliers } = useSelector((state) => state['settings'])
  const [supplierList, setSupplierList] = useState([])
  const [suppliersId, setSuppliersId] = useState(null)
  const [restaurantId, setRestaurantId] = useState(null)
  const [appRoleId, setAppRoleId] = useState(null)
  const [appRole, setAppRole] = useState({})

  const btn = createRef()
  const [isChangeStatus, setIsChangeStatus] = useState(false)

  const [canChangePass, setCanChangePass] = useState(true)

  const [selectedStatus, setSelectedStatus] = useState(account?.Status)

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [accByEmail, setAccByEmail] = useState([])

  useEffect(() => {
    if (appRoleId) {
      const role = roleList.find((r) => r.Id === appRoleId)
      if (role?.Id) setAppRole(role)
    }
  }, [appRoleId])

  useEffect(() => {
    setSupplierList(suppliers.filter((r) => r.Id !== account?.SuppliersId))
  }, [suppliers])

  useEffect(() => {
    if (account !== null) {
      form.setFieldsValue(account)
      setCanChangePass(!!account.IdSSo)
      dispatch(fetchAccountByEmail({ email: account.Email.slice(0, account.Email.length - 2), take: 20 }))
      let roleType = '0,1,2'
      switch (account?.TypeAccount) {
      case 1:
        roleType = 1
        break
      case 2:
        roleType = 2
        break

      default:
        roleType = '0,2'
        break
      }
      dispatch(fetchRoleActiveList({ take: -1, roleType }))
      setSuppliersId(account?.SuppliersId)
      setRestaurantId(account.PlantName)
      setAppRoleId(account?.AppRoleId)
    }
  }, [account])

  useEffect(async () => {
    setRoleList(rolesActive)
    if (appRoleId) await setAppRole(roleList.find((r) => r.Id === appRoleId))
  }, [rolesActive])

  useEffect(() => {
    setIsChangePass(false)
    setIsChangeStatus(false)
    if (!suppliers || suppliers?.length === 0) dispatch(fetchSupplierList({ take: 30 }))
  }, [visible])

  useEffect(() => {
    if (accountByEmail?.length === 0) setAccByEmail([])
    setAccByEmail([...accByEmail, ...accountByEmail])
  }, [accountByEmail])

  useEffect(() => {
    if (email?.length > 0) dispatch(fetchAccountByEmail({ email, take: 10 }))
  }, [email])

  const getSuppliers = (value) => {
    return searchSupplierList({ take: 20, codeOrNameSupplier: value })
  }

  const getRoleActiveList = (value) => {
    let roleType = '0,1,2'
    switch (account?.TypeAccount) {
    case 1:
      roleType = 1
      break
    case 2:
      roleType = 2
      break
    default:
      roleType = '0,2'
      break
    }
    return searchRoleActiveList({ take: 20, name: value, roleType })
  }

  const handleEditAccount = async (data) => {
    if (isChangePass) {
      await dispatch(changePassword({ ...data, IdSSo: account?.IdSSo }))
      setIsChangePass(false)
    } else {
      data = { ...account, ...data, AppRoleId: appRoleId }
      if (isChangeStatus) {
        data.StatusName = selectedStatus === 1 ? 'Đang hoạt động' : 'Ngưng hoạt động'
        data.Status = selectedStatus
      }
      if (account?.TypeAccount !== 1) {
        if (appRole.RoleType === 2) {
          data.SuppliersId = suppliersId
        } else {
          data.SuppliersId = null
        }
      }
      await dispatch(editAccount(data))
      handleVisible(false)
    }
  }

  const handleFinishForm = async (data) => {
    handleEditAccount(data)
  }

  const handleExitChangePass = async () => {
    await setIsShowConfirm(false)
    if (isChangePass) setIsChangePass(false)
    else {
      handleVisible(false)
    }
  }

  const isExistingEmail = (value) => {
    if (value) {
      const user = accByEmail?.find((user) => user.Email === value)
      if (user?.Email === value?.trim() && user?.Id !== account?.Id) {
        return true
      }
    }
    return false
  }

  const Footer = (
    <div className="flex">
      {!isChangePass && canChangePass && (
        <div>
          <CButton type="secondary" onClick={() => setIsChangePass(true)}>
            Đổi mật khẩu
          </CButton>
        </div>
      )}
      <div className="justify-end flex w-full">
        <CButton type="secondary" onClick={() => setIsShowConfirm(true)}>
          Thoát
        </CButton>
        <CButton type="primary" onClick={() => btn.current.click()}>
          Lưu
        </CButton>
      </div>
    </div>
  )

  const Status = (
    <div className="flex">
      {isChangeStatus ? (
        <div className="flex mt-2">
          <p className="text-label text-lg mt-1 font-barlow whitespace-nowrap self-center mr-2">Trạng thái: </p>
          <CInput
            placeholder="Chọn trạng thái"
            inputType="Select"
            defaultValue={account?.Status}
            options={statusOptions}
            onChange={(e) => setSelectedStatus(e)}
          />
        </div>
      ) : (
        <>
          <p className="text-label text-lg font-barlow mb-1 whitespace-nowrap self-center mr-2">Trạng thái: </p>
          <CTag title={account?.StatusName} type={account?.Status === 1 ? 'draft' : 'error'}></CTag>
          <Button type="link" className="p-0" onClick={() => setIsChangeStatus(true)}>
            <p className="font-barlow text-base mt-[-2px]">Thay đổi</p>
          </Button>
        </>
      )}
    </div>
  )

  return (
    <CModal
      title={isChangePass ? 'Đổi mật khẩu' : `Chi tiết người dùng: ${account?.FullName || ''}`}
      visible={visible}
      handleVisible={handleVisible}
      w={850}
      footer={Footer}
    >
      <Form form={form} onFinish={handleFinishForm}>
        {!isChangePass ? (
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="UserName">
                <CInput important label="Tên đăng nhập" disabled placeholder="Nhập tên đăng nhập" />
              </Form.Item>
            </Col>
            <Col span={12} className="self-center mt-auto mb-2">
              {Status}
            </Col>
            <Col span={12} className="mt-4">
              <Form.Item name="FullName" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                <CInput important field="fullname" label="Họ tên" placeholder="Nhập tên" inputType="" />
              </Form.Item>
            </Col>
            <Col span={12} className="mt-4">
              <Form.Item name="Address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
                <CInput important label="Địa chỉ" placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
            <Col span={12} className="mt-4">
              <Form.Item
                rules={[
                  { required: true, message: 'Xin nhập Email!' },
                  { type: 'email', message: 'Email chưa đúng định dạng!' },
                  () => ({
                    validator(_, value) {
                      if (isExistingEmail(value)) {
                        return Promise.reject(new Error('Email này đã tồn tại, vui lòng nhâp email khác!'))
                      }

                      return Promise.resolve()
                    }
                  })
                ]}
                name="Email"
              >
                <CInput important label="Email" placeholder="Nhập Email" onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12} className="mt-4">
              <Form.Item
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g, message: 'Số điện thoại chưa đúng định dạng!' }
                ]}
                name="PhoneNumber"
              >
                <CInput important type="number" label="Số điện thoại" placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>

            <Col span={12} className="mt-4">
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
                  name="Chọn nhóm quyền"
                />
              </Form.Item>
            </Col>
            <Col span={12} className="mt-4">
              {account?.TypeAccount !== 1 && appRole?.RoleType === 2 && (
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
                    defaultOptions={[{ Id: account.SuppliersId, Name: account.SupplierName }, ...supplierList]}
                    name="Chọn Phân quyền tài khoản"
                  />
                </Form.Item>
              )}
              {(!account?.TypeAccount || account?.TypeAccount !== 1) && appRole?.RoleType !== 2 && (
                <Form.Item name="SuppliersIds">
                  <CInput
                    important
                    disabled={true}
                    label="Phân quyền tài khoản"
                    placeholder="Chọn Phân quyền tài khoản"
                  />
                </Form.Item>
              )}
              {account?.TypeAccount === 1 && (
                <Form.Item name="PlantName">
                  <CInput
                    important
                    disabled
                    label="Nhà hàng được phân quyền"
                    placeholder="Chọn nhà hàng được phân quyền"
                    value={restaurantId}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
        ) : (
          <Row gutter={20}>
            <Col span={24} className="mb-4">
              <Form.Item name="UserName">
                <CInput important label="Tên đăng nhập" disabled placeholder="Nhập tên đăng nhập" />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                  important
                  onChange={(e) => setPassword(e.target.value)}
                  inputType="Password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                name="ConfirmPassword"
              >
                <CInput
                  onChange={(e) => setConfirmPasword(e.target.value)}
                  inputType="Password"
                  label="Xác nhận mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                  important
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Form.Item className="hidden" name="ConfirmPassword">
          <Button className="hidden" htmlType="submit" ref={btn}>
            edit
          </Button>
        </Form.Item>
      </Form>
      <CConfirmModal
        visible={isShowConfirm}
        onOk={handleExitChangePass}
        handleVisible={() => setIsShowConfirm(!isShowConfirm)}
        loading={addLoading}
      ></CConfirmModal>
    </CModal>
  )
}

export default AccountDetail
