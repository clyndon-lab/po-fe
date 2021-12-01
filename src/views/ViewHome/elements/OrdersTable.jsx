// import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CTable from '@components/common/CTable'
import TableTab from '@components/common/TableTab'
import { getAmount, getOrderList } from '@store/thunks/home.thunk'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { TabPane } = Tabs
const columns = [
  {
    title: 'STT',
    dataIndex: 'IndexNumber',
    align: 'center',
    key: 'IndexNumber',
    width: '50px',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Đơn hàng',
    dataIndex: 'OrderCode',
    align: 'center',
    key: 'OrderCode',
    render: (text) => <a className="text-blue-text">{text}</a>
  },
  {
    title: 'Nhà cung cấp',
    dataIndex: 'Supplier',
    key: 'Supplier'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'Phone',
    key: 'Phone'
  }
]

const OrderList = () => {
  const dispatch = useDispatch()

  const { orderList, isLoading, amountOrder } = useSelector((state) => state['home'])
  const [page] = useState(0)
  const [limit] = useState(10)
  const [query, setQuery] = useState({ skip: page, take: limit, deliveryStatus: 'New' })

  const fetchData = async (query) => {
    await dispatch(getOrderList(query))
  }

  const fetchAmount = (type) => {
    dispatch(getAmount(type))
  }

  useEffect(() => {
    fetchData(query)
  }, [query])

  useEffect(() => {
    fetchAmount('ORDER')
  }, [])

  return (
    <Card>
      <CardHeader title="ĐẶT HÀNG">
        <p className="cursor-pointer font-barlow text-sm h-4 text-blue-icon hover:text-blue-500">
          Xem tất cả
        </p>
      </CardHeader>
      <Tabs
        onChange={(e) =>
          setQuery({
            ...query,
            deliveryStatus: e == 1 ? 'New' : 'Confirmed'
          })
        }
        className="pl-6 pr-6 border-t-2 pb-7"
        defaultActiveKey="1"
        tabPosition={'top'}
      >
        <TabPane
          className="border-b-3"
          key="1"
          tab={<TableTab title="Chưa xác nhận" color="#2499FF" amount={amountOrder?.TotalNew} />}
        >
          <CTable pagination={false} columns={columns} dataSource={orderList} loading={isLoading} />
        </TabPane>
        <TabPane key="2" tab={<TableTab title="Đã xác nhận " color="#2DD795" amount={amountOrder?.TotalConfirmed} />}>
          <CTable pagination={false} columns={columns} dataSource={orderList} loading={isLoading} />
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default OrderList
