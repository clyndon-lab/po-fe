import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import ViewWrapper from '@components/common/ViewWrapper'
import { booleanOptions } from '@static/supplier.static'
import { getDetailSystemParameter, saveParamsAsync } from '@store/thunks/setting.thunk'
import { Form, Radio } from 'antd'
// import format from 'date-fns/format'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { checkEmail, checkIsNum, checkUrl, dateToISOTime } from '../../../utils/core.utils'

const SettingSystemArgument = () => {
  const dispatch = useDispatch()
  const { systemDetailParams } = useSelector((state) => state['settings'])
  const [form] = Form.useForm()
  const [queriesSettingParameters, setQueriesSettingParameters] = useState(systemDetailParams)

  useEffect(() => {
    dispatch(getDetailSystemParameter())
  }, [])
  useEffect(() => {
    form.setFieldsValue(systemDetailParams)
    setQueriesSettingParameters(systemDetailParams)
  }, [systemDetailParams])

  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`)
    console.log(systemDetailParams)
    console.log(queriesSettingParameters)
  }

  const switcher = (
    <Radio.Group onChange={onChange} defaultValue="a">
      <Radio.Button value="a" className="w-48 text-center">
        Nhà hàng
      </Radio.Button>
      <Radio.Button value="b" className="w-48 text-center">
        CK
      </Radio.Button>
    </Radio.Group>
  )

  const onFinish = (values) => {
    console.log('values', values)
    // setQueriesSettingParameters({ ...queriesSettingParameters, ...values })
    dispatch(saveParamsAsync(queriesSettingParameters))
    console.log('queriesSettingParameters', queriesSettingParameters)
  }

  const onValueChangeForm = (value) => {
    // console.log('val', value.OrderTimeFrom.)
    if (value.OrderTimeFrom) value.OrderTimeFrom = dateToISOTime(value?.OrderTimeFrom?._d)
    if (value.OrderTimeTo) value.OrderTimeTo = dateToISOTime(value?.OrderTimeTo?._d)
    setQueriesSettingParameters({ ...queriesSettingParameters, ...value })
    console.log('value', value)
    console.log('queriesSettingParameters', queriesSettingParameters)
  }

  return (
    <ViewWrapper title="Cấu hình tham số hệ thống">
      <Form onFinish={onFinish} onValuesChange={onValueChangeForm} className="parameterForm" form={form}>
        <Card additionClassName="mb-4">
          <CardHeader title="Email hosting"></CardHeader>
          <div className="pl-8 pr-8 pt-6 pb-6">
            <Form.Item
              name="HostName"
              rules={[
                {
                  validator: checkUrl
                }
              ]}
            >
              <CInput
                label="Địa chỉ web của ứng dụng"
                direction="horizontal"
                subTitle="Địa chỉ website, sử dụng cho gửi email, nhận truy cập"
              />
            </Form.Item>
            <Form.Item
              name="MailHost"
              rules={[
                {
                  validator: checkUrl
                }
              ]}
            >
              <CInput label="Mail Host" direction="horizontal" subTitle="Địa chỉ Mail server của hệ thống" />
            </Form.Item>
            <Form.Item name="MailPassword" rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
              <CInput label="Mật khẩu email" direction="horizontal" subTitle="Mật khẩu đăng nhập vào Mail server" />
            </Form.Item>
            <Form.Item
              name="MailAddress"
              rules={[
                {
                  validator: checkEmail
                }
              ]}
            >
              <CInput label="Địa chỉ Email" direction="horizontal" subTitle="Địa chỉ Email đăng nhập Mail server" />
            </Form.Item>
            <Form.Item
              name="MailDisplayName"
              rules={[
                {
                  validator: checkEmail
                }
              ]}
            >
              <CInput
                label="Tên hiển thị Email khi gửi đi"
                direction="horizontal"
                subTitle="Tên hiển thị gửi gửi Email đi"
              />
            </Form.Item>
            <Form.Item
              name="MailPort"
              rules={[
                {
                  validator: checkIsNum
                },
                { required: true, message: 'Trường này là bắt buộc' }
              ]}
            >
              <CInput
                label="Cổng truy cập Mail server"
                direction="horizontal"
                subTitle="Cổng truy cập vào Mail server"
              />
            </Form.Item>
            <Form.Item name="UseSLL" valuePropName="checked">
              <CInput label="Sử dụng SSL" inputType="CheckBox" direction="horizontal" />
            </Form.Item>
          </div>
        </Card>

        <Card additionClassName="mb-4">
          <CardHeader title="Đặt hàng - Trả hàng" switcher={switcher}></CardHeader>
          <div className="pl-8 pr-8 pt-6 pb-6">
            <Form.Item name="TimeOrder" rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
              <CInput
                label="Thời gian nhập hàng"
                direction="horizontal"
                subTitle="Danh sách các giờ chọn để đặt hàng"
              />
            </Form.Item>
            <Form.Item
              name="OrderAffterDay"
              rules={[
                {
                  validator: checkIsNum
                },
                { required: true, message: 'Trường này là bắt buộc' }
              ]}
            >
              <CInput
                label="Số ngày đặt hàng tạm"
                direction="horizontal"
                subTitle="Số ngày cho phép lưu tạm đặt hàng trước"
              />
            </Form.Item>
            <Form.Item
              name="ReturnGoodsAffterday"
              rules={[
                {
                  validator: checkIsNum
                },
                { required: true, message: 'Trường này là bắt buộc' }
              ]}
            >
              <CInput label="Số ngày trả hàng" direction="horizontal" subTitle="Số ngày trong quá khứ để trả hàng" />
            </Form.Item>
            <Form.Item name="OrderTimeFrom" rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
              <CInput
                label="Giờ bắt đầu đặt hàng"
                direction="horizontal"
                subTitle="Giờ bắt đầu mở chức năng cho phép nhà hàng đặt hàng"
                inputType="TimePicker"
              />
            </Form.Item>
            <Form.Item name="OrderTimeTo" rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
              <CInput
                label="Giờ kết thúc đặt hàng"
                direction="horizontal"
                subTitle="Giờ kết thúc mở chức năng cho phép nhà hàng đặt hàng"
                inputType="TimePicker"
              />
            </Form.Item>
            <Form.Item
              name="OrderBeforeDay"
              rules={[
                {
                  validator: checkIsNum
                },
                { required: true, message: 'Trường này là bắt buộc' }
              ]}
            >
              <CInput label="Đặt hàng trước (ngày)" direction="horizontal" subTitle="Đặt hàng trước (ngày)" />
            </Form.Item>
            <Form.Item
              name="DayProcessOrder"
              rules={[
                {
                  validator: checkIsNum
                },
                { required: true, message: 'Trường này là bắt buộc' }
              ]}
            >
              <CInput
                label="Số ngày phải giải quyết đơn hàng tạo mới (ngày)"
                direction="horizontal"
                subTitle="Số ngày phải giải quyết phiếu giao hàng ở trạng thái Tạo mới"
              />
            </Form.Item>
            <Form.Item
              name="DayProcessOrderError"
              rules={[
                {
                  validator: checkIsNum
                },
                { required: true, message: 'Trường này là bắt buộc' }
              ]}
            >
              <CInput
                label="Số ngày phải giải quyết đơn hàng lỗi (ngày)"
                direction="horizontal"
                subTitle="Số ngày phải giải quyết phiếu giao hàng ở trạng thái Không hợp lệ/ ghi chú"
              />
            </Form.Item>
            <Form.Item
              name="DecimalDelivery"
              rules={[
                {
                  validator: checkIsNum
                },
                { required: true, message: 'Trường này là bắt buộc' }
              ]}
            >
              <CInput
                label="Tỉ lệ Đặt, giao, nhận"
                direction="horizontal"
                subTitle="Tỉ lệ Giao hàng / Đặt hàng, Nhận hàng / Giao hàng"
              />
            </Form.Item>
          </div>
        </Card>

        <Card additionClassName="mb-4">
          <CardHeader title="SAP"></CardHeader>
          <div className="pl-8 pr-8 pt-6 pb-6">
            <Form.Item name="SAPEnable" rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
              <CInput
                label="Cho phép SAP Service hoạt động"
                direction="horizontal"
                subTitle="True: Cho phép các services SAP đồng bộ dữ liệu lên PO"
                inputType="Select"
                options={booleanOptions}
              />
            </Form.Item>
            <Form.Item name="SAPListing" rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
              <CInput
                label="Bật Listing"
                direction="horizontal"
                subTitle="Mở listing khi người dùng tìm kiếm vật tư"
                inputType="Select"
                options={booleanOptions}
              />
            </Form.Item>
            <Form.Item name="SAPMoveFileAffterDownload" rules={[{ required: true, message: 'Trường này là bắt buộc' }]}>
              <CInput
                label="Di chuyển file nguồn"
                direction="horizontal"
                subTitle="Di chuyển file nguồn sau khi download"
                inputType="Select"
                options={booleanOptions}
              />
            </Form.Item>
          </div>
        </Card>
        <div className="float-right flex">
          <div className="mr-6">
            <Link to="/setting">
              <CButton type="secondary">Thoát</CButton>
            </Link>
          </div>
          <CButton type="primary" htmlType="submit">
            Lưu
          </CButton>
        </div>
      </Form>
    </ViewWrapper>
  )
}

export default SettingSystemArgument
