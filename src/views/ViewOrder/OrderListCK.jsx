import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import ViewWrapper from '@components/common/ViewWrapper'
import { getPOStatusType } from '@store/thunks/combo.thunk'
import { dateToISO, formatBaseDateTime, saveFile } from '@utils/core.utils'
import { Col,Form , Row, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOrdersList } from '../../store/thunks/orders.thunk'
import OrderCK from './elements/OrderCK'
import OrderFromCK from './elements/OrderFromCK'

const { TabPane } = Tabs

const ViewOrderCK = () => {
  const dispatch = useDispatch()

  const { orders, totalOrderCount } = useSelector((state) => state['orders'])
  const { statusType } = useSelector((state) => state['combo'])

  const [page] = useState(1)
  const [limit] = useState(10)

  useEffect(() => {
    dispatch(fetchOrdersList({ skip: page, take: limit }))
    dispatch(getPOStatusType({ statusType: 'order' }))
  }, [])

  const saveExcel = () => {
    const objectToSave = orders?.map((item, index) => {
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

  const onFinish = (values) =>
    dispatch(
      fetchOrdersList(
        values.formDate
          ? { ...values, skip: page, take: limit, fromDate: dateToISO(values?.fromDate?._d) }
          : { ...values, skip: page, take: limit }
      )
    )

  return (
    <ViewWrapper
      title="Danh sách đơn hàng"
      subTitle="Toàn bộ danh sách phiếu tổng hợp công nợ mà tài khoản được phân quyền"
      toolBar={
        <CButton h={32} icon={<DownloadOutlined />} onClick={saveExcel}>
          Xuất Excel
        </CButton>
      }
    >
      <div className="mt-6">
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<p className="text-center text-lg ml-[-15px]">Đơn đặt hàng</p>} key="1">
              <Card>
                <Form onFinish={onFinish} layout="vertical">
                  <Row gutter={[20, 24]} className="p-6">
                    <Col span={8}>
                      <Form.Item name="orderCode">
                        <CInput label="Mã phiếu" placeholder="Nhập mã đơn hàng" />
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
                    <Col span={8}>
                      <Form.Item name="supplierName">
                        <CInput label="Đơn vị đặt hàng" placeholder="Nhập tên đơn vị đặt hàng" inputType="" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="fromDate">
                        <CInput label="Ngày tạo phiếu" inputType="RangePicker" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="toDate">
                        <CInput label="Ngày yêu cầu giao hàng" inputType="RangePicker" />
                      </Form.Item>
                    </Col>
                    <Col span={8} className="text-right place-self-end">
                      <Form.Item>
                        <CButton type="primary" baseSize="38" icon={<SearchOutlined></SearchOutlined>}>
                          Tìm kiếm
                        </CButton>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <OrderCK orderList={orders} page={page} limit={limit} totalCount={totalOrderCount} />
              </Card>
            </TabPane>
            <TabPane tab={<p className="text-center text-lg ml-[-10px]">Đơn đặt hàng từ CK</p>} key="2">
              <Card>
                <Form onFinish={onFinish} layout="vertical">
                  <Row gutter={[20, 24]} className="p-6">
                    <Col span={8}>
                      <Form.Item name="orderCode">
                        <CInput label="Mã đơn hàng" placeholder="Nhập mã đơn hàng" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="supplierName">
                        <CInput label="Địa chỉ giao hàng" placeholder="Nhập địa chỉ giao hàng" inputType="" />
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

                    <Col span={8}>
                      <Form.Item name="fromDate">
                        <CInput label="Ngày tạo phiếu" inputType="RangePicker" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="toDate">
                        <CInput label="Ngày yêu cầu giao hàng" inputType="RangePicker" />
                      </Form.Item>
                    </Col>
                    <Col span={8} className="text-right place-self-end">
                      <Form.Item>
                        <CButton type="primary" baseSize="38" icon={<SearchOutlined></SearchOutlined>}>
                          Tìm kiếm
                        </CButton>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <OrderFromCK orderList={orders} page={page} limit={limit} totalCount={totalOrderCount} />
              </Card>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </ViewWrapper>
  )
}

export default ViewOrderCK
