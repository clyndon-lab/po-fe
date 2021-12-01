import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CTable from '@components/common/CTable'
import ViewWrapper from '@components/common/ViewWrapper'
import { createDeliveryTicket } from '@store/thunks/orders.thunk'
import { formatBaseDateTime } from '@utils/core.utils'
import { Col, Form, Row } from 'antd'
import moment from 'moment'
// import Form from 'rc-field-form/es/Form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

const Delivery = () => {
  const history = useHistory()
  const params = useRouteMatch()
  const dispatch = useDispatch()
  const { ordersByID, isSuccess } = useSelector((state) => state['orders'])
  const { fullRestaurant } = useSelector((state) => state['settings'])
  const [listGood, setListGood] = useState([])
  const [status, setStatus] = useState(null)
  const [dataForm, setDataForm] = useState(null)

  const handleChangeQty = (id, value) => {
    setListGood(
      listGood.map((item) => {
        if (item.Id === id) {
          return {
            ...item,
            DeliveryQuantity: value,
            error: item.OrderQuantity < value
          }
        } else return item
      })
    )
  }

  const vendors = [
    {
      Name: 'Nhà cung cấp',
      Id: 1
    },
    {
      Name: 'Bộ phận cung ứng nội bộ',
      Id: 2
    }
  ]

  const columns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'MaterialId',
      key: 'name',
      width: '130px',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'LongName'
    },
    {
      title: 'SL yêu cầu',
      width: '130px',
      align: 'center',
      dataIndex: 'OrderQuantity'
    },
    {
      title: 'SL đã giao',
      width: '130px',
      align: 'center',
      dataIndex: 'DeliveredQuantity'
    },
    {
      title: 'SL giao',
      dataIndex: 'DeliveryQuantity',
      align: 'center',
      key: 'DeliveryQuantity',
      width: '130px',
      render: (text, record) => (
        <div className={record.error && 'mt-[19px]'}>
          <CInput
            error={record.error}
            inputType="Currency"
            max={record.OrderQuantity}
            min={0}
            value={text}
            onChange={(e) => handleChangeQty(record.Id, e)}
          />
          <p className="text-red-400 text-sm">{record.error && 'SL không hợp lệ'}</p>
        </div>
      )
    },
    {
      title: 'ĐVT',
      dataIndex: 'SAPUnit'
    }
  ]

  const dataLeft = [
    {
      title: 'Đơn vị đặt hàng',
      value: vendors?.find((item) => item.Id === ordersByID?.POVendorId)?.Name
    },
    {
      title: 'Kho tiếp nhận',
      value: fullRestaurant?.find((item) => item.Id === ordersByID?.PlantId)?.Name
    }
  ]

  const dataRight = [
    {
      title: 'Ngày yêu cầu giao hàng',
      value: formatBaseDateTime(ordersByID?.OrderTimeTo || new Date())
    },
    {
      title: 'Ghi chú',
      value: ordersByID?.Comment
    }
  ]

  const InfoSections = (value) => {
    return (
      <Row gutter={1} className="mt-4 first:mt-0">
        <Col span={12}>
          <p className="text-right text-lg font-barlow">{value?.title}:</p>
        </Col>
        <Col span={12}>
          <p className="text-left text-lg  ml-5 text-dark font-medium font-barlow">{value?.value}</p>
        </Col>
      </Row>
    )
  }

  const handleCreateDelivery = (dataForm) => {
    const payload = {
      OrderId: ordersByID?.Id,
      DeliveryCode: 0,
      DeliveryTime: dataForm?.DeliveryTime,
      DeliveryBy: 'string',
      ReceiveBy: 'string',
      SupplierNote: dataForm?.SupplierNote || '',
      PlantNote: ordersByID?.Comment || '',
      POStatusId: ordersByID?.POStatusId,
      CreatedType: ordersByID?.CreatedType,
      ReceiveDate: ordersByID?.OrderTimeTo,
      HaveStuffSale: true,
      NotDelivery: true,
      CreatedBy: ordersByID?.CreatedBy,
      QaComment: 'string',
      PODeliveryMaterialMaps: listGood?.map((item) => {
        return {
          DeliveryId: 0,
          MaterialId: item?.MaterialId,
          OrderQuantity: item?.OrderQuantity,
          DeliveryQuantity: item?.DeliveryQuantity,
          ReceiveQuantity: item?.ReceiveQuantity,
          Unit: item?.Unit,
          Price: item?.Price,
          IsSale: item?.IsSale,
          Images: item?.Images,
          SumPrice: item?.SumPrice,
          IsNotNorm: item?.IsNotNorm,
          NormQuantity: item?.NormQuantity,
          HasNote: item?.HasNote || false,
          // SupplierNote: item?.IsSale,
          LineNbr: item?.LineNbr,
          SAPUnit: item?.SAPUnit
        }
      })
    }

    setDataForm(payload)
  }

  useEffect(() => {
    if (ordersByID == null) {
      history.push(`/orders/detail/${params?.params?.id}`)
    } else {
      setListGood(
        ordersByID?.POOrderMaterialMaps.map((item) => {
          return {
            ...item,
            DeliveryQuantity: 0,
            errorQty: false
          }
        })
      )
    }
  }, [ordersByID])

  useEffect(() => {
    if (isSuccess) history.push('/delivery')
  }, [isSuccess])

  useEffect(() => {
    if (status && dataForm) {
      dispatch(createDeliveryTicket({ ...dataForm, POStatusId: status }))
    }
  }, [status, dataForm])

  return (
    <ViewWrapper
      title={`Giao hàng cho đơn hàng ${params?.params?.id}`}
      subTitle={`PO App - ${moment().format('DD/MM/YYYY HH:mm')}`}
    >
      <div>
        <Card>
          <CardHeader title="Thông tin đơn hàng"></CardHeader>
          <Row gutter={0} className="pb-6 pl-2">
            <Col span={8}>
              {dataLeft.map((item, index) => (
                <InfoSections key={index} {...item}></InfoSections>
              ))}
            </Col>
            <Col span={14}>
              {dataRight.map((item, index) => (
                <InfoSections key={index} {...item}></InfoSections>
              ))}
            </Col>
          </Row>
        </Card>
      </div>
      <Form onFinish={handleCreateDelivery}>
        <div className="mt-6">
          <Card>
            <CardHeader title="Thông tin giao hàng"></CardHeader>
            <Row gutter={20} className="px-9 pb-11">
              <Col span={8}>
                <CInput label="Mã phiếu giao hàng" inputType="" disabled placeholder="Hệ thống tự sinh" />
              </Col>
              <Col span={8}>
                <Form.Item
                  name="DeliveryTime"
                  rules={[{ required: true, message: 'Vui lòng nhập thời gian giao hàng' }]}
                >
                  <CInput label="Ngày giao hàng" important inputType="DatePicker" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="SupplierNote">
                  <CInput label="Ghi chú" inputType="" placeholder="Ghi chú" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </div>
        <div className="mt-6">
          <Card>
            <CardHeader title="Thông tin nguyên vật liệu"></CardHeader>
            <div className="pb-6 px-9">
              <CTable pagination={false} columns={columns} dataSource={listGood} />
            </div>
          </Card>
        </div>
        <div className="mt-10 w-full text-right">
          <CButton mr="20px" type="danger" onClick={() => history.push(`/orders/detail/${params?.params?.id}`)}>
            Thoát
          </CButton>
          <CButton type="secondary" htmlType="submit" onClick={() => setStatus(9)}>
            Lưu tạm
          </CButton>
          <CButton type="primary" ml="20px" htmlType="submit" onClick={() => setStatus(10)}>
            Giao hàng
          </CButton>
        </div>
      </Form>
    </ViewWrapper>
  )
}

export default Delivery
