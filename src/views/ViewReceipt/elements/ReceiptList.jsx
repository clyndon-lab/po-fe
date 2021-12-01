import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CTag from '@components/common/CTag'
import { Table } from 'antd'
import { useHistory } from 'react-router-dom'

const ReceiptList = () => {
  const history = useHistory()

  const columns = [
    {
      title: 'Mã phiếu giao',
      dataIndex: 'key',
      key: 'name',
      width: '150px',
      render: (text) => {
        return (
          <p className="cursor-pointer" onClick={() => history.push(`/receipt/detail/${text}`)}>
            {text}
          </p>
        )
      }
    },
    {
      title: () => <p className="max-w-[90px]">Mã phiếu đặt hàng</p>,
      dataIndex: 'key',
      key: 'name',
      width: '150px'
    },
    {
      title: 'Nhà hàng',
      dataIndex: 'restaurant',
      width: '490px',
      key: 'restaurant'
    },
    {
      title: 'NCC/Đơn vị cung ứng nội bộ',
      dataIndex: 'address',
      width: '490px',
      key: 'address'
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      width: '120px',
      key: 'createdAt'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <CTag type={text} />
    },
    {
      title: 'Trạng thái đồng bộ',
      dataIndex: 'syncStatus',
      key: 'syncStatus',
      render: (text) => <CTag type={text} />
    }
  ]

  const data = [
    {
      key: '10003383',
      name: '10003383',
      restaurant: 'Kichi Kichi Lạc Long Quân',
      createdAt: '28/07/2021',
      requestDeliveryDate: '28/07/2021',
      address: 'HKD Hoàng Thiên Ý - Hoàng Thị Thu T (0908805875) ',
      status: 'draft',
      syncStatus: 'pendingSync'
    },
    {
      key: '10003384',
      createdAt: '28/07/2021',
      name: '10003383',
      restaurant: 'Kichi Kichi Lạc Long Quân',
      address: 'HKD Hoàng Thiên Ý - Hoàng Thị Thu T (0908805875) ',
      requestDeliveryDate: '28/07/2021',
      status: 'new',
      syncStatus: 'pendingSync'
    },
    {
      key: '10003385',
      createdAt: '28/07/2021',
      name: '10003383',
      restaurant: 'Kichi Kichi Lạc Long Quân',
      address: 'HKD Hoàng Thiên Ý - Hoàng Thị Thu T (0908805875) ',
      requestDeliveryDate: '28/07/2021',
      status: 'complete',
      syncStatus: 'synced'
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

  return (
    <Card>
      <CardHeader title="Danh sách phiếu yêu cầu"></CardHeader>
      <div className="pl-9 pr-9 order-table">
        <Table
          rowSelection={{
            ...rowSelection
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </Card>
  )
}

export default ReceiptList
