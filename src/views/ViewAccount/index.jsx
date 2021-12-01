import { DownloadOutlined } from '@ant-design/icons'
import CButton from '@components/common/CButton'
import ViewWrapper from '@components/common/ViewWrapper'
import { saveFile } from '@utils/core.utils'
import AccountList from '@views/ViewAccount/elements/AccountList'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import AccountForm from './elements/AccountForm'

const ViewAccount = () => {
  const [visible, setVisible] = useState(false)
  const [roleList, setRoleList] = useState([])
  const { accountList, roles } = useSelector((state) => state['accountManagement'])

  useEffect(() => {
    setRoleList(
      roles?.map((item) => {
        return {
          Name: item?.name,
          Code: item?.value
        }
      })
    )
  }, [roles])

  const onSaveFile = () => {
    const objectToSave = accountList?.map((item) => {
      return {
        ['STT']: item.RowNum,
        ['Tên đăng nhập']: item.UserName,
        ['Email']: item.Email,
        ['Họ tên']: item.FullName,
        ['Điện thoại']: item.PhoneNumber,
        ['Loại tài khoản']: roleList?.find((i) => i?.Code === item?.AppRoleId)?.Name,
        ['Trạng thái']: item.StatusName
      }
    })

    saveFile(objectToSave, 'POUsers')
  }

  const ToolBar = (
    <div className="flex">
      <CButton h={32} icon={<DownloadOutlined />} onClick={onSaveFile} disabled={accountList?.length === 0}>
        Xuất Excel
      </CButton>
      <div className="ml-6">
        <CButton h={32} onClick={() => setVisible(true)}>
          Thêm mới
        </CButton>
      </div>
    </div>
  )

  return (
    <ViewWrapper
      title="Danh sách người dùng"
      subTitle="Toàn bộ người dùng được khai báo trên hệ thống"
      toolBar={ToolBar}
    >
      <AccountList />
      {visible && <AccountForm visible={visible} handleVisible={(e) => setVisible(e)} />}
    </ViewWrapper>
  )
}

export default ViewAccount
