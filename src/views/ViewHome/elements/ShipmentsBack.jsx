import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CTable from '@components/common/CTable'
import TableTab from '@components/common/TableTab'
import { getAmount,getReturnGood } from '@store/thunks/home.thunk'
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

const ShipmentsBack = () => {
  const dispatch = useDispatch()

  const { returnGood, isLoadingReturn, amountReturn } = useSelector((state) => state['home'])
  const [page] = useState(0)
  const [limit] = useState(10)
  const [query, setQuery] = useState({ skip: page, take: limit, deliveryStatus: 'new' })

  const fetchData = async (query) => {
    await dispatch(getReturnGood(query))
  }

  const fetchAmount = (type) => {
    dispatch(getAmount(type))
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
    }
  }

  useEffect(() => {
    fetchData(query)
  }, [query])

  useEffect(() => {
    fetchAmount('RETURNGOOD')
  }, [])

  return (
    <Card>
      <CardHeader title="TRẢ HÀNG"></CardHeader>
      <Tabs
        onChange={(e) => onChangeTab(e)}
        className="pl-6 pr-6  pb-7 border-t-2"
        defaultActiveKey="1"
        tabPosition={'top'}
      >
        <TabPane
          className="border-b-3"
          key="1"
          tab={<TableTab amount={amountReturn?.TotalNew} title="Chưa xác nhận" color="#2499FF" />}
        >
          <CTable pagination={false} columns={columns} dataSource={returnGood} loading={isLoadingReturn} />
        </TabPane>
        <TabPane key="2" tab={<TableTab title="Đã xác nhận" amount={amountReturn?.TotalNote} color="#2DD795" />}>
          <CTable pagination={false} columns={columns} dataSource={returnGood} loading={isLoadingReturn} />
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default ShipmentsBack
