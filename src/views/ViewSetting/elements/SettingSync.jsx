import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CModal from '@components/common/CModal'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import ViewWrapper from '@components/common/ViewWrapper'
import { getListCategories, postSyncData } from '@store/thunks/setting.thunk'
import { Button,Form } from 'antd'
import { createRef,useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'

const SettingSync = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [syncOption, setSyncOption] = useState('all')
  // const [defaultCategory, setDefaultCategory] = useState('1')
  // const [defaultVaiable, setDefaultVaiable] = useState('1')
  const { categories, isLoading } = useSelector((state) => state['settings'])
  const [categoriesOptions, setCategoriesOptions] = useState([])
  const [form] = Form.useForm()
  const btn = createRef()

  const columns = [
    {
      title: 'STT',
      dataIndex: 'Id',
      align: 'center',
      key: 'Id',
      width: '50px'
    },
    {
      title: 'Tên loại danh mục',
      dataIndex: 'Name',
      width: '500px',
      key: 'Name'
    },
    // {
    //   title: 'Số lượng',
    //   dataIndex: 'quantity',
    //   width: '100px',
    //   key: 'quantity'
    // },
    {
      title: 'Ngày đồng bộ cuối cùng',
      dataIndex: 'SyncSuccessLastupdated',
      width: '260px',
      key: 'SyncSuccessLastupdated'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      width: '170px',
      key: 'Status',
      render: () => <CTag type={'draft'} />
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  const radioData = [
    {
      label: 'Đồng bộ tất cả',
      value: 'all'
    },
    {
      label: 'Đồng bộ theo danh mục',
      value: 'one'
    }
  ]

  const variables = [
    {
      Name: 'Tham số 1',
      Code: '1'
    },
    {
      Name: 'Tham số 2',
      Code: '2'
    },
    {
      Name: 'Tham số 3',
      Code: '3'
    }
  ]

  const onChangeSyncOption = (e) => {
    setSyncOption(e)
    // console.log(e)
  }

  const handleFinish = async (e) => {
    dispatch(postSyncData({...e, fromDate: new Date()}))
  }

  useEffect(() => {
    dispatch(getListCategories())
  }, [])

  useEffect(() => {
    setCategoriesOptions(
      categories?.map((item) => {
        return {
          Name: item.Name,
          Code: item.Code
        }
      })
    )
  }, [categories])

  // const onChangeCategory = (e) =>{
  //   setDefaultCategory(e.target.value)
  // }

  // const onChangeVariable = (e) =>{
  //   setDefaultVaiable(e.target.value)
  // }

  const Footer = (
    <div>
      <CButton type="secondary" onClick={() => setVisible(false)}>
        Thoát
      </CButton>
      <CButton loading={isLoading} type="primary" onClick={() => btn.current.click()}>
        Đồng bộ
      </CButton>
    </div>
  )

  return (
    <ViewWrapper title="Đồng bộ danh mục">
      <Card>
        <CardHeader title="Thông tin danh mục đồng bộ"></CardHeader>
        <div className="pl-9 pr-9 pb-9">
          <CTable
            pagination={false}
            rowSelection={{
              ...rowSelection
            }}
            columns={columns}
            dataSource={categories}
          />
          <div className="text-right mt-6">
            <CButton h={32} type="primary" onClick={() => setVisible(true)}>
              Đồng bộ
            </CButton>
          </div>
        </div>
      </Card>
      <CModal footer={Footer} title="Đồng bộ danh mục" visible={visible} handleVisible={() => setVisible(!visible)}>
        <Form form={form} onFinish={(e) => handleFinish(e)}>
          <CInput
            inputType="RadioGroup"
            options={radioData}
            defaultValue={syncOption}
            direction="vertical"
            onChange={(e) => onChangeSyncOption(e.target.value)}
          />
          <Form.Item name="codes">
            <CInput
              label="Chọn danh mục:"
              important
              inputType="Select"
              placeholder="Chọn danh mục cần đồng bộ"
              options={categoriesOptions}
              onChange={(e) => console.log(e)}
              disabled={syncOption === 'all'}
            />
          </Form.Item>
          <Form.Item name="fromDate">
            <CInput
              label="Chọn tham số:"
              important
              inputType="Select"
              placeholder="Chọn tham số cần đồng bộ"
              options={variables}
              onChange={(e) => console.log(e)}
              disabled={syncOption === 'all'}
            />
          </Form.Item>
          <Form.Item>
            <CInput label="Tìm giá trị tham số:" placeholder="Tìm tham số" disabled={syncOption === 'all'} />
          </Form.Item>
          <Form.Item>
            <Button ref={btn} htmlType="submit" className="hidden">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </CModal>
    </ViewWrapper>
  )
}

export default SettingSync
