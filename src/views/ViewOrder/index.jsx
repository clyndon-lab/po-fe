import { DownloadOutlined } from '@ant-design/icons'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import ViewWrapper from '@components/common/ViewWrapper'
import InputGroup from '@components/Layout/InputGroup'
import { getPOStatusType } from '@store/thunks/combo.thunk'
import { dateToISO, formatBaseDateTime, saveFile } from '@utils/core.utils'
import OrderList from '@views/ViewOrder/elements/OrderList'
import { Form } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOrdersList } from '../../store/thunks/orders.thunk'

const ViewOrder = () => {
  const dispatch = useDispatch()

  const { orders, totalOrderCount, isLoading } = useSelector((state) => state['orders'])
  const { statusType } = useSelector((state) => state['combo'])

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

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

  const onFinish = (values) => {
    dispatch(
      fetchOrdersList({
        skip: page,
        take: limit,
        fromDate: values?.fromDate ? dateToISO(values?.fromDate?._d) : null,
        statusId: values?.statusId,
        supplierName: values?.supplierName,
        orderCode: values?.orderCode
      })
    )
  }

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
        <Form onFinish={onFinish}>
          <InputGroup title="Thông tin tìm kiếm" typeGroup="SearchForm">
            <Form.Item name="orderCode">
              <CInput label="Mã phiếu" placeholder="Nhập mã đơn hàng" />
            </Form.Item>
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
            <Form.Item name="supplierName">
              <CInput label="Nhà cung cấp" placeholder="Nhập tên nhà cung cấp" inputType="" />
            </Form.Item>
            <Form.Item name="fromDate">
              <CInput label="Ngày tạo phiếu" placeholder="Nhập tên nhà cung cấp" inputType="DatePicker" />
            </Form.Item>
          </InputGroup>
        </Form>
      </div>
      <div className="mt-6">
        <OrderList
          orderList={orders}
          page={page}
          limit={limit}
          totalCount={totalOrderCount}
          setPage={setPage}
          setLimit={setLimit}
          loading={isLoading}
          status={statusType}
        />
      </div>
    </ViewWrapper>
  )
}

export default ViewOrder
