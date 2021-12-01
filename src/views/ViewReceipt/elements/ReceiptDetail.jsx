import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CInput from '@components/common/CInput'
import CTag from '@components/common/CTag'
import ViewWrapper from '@components/common/ViewWrapper'
import { Button, Col, Row, Table } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'

const dataLeft = [
  {
    title: 'Phân loại hàng hóa',
    value: 'Thực phẩm'
  },
  {
    title: 'Mã đặt hàng',
    value: 'Mã đặt hàng'
  },
  {
    title: 'Ngày giao hàng',
    value: '28/07/2021 - 17:00'
  }
]

const dataRight = [
  {
    title: 'Trạng thái',
    value: <CTag type="draft" />
  },
  {
    title: 'Kho tiếp nhận',
    value: 'Kichi Kichi Lạc Long Quân'
  },
  {
    title: 'Ghi chú',
    value: 'Đây là ghi chú cho đơn'
  }
]

const radioData = [
  {
    label: 'Nhà cung cấp',
    value: 'ncc'
  },
  {
    label: 'Bộ phận cung ứng nội bộ',
    value: 'nb',
    disabled: true
  }
]

const selectOptions = [
  {
    name: 'Quầy bar',
    value: '1'
  },
  {
    name: 'Quầy bar 1',
    value: '2'
  },
  {
    name: 'Quầy bar 2',
    value: '3'
  }
]

const columns = [
  {
    title: 'Mã hàng hóa',
    dataIndex: 'key',
    key: 'name',
    width: '230px',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Tên hàng hóa',
    dataIndex: 'name',
    key: 'name'
  },

  {
    title: 'SL yêu cầu',
    dataIndex: 'requestQty',
    align: 'center',
    key: 'requestQty'
  },
  {
    title: 'SL giao',
    dataIndex: 'shipQty',
    align: 'center',
    key: 'shipQty'
  },
  {
    title: 'SL nhận',
    dataIndex: 'getQty',
    align: 'center',
    key: 'getQty',
    width: '120px',
    render: (text) => {
      return <CInput defaultValue={text} align="right"></CInput>
    }
  },
  {
    title: 'ĐVT',
    dataIndex: 'unit',
    key: 'unit'
  },
  {
    title: 'Vị trí lưu kho',
    dataIndex: 'location',
    key: 'location',
    width: '240px',
    render: (text, record) => {
      return <CInput inputType="Select" options={selectOptions} defaultValue={record.location}></CInput>
    }
  }
]

const data = [
  {
    key: 'NRAU045 - 10003383',
    name: 'Cải ngọt dài 20-35cm _HCM',
    location: '1',
    getQty: '5',
    shipQty: '5',
    requestQty: '5',
    unit: 'KG'
  },
  {
    key: 'NRAU011 - 10003367',
    name: 'Cải xanh 20-35cm _HCM',
    location: '2',
    getQty: '5',
    shipQty: '5',
    requestQty: '5',
    unit: 'KG'
  },
  {
    key: 'NRAU011 - 10003368',
    name: 'Nấm kim châm ',
    location: '3',
    getQty: '5',
    shipQty: '5',
    requestQty: '5',
    unit: 'Gói'
  }
]

const ReceiptDetail = () => {
  const params = useRouteMatch()
  // const [isShowConfirm, setIsShowConfirm] = useState(false)
  // const [isShowShip, setIsShowShip] = useState(false)
  const [defaultRadioValue, setDefaultRadioValue] = useState('ncc')

  const onChangeRadio = (e) => {
    console.log('radio checked', e.target.value)
    setDefaultRadioValue(e.target.value)
  }

  const InfoSections = (value) => {
    return (
      <Row gutter={1} className="mt-6 first:mt-0">
        <Col span={9}>
          <p className="text-right text-lg font-barlow">{value?.title}:</p>
        </Col>
        <Col span={12}>
          <p className="text-left text-lg  ml-5 text-dark font-medium font-barlow">{value?.value}</p>
        </Col>
      </Row>
    )
  }

  return (
    <ViewWrapper
      title={params?.params?.id}
      subTitle={`PO App - ${moment().format('DD/MM/YYYY HH:mm')}`}
      toolBar={<Button>asjd</Button>}
    >
      <div>
        <Card>
          <CardHeader title="Thông tin chung"></CardHeader>
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
      <div className="mt-6">
        <Card>
          <CardHeader title="Thông tin giao hàng"></CardHeader>
          <Row gutter={0} className="px-9 pb-11">
            <Col span={8}>
              <CInput
                inputType="RadioGroup"
                label="Chọn đơn vị cung cấp"
                options={radioData}
                defaultValue={defaultRadioValue}
                onChange={onChangeRadio}
              />
            </Col>
            <Col span={8}>
              <CInput label="Ngày giao hàng" important inputType="DatePicker" />
            </Col>
            <Col span={8}>
              <CInput label="Ghi chú" inputType="" placeholder="" />
            </Col>
          </Row>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader title="Thông tin nguyên vật liệu"></CardHeader>
          <div className="pb-6 px-9">
            <Table pagination={false} columns={columns} dataSource={data} />
          </div>
        </Card>
      </div>
      <div className="mt-10 w-full text-right">
        <Button
          className="order-btn text-red border-red mr-6"
          // onClick={() => {
          //   if (!isShowConfirm) history.push('/order')
          //   else setIsShowConfirm(false)
          // }}
        >
          {/* {isShowConfirm ? 'Không xác nhận' : 'Hủy'} */}
          Hủy
        </Button>

        {/* {!isShowConfirm && <Button className="order-btn text-yellow border-yellow mr-6">Điều chỉnh</Button>} */}
        <Button
          className="order-btn bg-yellow border-none"
          // onClick={() => {
          //   if (isShowConfirm) {
          //     if (isShowShip) history.push(`/order/delivery/${params?.params?.id}`)
          //     else setIsShowShip(true)
          //   } else setIsShowConfirm(true)
          // }}
        >
          {/* {isShowConfirm ? (isShowShip ? 'Giao hàng' : 'Xác nhận') : 'Gửi NCC'} */}
          Gửi NCC
        </Button>
      </div>
    </ViewWrapper>
  )
}

export default ReceiptDetail
