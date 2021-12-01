import { DownloadOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CPagination from '@components/common/CPagination'
import CTable from '@components/common/CTable'
import ViewWrapper from '@components/common/ViewWrapper'
import InputGroup from '@components/Layout/InputGroup'
import { Form } from 'antd'

const ViewReport = () => {
  const tableColumns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      render: (text, record, index) => <p>{index+1}</p>
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'OrderCode'
    },
    {
      title: 'Trạng thái đơn',
      dataIndex: 'ProductGroup',
    },
    {
      title: 'Nhà hàng',
      dataIndex: 'CreatedDate'
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'Restaurant',
    },
    {
      title: 'Mã hàng hóa',
      dataIndex: 'SupplierCode',
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'Status',
    },
    {
      title: 'Hàng khuyến mãi',
      dataIndex: 'Promotion'
    }
  ]
  const onFinish = (values) => {
    console.log('values', values)
  }

  const onValuesFormChange = (value) => {
    console.log('value', value)
  }

  const ToolBar = (
    <CButton h={32} icon={<DownloadOutlined />}>
      Xuất Excel
    </CButton>
  )

  return (
    <ViewWrapper toolBar={ToolBar} title="Tổng hợp công nợ">
      <Form onFinish={onFinish} onValuesChange={onValuesFormChange}>
        <InputGroup typeGroup="SearchForm" title="Thông tin tìm kiếm">
          <Form.Item name="ComplaintCode">
            <CInput label="Mã đơn đặt hàng" placeholder="Nhập mã đơn hàng" />
          </Form.Item>
          <Form.Item name="OrderCode">
            <CInput label="Nhà hàng" placeholder="Chọn nhà hàng" inputType="Select" />
          </Form.Item>
          <Form.Item name="DeliveryCode">
            <CInput label="Nhà cung cấp" placeholder="Nhập tên nhà cung cấp" />
          </Form.Item>
          <Form.Item name="ProductGroup">
            <CInput label="Ngày tạo phiếu" inputType="RangePicker" />
          </Form.Item>
          <Form.Item name="SupplierCode">
            <CInput label="Bộ phận / Nhóm" placeholder="Chọn bộ phận / nhóm" inputType="Select" />
          </Form.Item>
          <Form.Item name="RestaurantCode">
            <CInput label="Loại đơn hàng" placeholder="Chọn loại đơn hàng" inputType="Select" />
          </Form.Item>
          <Form.Item name="CreateReceiptFrom">
            <CInput label="Trạng thái đơn hàng" inputType="Select" />
          </Form.Item>
        </InputGroup>
      </Form>

      <div className="mt-6">
        <Card>
          <CardHeader title="Danh sách phiếu yêu cầu"></CardHeader>
          <div className="pb-9 px-9 order-table">
            <CTable
              // loading={isLoading}
              columns={tableColumns}
              // dataSource={complaintList}
              // scroll={2000}
            />
            <CPagination
              current={1}
              limit={10}
              total={100}
              // handleChangeLimit={(e) => setLimitList(e)}
              //   handleChangePage={(e) => onChangePage(e)}
            ></CPagination>
          </div>
        </Card>
      </div>
    </ViewWrapper>
  )
}

export default ViewReport
