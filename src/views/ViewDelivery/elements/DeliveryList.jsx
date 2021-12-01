import '@assets/css/orders.css'

// import Card from '@components/common/Card'
// import CardHeader from '@components/common/CardHeader'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import { formatBaseDate } from '@utils/core.utils'
import { useHistory } from 'react-router-dom'

const DeliveryList = ({ deliveryList }) => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const history = useHistory()

  const columns = [
    {
      title: 'Mã phiếu giao',
      dataIndex: 'DeliveryCode',
      align: 'center',
      key: 'DeliveryCode',
      width: '150px',
      render: (text, record) => (
        <a
          className="text-blue-text"
          onClick={() => {
            history.push(`/delivery/${record.Id}`)
          }}
        >
          {text}
        </a>
      )
    },
    {
      title: 'Mã phiếu đặt hàng',
      dataIndex: 'OrderId',
      align: 'center',
      key: 'OrderId',
      width: '150px',
      render: (text, record) => (
        <a
          className="text-blue-text"
          onClick={() => {
            history.push(`/order/detail/${record.Id}`)
          }}
        >
          {text}
        </a>
      )
    },
    {
      title: 'Nhà hàng',
      dataIndex: 'PlantName',
      width: '490px',
      key: 'PlantName'
    },
    {
      title: 'NCC/Đơn vị cung ứng nội bộ',
      dataIndex: 'SupplierName',
      width: '490px',
      key: 'SupplierName'
    },
    {
      title: 'Thời gian',
      dataIndex: 'DeliveryTime',
      width: '100px',
      key: 'DeliveryTime',
      render: (text) => formatBaseDate(text)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'POStatusName',
      key: 'POStatusName',
      render: (text, record) => <CTag title={text} type={record.POStatusId === 2 ? 'new' : 'draft'} />
    },
    {
      title: 'Trạng thái đồng bộ',
      dataIndex: 'POStatusName',
      key: 'POStatusName',
      render: () => <CTag type={'pendingSync'} />
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
    <div className="pb-2 px-9 order-table">
      <CTable
        rowSelection={{
          ...rowSelection
        }}
        columns={columns}
        dataSource={deliveryList}
      />
    </div>
  )
}

export default DeliveryList
