import '@assets/css/orders.css'

import CPagination from '@components/common/CPagination'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import { formatBaseDate } from '@utils/core.utils'
import { useHistory } from 'react-router-dom'

const OrderFromCK = ({ orderList, page, limit, totalCount }) => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const history = useHistory()

  const columns = [
    {
      title: 'Mã phiếu',
      dataIndex: 'OrderCode',
      key: 'OrderCode',
      width: '150px',
      render: (text, record) => (
        <a
          className="text-yellow underline hover:underline"
          onClick={() => {
            history.push(`/order/detail/${record.Id}`)
          }}
        >
          {text}
        </a>
      )
    },
    {
      title: 'Người đặt hàng',
      dataIndex: 'PlantName',
      width: '200px',
      key: 'PlantName'
    },
    {
      title: 'Địa chỉ đặt hàng',
      dataIndex: 'SupplierName',
      width: '490px',
      key: 'SupplierName'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedDate',
      width: '100px',
      key: 'CreatedDate',
      render:(text)=>formatBaseDate(text)
    },
    {
      title: 'Ngày yêu cầu giao hàng',
      dataIndex: 'CreatedDate',
      width: '150px',
      key: 'CreatedDate',
      render:(text)=>formatBaseDate(text)
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
      render: (text, record) => <CTag title={text} type={record.POStatusId === 2 ? 'new' : 'draft'} />
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

  const onChangeLimit = (e) => {
    console.log(e)
    // setLimit(e)
    // setPage(1)
    // setQuery({ ...query, skip: 0, take: e })
  }

  const onChangePage = (e) => {
    console.log(e)
    // setPage(e)
    // setQuery({ ...query, skip: limit * (e - 1), take: limit })
  }

  return (
    <div className="pb-9 px-9 order-table">
      <CTable
        rowSelection={{
          ...rowSelection
        }}
        columns={columns}
        dataSource={orderList}
      />
      <CPagination
        current={page}
        limit={limit}
        total={totalCount}
        handleChangeLimit={(e) => onChangeLimit(e)}
        handleChangePage={(e) => onChangePage(e)}
      ></CPagination>
    </div>
  )
}

export default OrderFromCK
