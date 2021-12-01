import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CTable from '@components/common/CTable'
import TableTab from '@components/common/TableTab'
import { getAmount,getDeliveryList } from '@store/thunks/home.thunk'
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

const data = [
  {
    key: '1',
    name: '0123456789',
    address: 'Công ty TNHH Kỹ Nghệ Xanh',
    phone: '0983983983'
  },
  {
    key: '2',
    name: '0123456789',
    address: 'Công ty TNHH Kỹ Nghệ Xanh',
    phone: '0983983983'
  }
]

const Shipments = () => {
  const dispatch = useDispatch()

  const { deliveryList, isLoadingDelivery, amountDelivery } = useSelector((state) => state['home'])
  const [page] = useState(0)
  const [limit] = useState(10)
  const [query, setQuery] = useState({ skip: page, take: limit, deliveryStatus: 'new' })

  const fetchData = async (query) => {
    await dispatch(getDeliveryList(query))
  }

  const onChangeTab = (e) => {
    if (e == 1) {
      setQuery({
        ...query,
        deliveryStatus: 'New'
      })
    } else if (e == 2) {
      setQuery({
        ...query,
        deliveryStatus: 'Confirmed'
      })
    } else if (e == 3) {
      setQuery({
        ...query,
        deliveryStatus: 'Noted'
      })
    } else if (e == 4) {
      setQuery({
        ...query,
        deliveryStatus: 'InValid'
      })
    }
  }

  const fetchAmount = (type) => {
    dispatch(getAmount(type))
  }

  useEffect(() => {
    fetchData(query)
  }, [query])

  useEffect(() => {
    fetchAmount('DELIVERY')
  }, [])

  return (
    <Card>
      <CardHeader title="NHẬN HÀNG"></CardHeader>
      <Tabs
        onChange={(e) => onChangeTab(e)}
        className="pl-6 pr-6  pb-7 border-t-2"
        defaultActiveKey="1"
        tabPosition={'top'}
      >
        <TabPane
          className="border-b-3"
          key="1"
          tab={<TableTab title="Chưa xác nhận" color="#2499FF" amount={amountDelivery?.TotalNew} />}
        >
          <CTable
            pagination={false}
            columns={columns}
            dataSource={deliveryList ? deliveryList : data}
            loading={isLoadingDelivery}
          />
        </TabPane>
        <TabPane
          key="2"
          tab={<TableTab title="Đã xác nhận " color="#2DD795" amount={amountDelivery?.TotalConfirmed} />}
        >
          <CTable
            pagination={false}
            columns={columns}
            dataSource={deliveryList ? deliveryList : data}
            loading={isLoadingDelivery}
          />
        </TabPane>
        <TabPane key="3" tab={<TableTab title="Có ghi chú" color="#FFB51D" amount={amountDelivery?.TotalNote} />}>
          <CTable
            pagination={false}
            columns={columns}
            dataSource={deliveryList ? deliveryList : data}
            loading={isLoadingDelivery}
          />
        </TabPane>
        <TabPane key="4" tab={<TableTab title="Chưa hợp lệ" color="#FF5A6F" amount={amountDelivery?.TotalInValid} />}>
          <CTable
            pagination={false}
            columns={columns}
            dataSource={deliveryList ? deliveryList : data}
            loading={isLoadingDelivery}
          />
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default Shipments
