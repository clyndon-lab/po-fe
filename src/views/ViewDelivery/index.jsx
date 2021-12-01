import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CPagination from '@components/common/CPagination'
import ViewWrapper from '@components/common/ViewWrapper'
import { getPOStatusType } from '@store/thunks/combo.thunk'
import { formatBaseDateTime, saveFile } from '@utils/core.utils'
import DeliveryList from '@views/ViewDelivery/elements/DeliveryList'
import { Col, Form, Row } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOrdersList, getDeliveries } from '../../store/thunks/orders.thunk'

const ViewDelivery = () => {
  const dispatch = useDispatch()

  const { totalDelivery, deliveryList } = useSelector((state) => state['orders'])
  const { statusType } = useSelector((state) => state['combo'])

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [query, setQuery] = useState({ skip: page, take: limit })
  // const [dateQuery, setDateQuery] = useState([])

  useEffect(() => {
    dispatch(fetchOrdersList({ skip: page, take: limit }))
    dispatch(getPOStatusType({ statusType: 'order' }))
  }, [])

  const saveExcel = () => {
    const objectToSave = deliveryList?.map((item, index) => {
      return {
        ['STT']: index + 1,
        ['Mã đơn hàng']: item.OrderCode,
        ['Nhà hàng']: item.PlantName,
        ['NCC/Đơn vị cung ứng nội bộ']: item.SupplierName,
        ['Ngày tạo']: formatBaseDateTime(item.CreatedDate),
        ['Trạng thái']: item.POStatusName,
        ['Trạng thái đồng bộ']: item.POStatusName
      }
    })

    saveFile(objectToSave, 'POOrders')
  }

  // const onFinish = (values) =>
  //   dispatch(
  //     fetchOrdersList(
  //       values.formDate
  //         ? { ...values, skip: page, take: limit, fromDate: dateToISO(values?.fromDate?._d) }
  //         : { ...values, skip: page, take: limit }
  //     )
  //   )

  const onChangeLimit = (e) => {
    setLimit(e)
    setPage(1)
    setQuery({ ...query, skip: 0, take: e })
  }

  const onChangePage = (e) => {
    setPage(e)
    setQuery({ ...query, skip: limit * (e - 1), take: limit })
  }

  const onFilter = (e) => {
    setPage(1)
    setQuery({ ...query, ...e, skip: 0 })
  }

  const fetchData = async (query) => {
    await dispatch(getDeliveries(query))
  }

  useEffect(() => {
    fetchData(query)
  }, [query])

  return (
    <ViewWrapper
      title="Danh sách phiếu giao hàng"
      subTitle="Toàn bộ danh sách phiếu giao hàng mà tài khoản được phân quyền"
      toolBar={
        <div className="flex">
          <CButton h={32} icon={<DownloadOutlined />} onClick={saveExcel}>
            Xuất Excel
          </CButton>
        </div>
      }
    >
      <div className="mt-6">
        <Card>
          <Form onFinish={onFilter}>
            <CardHeader title="Thông tin tìm kiếm"></CardHeader>
            <Row gutter={[30, 30]} className="py-8 px-9">
              <Col span={8}>
                <Form.Item name="deliveryCode">
                  <CInput label="Mã phiếu đặt hàng" placeholder="Nhập mã phiếu đặt hàng" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="orderCode">
                  <CInput label="Mã phiếu giao hàng" placeholder="Nhập mã phiếu giao hàng" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="supplierName">
                  <CInput label="Tên nhà cung cấp" placeholder="Nhập tên nhà cung cấp" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  <CInput
                    onChange={(e) =>
                      setQuery({
                        ...query,
                        startDate: moment(e[0]).format('DD-MM-YYYY'),
                        endDate: moment(e[1]).format('DD-MM-YYYY')
                      })
                    }
                    label="Ngày tạo phiếu"
                    // placeholder={['T]}
                    inputType="RangePicker"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="statusId">
                  <CInput
                    label="Trạng thái"
                    placeholder="Chọn trạng thái"
                    inputType="Select"
                    options={statusType}
                    additionValueType="takeId"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={8} className="text-right place-self-end">
                <Form.Item>
                  <CButton htmlType="submit" type="primary" baseSize="38" icon={<SearchOutlined></SearchOutlined>}>
                    Tìm kiếm
                  </CButton>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader title="Danh sách phiếu giao hàng"></CardHeader>
          <div className="pb-4 pr-4">
            <DeliveryList deliveryList={deliveryList} />
            <CPagination
              current={page}
              limit={limit}
              total={totalDelivery}
              handleChangeLimit={(e) => onChangeLimit(e)}
              handleChangePage={(e) => onChangePage(e)}
            ></CPagination>
          </div>
        </Card>
      </div>
    </ViewWrapper>
  )
}

export default ViewDelivery
