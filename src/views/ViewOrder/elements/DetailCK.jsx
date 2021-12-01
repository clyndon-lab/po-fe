import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import ViewWrapper from '@components/common/ViewWrapper'
import { CKleft, CKright , deliveryStatus } from '@static/orderDetail.static'
import { getSuppliersByStuffType } from '@store/thunks/combo.thunk'
import { fetchOrderByID, fetchPOGoodTypes, fetchStuffTypes } from '@store/thunks/orders.thunk'
import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

const DetailCK = () => {
  // eslint-disable-next-line
  const history = useHistory()
  const dispatch = useDispatch()
  const { params } = useRouteMatch()
  const { ordersByID, stuffTypes, poGoodTypes } = useSelector((state) => state['orders'])
  const { suppliersByStuffType } = useSelector((state) => state['combo'])

  // State
  const dataLeft = CKleft
  const dataRight = CKright
  // const [isShowDetail, setShowDetail] = useState(false)
  const [tableData, setTableData] = useState([])

  // Effect
  useEffect(() => {
    dispatch(fetchOrderByID({ id: params?.id }))
    dispatch(fetchStuffTypes())
    dispatch(fetchPOGoodTypes())
  }, [])
  useEffect(() => {
    if (ordersByID) dispatch(getSuppliersByStuffType({ listStuffTypeIds: ordersByID?.POStuffTypeId }))
    setTableData(ordersByID?.POOrderMaterialMaps?.map((item, i) => ({ ...item, key: i })))
  }, [ordersByID])

  const POTableColumns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'MaterialId',
      key: 'MaterialId'
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'LongName',
      key: 'LongName'
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'OrderQuantity',
      key: 'OrderQuantity'
    },
    {
      title: 'SL có thể giao',
      dataIndex: 'DeliveredQuantity',
      key: 'DeliveredQuantity'
    },
    {
      title: 'ĐVT',
      dataIndex: 'Unit',
      key: 'Unit'
    }
  ]

  const DetailTableColumns = [
    {
      title: 'STT',
      dataIndex: '',
      key: '',
      render: (text, record, index) => <p>{index + 1}</p>
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: '',
      key: '',
      render: (text) => <a className="text-blue-500" onClick={() => history.push(`/orders/detail/${text}`)}>string</a>
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'PlantId',
      key: 'PlantId'
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'RequestQuantity',
      key: 'RequestQuantity'
    },
    {
      title: 'SL phân bổ',
      dataIndex: 'ReceivedQuantity',
      key: 'ReceivedQuantity'
    },
    {
      title: 'ĐVT',
      dataIndex: 'Unit',
      key: 'Unit'
    }
  ]

  const InfoSections = (value) => {
    return (
      <Row gutter={1} className="mt-6 first:mt-0">
        <Col span={8}>
          <p className="text-right text-lg font-barlow">{value?.title}:</p>
        </Col>
        <Col span={12}>
          <p className="text-left text-lg  ml-5 text-dark font-medium font-barlow">
            {formatDisplayData(ordersByID?.[value?.dataIndex], value?.dataIndex)}
          </p>
        </Col>
      </Row>
    )
  }

  const formatDisplayData = (value, formatType) => {
    if (formatType === 'POStuffTypeId') return stuffTypes?.find((item) => item.Id === value)?.Name
    if (formatType === 'POGoodsTypeId') return poGoodTypes?.find((item) => item.Id === value)?.Name
    if (formatType === 'SupplierId') return suppliersByStuffType?.find((item) => item.Id === value)?.SupplierName
    if (formatType === 'POStatusId')
      return <CTag type={deliveryStatus?.find((item) => item.Id === value)?.StatusCode} />

    return value
  }

  const SubTable = (record) => {
    console.log(record)
    return (
      <div className="cSubTable">
        <div
          className="
            bg-white border-t-4 border-b-2 border-b-gray-300 border-yellow-300 w-52 font-bold text-lg text-center
          "
        >
          Chi tiết đơn hàng
        </div>
        <CTable columns={DetailTableColumns} dataSource={ordersByID?.POOrderMaterialMaps} />
      </div>
    )
  }

  return (
    <ViewWrapper
      title={'1608818719'}
      subTitle={'19/07/2021 18:08'}
      //   toolBar={ToolBar}
    >
      <div>
        <Card>
          <CardHeader title="Thông tin yêu cầu"></CardHeader>
          <Row gutter={0} className="pb-6 pl-2">
            <Col span={10}>
              {dataLeft.map((item, index) => (
                <InfoSections key={index} {...item}></InfoSections>
              ))}
            </Col>
            <Col span={12}>
              {dataRight.map((item, index) => (
                <InfoSections key={index} {...item}></InfoSections>
              ))}
            </Col>
          </Row>
        </Card>
      </div>

      <Card additionClassName="p-6 mt-6">
        <CardHeader title="Thông tin hàng hóa"></CardHeader>
        <div>
          <CTable
            columns={POTableColumns}
            dataSource={tableData}
            expandable={{
              expandedRowRender: (record) => <SubTable record={record} />
            }}
            expandIconColumnIndex={6}
          />
        </div>
      </Card>

      <div className="float-right flex mt-4">
        <CButton className="mr-4" type="simple" onClick={() => history.push('/orders')}>
          Thoát
        </CButton>
        <CButton className="mr-4" type="danger">
          Hủy
        </CButton>
        <CButton className="mr-4" type="secondary" onClick={() => history.push(`/orders/update-ck/${params?.id}`)}>
          Điều chỉnh
        </CButton>
        <CButton type="primary" className={''}>
          Hoành thành
        </CButton>
        <CButton type="primary" className={'ml-4'}>
          Phân bổ
        </CButton>
      </div>
    </ViewWrapper>
  )
}

export default DetailCK
