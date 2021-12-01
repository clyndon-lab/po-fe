import '@assets/css/orders.css'

import { Col, Row } from 'antd'

import SettingCard from './SettingCard'

const data = [
  {
    title: 'Đồng bộ danh mục',
    description: 'Đồng bộ các thông tin về nhà hàng, nhà cung cấp, mặt hàng và danh mục liên kết',
    id: 'category'
  },
  {
    title: 'Tham số hệ thống',
    description: 'Cấu hình các tham số để hỗ trợ Email Hosting, Đặt hàng - trả hàng và SAP',
    id: 'parameter'
  },
  {
    title: 'Danh sách nhà cung cấp',
    description: 'Nơi quản lý nhà cung cấp và cấu hình các liên kết giữa nhà cung cấp với nhà hàng, mặt hàng',
    id: 'supplier'
  },
  {
    title: 'Gửi thông báo',
    description: 'Hỗ trợ gửi thông báo theo kịch bản đến nhà hàng và nhà cung cấp',
    id: 'notification'
  },
  {
    title: 'Quản lý định mức nhà hàng',
    description: 'Cấu hình các thông tin định mức nhân viên, định mức/người và hạn mức đặt hàng cho từng nhà hàng',
    id: 'restaurant'
  },
  {
    title: 'Danh sách nhóm quyền',
    description:
      'Quản lý toàn bộ các nhóm quyền được khởi tạo trên hệ thống PO Portal. Thêm mới/sửa/xóa loại nhóm quyền',
    id: 'account'
  },
  {
    title: 'Cấu hình nhóm hàng',
    description: 'Cấu hình toàn bộ các thông tin về liên kết, đặt hàng, nhận hàng và giao hàng theo nhóm hàng',
    id: 'commodity'
  },
  {
    title: 'Cấu hình hệ thống xử lý',
    description: 'Cấu hình hệ thống xử lý khi đặt hàng',
    id: 'process'
  },
  {
    title: 'Cấu hình địa chỉ nhận hàng',
    description: 'Cấu hình địa chỉ nhận hàng theo plant/sloc',
    id: 'receiver'
  },
  {
    title: 'Cấu hình phân loại hàng hóa',
    description: 'Cấu hình phân loại hàng hóa',
    id: 'classify'
  },
  {
    title: 'Cấu hình loại nhóm hàng',
    description: 'Cấu hình loại nhóm hàng cho nhà cung cấp',
    id: 'stufftype'
  },
]

const SettingList = () => {

  return (
    <div>
      <Row gutter={20}>
        {data.map((item, index) => (
          <Col key={index} span={12} className="mb-6">
            <SettingCard title={item.title} description={item.description} id={item.id}></SettingCard>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SettingList
