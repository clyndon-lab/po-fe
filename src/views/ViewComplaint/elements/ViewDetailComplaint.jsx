import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import ViewWrapper from '@components/common/ViewWrapper'
import { Col, DatePicker, Input, Row, Select } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { createComplaintTable, defaultInsertComplaint } from '../../../static/complaints.static'
import { plantList } from '../../../static/viewCreateOrder.static'
import { getDetailComplaintAsync, insertComplaintAsync } from '../../../store/thunks/complaints.thunk'

const { Option } = Select

const dataLeft = [
  {
    title: 'Mã khiếu nại',
    value: 'CP20210820022443818'
  },
  {
    title: 'Nhóm hàng',
    value: 'Rau củ quả'
  },
  {
    title: 'Nhà cung cấp',
    value: 'Hộ Kinh Doanh Tuấn Sâm '
  },
  {
    title: 'Nhà hàng',
    value: 'Vuvuzela Thanh Hóa(02378888099)'
  },
  {
    title: 'Mã đặt hàng',
    value: 'H254890230'
  },
  {
    title: 'Mã giao hàng',
    value: 'H254890230.001'
  },
  {
    title: 'Ngày giao hàng',
    value: '11/08/2021 08:30'
  }
]

const dataRight = [
  {
    title: 'Trạng thái',
    value: <CTag type="pending" />
  },
  {
    title: 'Người tạo',
    value: 'Kichi Kichi Lạc Long Quân'
  },
  {
    title: 'Ghi chú',
    value: 'Đây là ghi chú cho đơn'
  }
]

const ViewDetailComplaint = () => {
  const { isLoading, getDetailComplaint } = useSelector((state) => state['complaint'])
  const { id } = useParams()
  const dispatch = useDispatch()
  const tableColumns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'Material',
      width: '150px'
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'Name',
      width: '200px'
    },
    {
      title: 'SL đặt',
      dataIndex: 'OrderedQuantity',
      width: '100px'
    },
    {
      title: 'SL giao',
      dataIndex: 'DeliveredQuantity',
      width: '100px'
    },
    {
      title: 'SL nhận',
      dataIndex: 'ReceivedQuantity',
      width: '100px'
    },
    {
      title: 'ĐVT',
      dataIndex: 'Unit',
      width: '100px'
    },
    {
      title: 'Loại lỗi *',
      dataIndex: 'TypeOfError',
      render: (text, record) => (
        <Select
          onChange={(e) => onChangeErrorTypes(record, e)}
          className="block rounded-lg"
          size="small"
          defaultValue={text}
          getPopupContainer={trigger => trigger.parentNode}
        >
          {plantList.map(({ name, value }, idx) => (
            <Option value={value} key={idx}>
              {name}
            </Option>
          ))}
        </Select>
      ),
      width: '250px'
    },
    {
      title: 'Lỗi *',
      dataIndex: 'Error',
      render: (text, record) => (
        <Select
          onChange={(e) => onChangeErrorTypes(record, e)}
          className="block rounded-lg"
          size="small"
          defaultValue={text}
          placeholder="Chọn lỗi"
          getPopupContainer={trigger => trigger.parentNode}
        >
          {plantList.map(({ name, value }, idx) => (
            <Option value={value} key={idx}>
              {name}
            </Option>
          ))}
        </Select>
      ),
      width: '250px'
    },
    {
      title: 'Mô tả lỗi *',
      dataIndex: 'ErrorDescription',
      render: (text, record) => (
        <Input defaultValue={text} onChange={(e) => onChangeErrorDescrp(record, e)} size='small'/>
      ),
      width: '250px'
    },
    {
      title: 'SL khiếu nại',
      dataIndex: 'ComplaintQuantity',
      render: (text, record) => (
        <Input defaultValue={text} onChange={(e) => onChangeErrorDescrp(record, e)} size='small'/>
      ),
      width: '120px'
    },
    {
      title: 'SL yêu cầu trả',
      dataIndex: 'RequestQuantity',
      render: (text, record) => (
        <Input defaultValue={text} onChange={(e) => onChangeErrorDescrp(record, e)} size='small'/>
      ),
      width: '120px'
    },
    {
      title: 'Ngày trả',
      dataIndex: 'RequestDate',
      render: () => (
        <DatePicker
          format="YYYY/MM/DD"
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          // defaultValue={"2021"}
          onChange={onChangeRequestDate}
          placeholder="YYYY-MM-DD"
          size='small'
        />
      ),
      width: '150px'
    },
    {
      title: 'Nguyên nhân lỗi *',
      dataIndex: 'ErrorReason',
      render: (text, record) => (
        <Select
          onChange={(e) => onChangeErrorTypes(record, e)}
          className="block rounded-lg"
          size="small"
          defaultValue={text}
          getPopupContainer={trigger => trigger.parentNode}
        >
          {plantList.map(({ name, value }, idx) => (
            <Option value={value} key={idx}>
              {name}
            </Option>
          ))}
        </Select>
      ),
      width: '250px'
    },
    {
      title: 'Cách khắc phục *',
      dataIndex: 'ErrorReasonDescription',
      render: (text, record) => (
        <Select
          onChange={(e) => onChangeErrorTypes(record, e)}
          className="block rounded-lg"
          size="small"
          defaultValue={text}
          getPopupContainer={trigger => trigger.parentNode}
        >
          {plantList.map(({ name, value }, idx) => (
            <Option value={value} key={idx}>
              {name}
            </Option>
          ))}
        </Select>
      ),
      width: '250px'
    },
    {
      title: 'Cách phòng ngừa',
      dataIndex: 'PreventionAction',
      render: (text, record) => (
        <Select
          onChange={(e) => onChangeErrorTypes(record, e)}
          className="block rounded-lg"
          size="small"
          defaultValue={text}
          getPopupContainer={trigger => trigger.parentNode}
        >
          {plantList.map(({ name, value }, idx) => (
            <Option value={value} key={idx}>
              {name}
            </Option>
          ))}
        </Select>
      ),
      width: '250px'
    },
    {
      title: 'Hạng lỗi *',
      dataIndex: 'ErrorType',
      render: (text, record) => (
        <Select
          onChange={(e) => onChangeErrorTypes(record, e)}
          className="block rounded-lg"
          size="small"
          defaultValue={text}
          getPopupContainer={trigger => trigger.parentNode}
        >
          {plantList.map(({ name, value }, idx) => (
            <Option value={value} key={idx}>
              {name}
            </Option>
          ))}
        </Select>
      ),
      width: '150px'
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'Priority',
      render: (text, record) => (
        <Select
          onChange={(e) => onChangeErrorTypes(record, e)}
          className="block rounded-lg"
          size="small"
          defaultValue={text}
          getPopupContainer={trigger => trigger.parentNode}
        >
          {plantList.map(({ name, value }, idx) => (
            <Option value={value} key={idx}>
              {name}
            </Option>
          ))}
        </Select>
      ),
      width: '150px'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      render: (text) => <CTag type={text} />,
      width: '150px'
    },
    {
      title: 'Hành động',
      width: '150px'
    }
  ]

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

  const onChangeRequestDate = (date) => {
    console.log('date', date)
  }

  useEffect(() => {
    console.log('params', id)
    dispatch(getDetailComplaintAsync({ complaint_Id: 1 }))
    console.log('getDetailComplaint', getDetailComplaint)
    console.log('getDetailComplaint 2', createComplaintTable)
  }, [])

  const onChangeErrorTypes = (record, event) => {
    console.log('record', record)
    console.log('event', event)
  }

  const onChangeErrorDescrp = (record, event) => {
    console.log('record', record)
    console.log('event', event)
  }

  const handleInsertComplaint = () => {
    dispatch(insertComplaintAsync(defaultInsertComplaint))
  }

  return (
    <>
      (
      <ViewWrapper title="Khiếu nại nhà cung cấp" subTitle="AMS - 19/07/2021 18:08">
        <Card>
          <CardHeader title="Thông tin khiếu nại"></CardHeader>
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

        <div className="mt-6">
          <Card>
            <CardHeader title="Danh sách phiếu yêu cầu"></CardHeader>
            <div className="pb-9 px-9 order-table">
              <CTable columns={tableColumns} dataSource={getDetailComplaint} scroll={4000} loading={isLoading}/>
            </div>
          </Card>
        </div>

        <div className="flex justify-center mt-4">
          <div className="mr-6">
            <Link to="/supplier-review">
              <CButton type="danger">Hủy</CButton>
            </Link>
          </div>
          <CButton type="secondary" onClick={handleInsertComplaint}>
            Lưu
          </CButton>
        </div>
      </ViewWrapper>
    </>
  )
}

export default ViewDetailComplaint
