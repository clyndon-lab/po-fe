import { EditOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CModal from '@components/common/CModal'
import CTable from '@components/common/CTable'
import ViewWrapper from '@components/common/ViewWrapper'
import { getSpecificMaterialList } from '@store/thunks/combo.thunk'
import { fetchOrderSystems,fetchPOGoodTypes } from '@store/thunks/orders.thunk'
import {
  delProcessingSystemConfig,
  getAccountType,
  getConfigProcessSystem,
  postProcessingSystemConfig
} from '@store/thunks/setting.thunk'
import { Button, Form } from 'antd'
import { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const nccOptions = [
  {
    label: 'Nhà cung cấp',
    value: 0
  },
  {
    label: 'Bộ phận cung ứng nội bộ',
    value: 1
  }
]

const SettingSystem = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const btn = createRef()
  const { processSystemConfigList, accountType, isLoading } = useSelector((state) => state['settings'])
  const { poGoodTypes, orderSystems } = useSelector((state) => state['orders'])

  const [visible, setVisible] = useState(false)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [updateId, setUpdateId] = useState({
    Id: null,
    SystemOrderId: null
  })
  const [newDataConfig, setNewDataConfig] = useState({
    Id: 0,
    AppRoleId: 0,
    GoodsTypeId: 0,
    SystemOrderId: 0,
    SupplyType: 0
  })

  useEffect(() => {
    dispatch(getConfigProcessSystem({ skip: 1, take: 100 }))
    dispatch(getAccountType({ skip: 1, take: 100 }))
    dispatch(fetchPOGoodTypes())
    dispatch(fetchOrderSystems())
  }, [])

  // Double check with BE what should include in SystemOrderId when creating new one
  //   useEffect(() => {
  //     const maxNum = Math.max.apply(Math, processSystemConfigList.map((item) => item.SystemOrderId))
  //     setNewDataConfig({...newDataConfig, SystemOrderId: maxNum+1 })
  //   }, [processSystemConfigList])

  useEffect(() => form.resetFields(), [isAddingNew])

  const onValuesChangeForm = (value) => {
    console.log(value)
    setNewDataConfig(
      isAddingNew
        ? { ...newDataConfig, ...value }
        : { ...newDataConfig, ...value, Id: updateId.Id, SystemOrderId: updateId.SystemOrderId }
    )
    console.log('newDataConfig', newDataConfig)
  }

  const handleFinish = () => {
    console.log(newDataConfig)
    dispatch(postProcessingSystemConfig(newDataConfig))
  }

  const handleOpenUpdateModal = (record) => {
    dispatch(
      getSpecificMaterialList({ groupCode: '1010101', suppliersId: '' })
    )
    setIsAddingNew(false)
    setVisible(!visible)
    setUpdateId({ ...updateId, SystemOrderId: record.SystemOrderId, Id: record.Id })
    console.log(record)
    
  }

  const handleDelete = () => {
    console.log('delete')
    dispatch(delProcessingSystemConfig({ Id: updateId.Id }))
  }

  const handleOpenCreateNewModal = () => {
    setVisible(!visible)
    setIsAddingNew(true)
  }

  const plantTableColumns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      // eslint-disable-next-line
      render: (text, record, index) => <a>{index + 1}</a>
    },
    {
      title: 'Mã cấu hình',
      dataIndex: 'SystemOrderId'
    },
    {
      title: 'Hệ thống',
      dataIndex: 'SystemOrderName',
      render: (text, record) => <a onClick={() => handleOpenUpdateModal(record)}>{text}</a>
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'AppRoleName'
    },
    {
      title: 'Phân loại hàng hóa',
      dataIndex: 'GoodsTypeName'
    },
    {
      title: 'Đơn vị cung cấp',
      dataIndex: 'SupplyTypeName'
    }
  ]

  const ToolBar = (
    <CButton h={32} icon={<EditOutlined />} onClick={handleOpenCreateNewModal}>
      Tạo Mới
    </CButton>
  )

  const Footer = (
    <div className="flex">
      {!isAddingNew && (
        <div className="justify-start">
          <CButton type="danger" onClick={handleDelete}>
            Xóa
          </CButton>
        </div>
      )}
      <div className="justify-end flex w-full">
        <CButton type="secondary" onClick={() => setVisible(!visible)}>
          Thoát
        </CButton>
        <CButton type="primary" onClick={() => btn.current.click()}>
          Lưu
        </CButton>
      </div>
    </div>
  )

  return (
    <ViewWrapper title="Cấu hình hệ thống xử lý" toolBar={ToolBar}>
      <Card>
        <CardHeader title="Danh sách phiếu yêu cầu"></CardHeader>

        <div className="px-9 py-4">
          <CTable columns={plantTableColumns} dataSource={processSystemConfigList} />
        </div>
      </Card>

      <CModal
        title={isAddingNew ? 'Thêm mới cấu hình hệ thống xử lý' : `Điều chỉnh cấu hình: ${updateId.SystemOrderId}`}
        visible={visible}
        handleVisible={() => setVisible(!visible)}
        w={900}
        footer={Footer}
      >
        <Form form={form} onValuesChange={onValuesChangeForm} onFinish={handleFinish}>
          <div className="w-full mx-auto">
            <div className="flex w-full items-center mb-4">
              <p className="mr-4 w-3/12 text-right">Loại tài khoản:</p>
              <div className="w-9/12">
                <Form.Item name="AppRoleId" rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
                  <CInput placeholder="Chọn loại tài khoản" full inputType="PlantsSelect" options={accountType} />
                </Form.Item>
              </div>
            </div>
            <div className="flex w-full items-center mb-4">
              <p className="mr-4 w-3/12 text-right">Phân loại hàng hóa:</p>
              <div className="w-9/12">
                <Form.Item name="GoodsTypeId" rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
                  <CInput
                    placeholder="Chọn loại hàng hóa"
                    full
                    inputType="Select"
                    additionValueType="takeId"
                    options={poGoodTypes}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex w-full items-center mb-4">
              <p className="mr-4 w-3/12 text-right">Phân loại NCC:</p>
              <div className="w-9/12">
                <Form.Item name="SupplyType">
                  <CInput
                    placeholder="Chọn loại hàng hóa"
                    inputType="RadioGroup"
                    options={nccOptions}
                    defaultValue={0}
                  />
                </Form.Item>
              </div>
            </div>
            {isAddingNew && (
              <div className="flex w-full items-center mb-4">
                <p className="mr-4 w-3/12 text-right">Phân loại cấu hình :</p>
                <div className="w-9/12">
                  <Form.Item name="SystemOrderId" rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
                    <CInput
                      placeholder="Chọn loại cấu hình"
                      full
                      inputType="Select"
                      additionValueType="takeId"
                      options={orderSystems}
                    />
                  </Form.Item>
                </div>
              </div>
            )}
            <Form.Item className="hidden">
              <Button loading={isLoading} ref={btn} htmlType="submit">
                Thêm
              </Button>
            </Form.Item>
          </div>
        </Form>
      </CModal>
    </ViewWrapper>
  )
}

export default SettingSystem
