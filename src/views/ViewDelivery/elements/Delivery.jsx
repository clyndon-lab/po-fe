import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import ViewWrapper from '@components/common/ViewWrapper'
import { getPOStatusType } from '@store/thunks/combo.thunk'
import { getOneDelivery, updateDelivery } from '@store/thunks/delivery.thunk'
import {
  // createDeliveryTicket,
  // deleteOrder,
  fetchOrderByID,
  fetchPOGoodTypes,
  fetchStuffTypes
  // updateStatus
} from '@store/thunks/orders.thunk'
import { getAppPlantById } from '@store/thunks/setting.thunk'
import { formatBaseDateTime } from '@utils/core.utils'
import { Col, Form, Row, Select, Spin } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory,useRouteMatch } from 'react-router-dom'

const { Option } = Select

const radioData = [
  {
    value: 1,
    label: 'Nhận hàng'
  },
  {
    value: 29,
    label: 'Chưa nhận hàng'
  }
]

const Delevery = () => {
  const history = useHistory()
  const params = useRouteMatch()
  const dispatch = useDispatch()
  const { deliveryTicket, isSuccess } = useSelector((state) => state['deliveries'])

  const { ordersByID, stuffTypes, loadingOrder } = useSelector((state) => state['orders'])
  const { statusType, loadingCombo } = useSelector((state) => state['combo'])
  const { appPlantById, loadingSetting } = useSelector((state) => state['settings'])

  const [listGood, setListGood] = useState([])

  const [valueDelivery, setValueDelivery] = useState(1)

  const [isLoading, setIsLoading] = useState(false)

  const [form] = Form.useForm()

  const handleChangeReceiveQty = (e, record) => {
    console.log(e)
    setListGood(
      listGood.map((item) => {
        if (item.Id === record) {
          return {
            ...item,
            ReceiveQuantity: e
          }
        } else return item
      })
    )
  }
  console.log(1, listGood)

  const dataLeft = [
    {
      title: 'Phân loại hàng hóa',
      value: stuffTypes?.find((item) => item.Id === ordersByID?.POStuffTypeId)?.Name
    },
    {
      title: 'Mã đặt hàng',
      value: (
        <a
          className="text-blue-icon hover:underline hover:text-blue-600"
          onClick={() => history.push(`/orders/detail/${ordersByID.Id}`)}
        >
          {ordersByID?.OrderCode}
        </a>
      )
    },
    {
      title: 'Ngày giao hàng',
      value: formatBaseDateTime(deliveryTicket?.DeliveryTime || new Date())
    }
  ]

  const dataRight = [
    {
      title: 'Trạng thái',
      value: (
        <CTag
          title={statusType?.find((item) => item.Id === deliveryTicket?.POStatusId)?.StatusName}
          type={statusType?.find((item) => item.Id === deliveryTicket?.POStatusId)?.StatusCode || 'draft'}
        ></CTag>
      )
    },
    {
      title: 'Kho tiếp nhận',
      value: appPlantById?.Name
    },
    {
      title: 'Ghi chú',
      value: deliveryTicket?.SupplierNote
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
      title: 'SL giao',
      align: 'center',
      width: '130px',
      dataIndex: 'MaterialId',
      render: (text) => (
        <p>{deliveryTicket?.PODeliveryMaterialMaps?.find((item) => item.MaterialId === text)?.DeliveryQuantity || 0}</p>
      )
    },
    {
      title: 'SL nhận',
      dataIndex: 'DeliveryQuantity',
      align: 'center',
      key: 'DeliveryQuantity',
      width: '130px',
      render: (text, record) => (
        <CInput
          inputType="Currency"
          max={
            deliveryTicket?.PODeliveryMaterialMaps?.find((item) => item.MaterialId === record.MaterialId)
              ?.DeliveryQuantity
          }
          disabled={valueDelivery !== 1}
          min={0}
          onChange={(e) => handleChangeReceiveQty(e, record.Id)}
          value={text}
        />
      )
    },
    {
      title: 'ĐVT',
      dataIndex: 'SAPUnit'
    },
    {
      title: 'Vị trí lưu kho',
      dataIndex: 'StorageLocationId',
      render: (text) => (
        <Select
          className="block"
          // onChange={(e) => handleChangeOrder(record, 'StorageLocationId', e)}
          defaultValue={text}
          optionFilterProp="children"
          showSearch
          getPopupContainer={(trigger) => trigger.parentNode}
          disabled={valueDelivery !== 1}
        >
          {appPlantById?.SAPStorageLocation?.map(({ SlocDes, Id }, idx) => (
            <Option value={Id} key={idx}>
              {SlocDes}
            </Option>
          ))}
        </Select>
      )
    }
  ]

  const handleUpdateDelivery = async (data) => {
    await dispatch(updateDelivery(data))
  }

  const handleSubmit = (dataForm) => {
    const goods = listGood?.map((item) => {
      return {
        ...item,
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
        LineNbr: item?.LineNbr,
        SAPUnit: item?.SAPUnit
      }
    })

    const payload = {
      ...deliveryTicket,
      POStatusId: valueDelivery === 30 ? 30 : deliveryTicket.POStatusId,
      ReceiveDate: moment(dataForm?.ReceiveDate).format(),
      NotDelivery: valueDelivery === 30,
      QaComment: dataForm.QaComment || '',
      PODeliveryMaterialMaps: goods
    }

    handleUpdateDelivery(payload)
  }

  const InfoSections = (value) => {
    return (
      <Row gutter={1} className="mt-6 first:mt-0">
        <Col span={10}>
          <p className="text-right text-lg font-barlow">{value?.title}:</p>
        </Col>
        <Col span={14}>
          <p className="text-left text-lg  ml-5 text-dark font-medium font-barlow">{value?.value}</p>
        </Col>
      </Row>
    )
  }

  const handleChange = (e) => {
    setValueDelivery(e.target.value)
    form.resetFields()
  }

  useEffect(() => {
    dispatch(fetchPOGoodTypes())
    dispatch(getPOStatusType({ statusType: 'delivery' }))
    dispatch(fetchStuffTypes())
  }, [])

  useEffect(() => {
    if (params?.params?.id) {
      dispatch(getOneDelivery(params?.params?.id))
    }
  }, [params])

  useEffect(() => {
    if (deliveryTicket && !ordersByID) {
      dispatch(fetchOrderByID({ id: deliveryTicket?.OrderId }))
    }
  }, [deliveryTicket])

  useEffect(() => {
    if (ordersByID?.PlantId) dispatch(getAppPlantById(ordersByID?.PlantId))
    setListGood(
      ordersByID?.POOrderMaterialMaps?.map((item) => {
        return { ...item, ReceiveQuantity: 0 }
      })
    )
  }, [ordersByID])

  useEffect(() => {
    if (loadingCombo === false && loadingOrder === false && loadingSetting === false) {
      setIsLoading(false)
    } else setIsLoading(true)
  }, [loadingCombo, loadingOrder, loadingSetting])

  useEffect(() => {
    dispatch(getOneDelivery(params?.params?.id))
  }, [isSuccess])

  return (
    <Spin tip="Đang tải ..." spinning={isLoading}>
      <ViewWrapper title={`${params?.params?.id}`} subTitle={`PO App - ${moment().format('DD/MM/YYYY HH:mm')}`}>
        <div>
          <Card>
            <CardHeader title="Thông tin chung"></CardHeader>
            <Row gutter={0} className="pb-6 pl-2">
              <Col span={10}>
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
        <Form form={form} onFinish={handleSubmit}>
          <div className="mt-6">
            <Card>
              <CardHeader title="Thông tin nhận hàng"></CardHeader>
              <Row gutter={20} className="px-9 pb-11">
                <Col span={8}>
                  <CInput
                    value={valueDelivery}
                    inputType="RadioGroup"
                    label="Trạng thái nhận hàng"
                    options={radioData}
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="ReceiveDate"
                    rules={[{ required: valueDelivery === 1, message: 'Vui lòng chọn thời gian giao hàng' }]}
                  >
                    <CInput disabled={valueDelivery !== 1} label="Ngày giao hàng" important inputType="DatePicker" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="QaComment">
                    <CInput disabled={valueDelivery !== 1} label="Ghi chú" inputType="" placeholder="Ghi chú" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </div>
          <div className="mt-6">
            <Card>
              <CardHeader title="Thông tin nguyên vật liệu yêu cầu"></CardHeader>
              <div className="pb-6 px-9">
                <CTable pagination={false} columns={columns} dataSource={listGood} />
              </div>
            </Card>
          </div>
          <Form.Item>
            <div className="mt-10 w-full text-right">
              <CButton type="secondary">Khiếu nại</CButton>
              <CButton ml="20px" type="primary" htmlType="submit">
                Xác nhận
              </CButton>
            </div>
          </Form.Item>
        </Form>
      </ViewWrapper>
    </Spin>
  )
}

export default Delevery
