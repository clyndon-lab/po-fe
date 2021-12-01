import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CPagination from '@components/common/CPagination'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import { deliveryStatus } from '@static/orderDetail.static'
import { fetchOrdersList } from '@store/thunks/orders.thunk'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const OrderList = ({ orderList, page, limit, totalCount, setPage, setLimit, loading }) => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const dispatch = useDispatch()
  const history = useHistory()

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'OrderCode',
      align: 'center',
      key: 'OrderCode',
      width: '150px',
      render: (text, record) => (
        <a
          className="text-blue-text"
          onClick={() => {
            history.push(`/orders/detail/${record.Id}`)
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
      title: 'Ngày tạo',
      dataIndex: 'CreatedDate',
      width: '100px',
      key: 'CreatedDate'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'POStatusId',
      render: (text) => <CTag type={findStatus(text)?.StatusCode} />
    },
    {
      title: 'Trạng thái đồng bộ',
      dataIndex: 'POStatusId',
      render: (text) => <CTag type={findStatus(text)?.StatusCode} />
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

  const findStatus = (id) => deliveryStatus.find(item => item.Id === id)

  const onChangeLimit = (e) => {
    setLimit(e)
    setPage(1)
    dispatch(fetchOrdersList({ skip: page, take: limit }))
  }

  const onChangePage = (e) => {
    dispatch(fetchOrdersList({ skip: limit * (e - 1), take: limit }))
    setPage(e)
  }

  return (
    <Card>
      <CardHeader title="Danh sách phiếu yêu cầu"></CardHeader>
      <div className="pb-9 px-9 order-table">
        <CTable
          rowSelection={{
            ...rowSelection
          }}
          columns={columns}
          dataSource={orderList || data}
          loading={loading}
        />
        <CPagination
          current={page}
          limit={limit}
          total={totalCount}
          handleChangeLimit={(e) => onChangeLimit(e)}
          handleChangePage={(e) => onChangePage(e)}
        ></CPagination>
      </div>
    </Card>
  )
}

export default OrderList
