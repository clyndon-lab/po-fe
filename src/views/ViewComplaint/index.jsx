import { DownloadOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CPagination from '@components/common/CPagination'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import ViewWrapper from '@components/common/ViewWrapper'
import InputGroup from '@components/Layout/InputGroup'
import { getComplaintList } from '@store/thunks/complaints.thunk'
import { Form } from 'antd'
import { useEffect,useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import { dateToISO, isoToStringDate } from '../../utils/core.utils'

const ViewComplaint = () => {
  const { isLoading, complaintList } = useSelector((state) => state['complaint'])
  const dispatch = useDispatch()
  const history = useHistory()

  const [limitList, setLimitList] = useState(10)
  const [CreateReceiptFrom, setCreateReceiptFrom] = useState(null)

  const [searchInfo, setSearchInfo] = useState({
    CreateReceiptTo: '2021-10-27T09:57:49.773Z',
    Take: limitList,
    Skip: 0
  })

  useEffect(() => {
    if (searchInfo.ComplaintCode) dispatch(getComplaintList(searchInfo))
  }, [searchInfo])

  const tableColumns = [
    {
      title: 'Mã khiếu nại',
      dataIndex: 'Code',
      render: (text) => <Link to={`/supplier-review/detail/${text}`}>{text}</Link>
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'OrderCode'
    },
    {
      title: 'Nhóm hàng',
      dataIndex: 'ProductGroup',
      width: '25%'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedDate',
      render: (text) => <p>{isoToStringDate(text)}</p>
    },
    {
      title: 'Nhà hàng',
      dataIndex: 'Restaurant',
      width: '40%'
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'SupplierCode',
      width: '35%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      render: (text) => {text ? <CTag type={text} /> : null}
    }
  ]
  const ToolBar = (
    <div className="flex">
      <CButton h={32} icon={<DownloadOutlined />}>
        Xuất Excel
      </CButton>
      <div className="ml-6">
        <CButton h={32} onClick={() => history.push('/supplier-review/create-complaint')}>
          Thêm mới
        </CButton>
      </div>
    </div>
  )

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name
    })
  }
  
  const handleDatePicker = (dateString) => setCreateReceiptFrom(dateToISO(dateString))

  const onFinish = (values) => setSearchInfo({...searchInfo, ...values, CreateReceiptFrom})

  return (
    <>
      <ViewWrapper title="Danh sách khiếu nại" toolBar={ToolBar}>
        <Form onFinish={onFinish}>
          <InputGroup typeGroup="SearchForm" title="Thông tin tìm kiếm">
            <Form.Item name="ComplaintCode">
              <CInput label="Mã khiếu nại" placeholder="Nhập mã khiếu nại" />
            </Form.Item>
            <Form.Item name="OrderCode">
              <CInput label="Mã đơn hàng" placeholder="Nhập mã đơn hàng" />
            </Form.Item>
            <Form.Item name="DeliveryCode">
              <CInput label="Mã giao hàng" placeholder="Nhập mã giao hàng" />
            </Form.Item>
            <Form.Item name="ProductGroup">
              <CInput
                label="Nhóm hàng"
                inputType="Select"
                placeholder="Chọn nhóm hàng"
                //   options={poGoodTypes}
                //   defaultValue={defaultGoodTypes}
                //   onChange={onChangeGoodTypes}
                //   isLoading={isLoading}
              />
            </Form.Item>
            <Form.Item name="SupplierCode">
              <CInput label="Nhà cung cấp" placeholder="Nhập tên nhà cung cấp" />
            </Form.Item>
            <Form.Item name="RestaurantCode">
              <CInput label="Nhà hàng" placeholder="Nhập tên nhà hàng" />
            </Form.Item>
            <Form.Item name="CreateReceiptFrom">
              <CInput label="Ngày tạo phiếu" important inputType="DatePicker" onChange={handleDatePicker}/>
            </Form.Item>
          </InputGroup>
        </Form>

        <div className="mt-6">
          <Card>
            <CardHeader title="Danh sách phiếu yêu cầu"></CardHeader>
            <div className="pb-9 px-9 order-table">
              <CTable
                rowSelection={{
                  ...rowSelection
                }}
                loading={isLoading}
                columns={tableColumns}
                dataSource={complaintList}
              />
              <CPagination
                current={1}
                limit={10}
                total={100}
                handleChangeLimit={(e) => setLimitList(e)}
                //   handleChangePage={(e) => onChangePage(e)}
              ></CPagination>
            </div>
          </Card>
        </div>
      </ViewWrapper>
    </>
  )
}

export default ViewComplaint
