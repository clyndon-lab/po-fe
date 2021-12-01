export const AMSright = [
  {
    title: 'Trạng thái',
    dataIndex: 'POStatusId'
  },
  {
    title: 'Kho tiếp nhận',
    dataIndex: 'WarehouseId'
  },
  {
    title: 'Ngày tạo đơn',
    dataIndex: 'CreatedDate'
  },
  {
    title: 'Ngày đặt hàng',
    dataIndex: 'OrderTime'
  },
  {
    title: 'Ngày yêu cầu giao hàng',
    dataIndex: 'OrderTimeTo'
  },
]

export const AMSleft = [
  {
    title: 'Phân loại hàng hóa',
    dataIndex: 'POGoodsTypeId'
  },
  {
    title: 'Đơn vị cung cấp',
    dataIndex: 'POVendorId'
  },
  {
    title: 'Bộ phận yêu cầu',
    dataIndex: 'PlantId'
  },
  {
    title: 'Luồng yêu cầu',
    dataIndex: 'FlowRequest'
  },
  {
    title: 'Loại yêu cầu',
    dataIndex: 'TypeRequest'
  },
  {
    title: 'Mã hệ thống xử lý',
    dataIndex: 'SystemOrderId'
  },
  {
    title: 'Mã giao hàng',
    dataIndex: 'MaGiaoHang'
  }
]

export const SAPright = [
  {
    title: 'Trạng thái',
    dataIndex: 'POStatusId'
  },
  {
    title: 'Ngày tạo phiếu',
    dataIndex: 'CreatedDate'
  },
  {
    title: 'Ngày đặt hàng',
    dataIndex: 'OrderTime'
  },
  {
    title: 'Ngày yêu cầu giao hàng',
    dataIndex: 'OrderTimeTo'
  },
]

export const SAPleft = [
  {
    title: 'Phân loại hàng hóa',
    dataIndex: 'POGoodsTypeId'
  },
  {
    title: 'Đơn vị cung cấp',
    dataIndex: 'POVendorId'
  },
  {
    title: 'BP cung ứng nội bộ',
    dataIndex: 'PlantId'
  },
  {
    title: 'Đơn vị cung ứng',
    dataIndex: 'PlantId'
  },
  {
    title: 'Loại yêu cầu',
    dataIndex: 'TypeRequest'
  },
  {
    title: 'Mã hệ thống xử lý',
    dataIndex: 'SystemOrderId'
  },
  {
    title: 'Mã giao hàng',
    dataIndex: 'MaGiaoHang'
  }
]
export const POright = [
  {
    title: 'Trạng thái',
    dataIndex: 'POStatusId'
  },
  {
    title: 'Kho tiếp nhận',
    dataIndex: 'PlantId',
  },
  {
    title: 'Ngày đặt hàng',
    dataIndex: 'OrderTime'
  },
  {
    title: 'Ngày tạo đơn',
    dataIndex: 'CreatedDate'
  },
  {
    title: 'Ngày yêu cầu giao hàng',
    dataIndex: 'OrderTimeTo'
  },
  {
    title: 'Ghi chú',
    dataIndex: 'Comment'
  },
]

export const POleft = [
  {
    title: 'Phân loại hàng hóa',
    dataIndex: 'POGoodsTypeId'
  },
  {
    title: 'Đơn vị cung cấp',
    dataIndex: 'POVendorId'
  },
  {
    title: 'Nhà cung cấp',
    dataIndex: 'SupplierId'
  },
  {
    title: 'Bộ phận yêu cầu',
    dataIndex: 'PlantId'
  },
  {
    title: 'Nhóm hàng',
    dataIndex: 'POStuffTypeId'
  },
  {
    title: 'Mã hệ thống xử lý',
    dataIndex: 'SystemOrderId'
  },
  {
    title: 'Mã giao hàng',
    dataIndex: 'MaGiaoHang'
  }
]

export const CKright = [
  {
    title: 'Trạng thái',
    dataIndex: 'POStatusId'
  },
  {
    title: 'Ngày tạo phiếu',
    dataIndex: 'CreatedDate',
  },
  {
    title: 'Ngày yêu cầu giao hàng',
    dataIndex: 'OrderTimeTo'
  },
  {
    title: 'Ghi chú',
    dataIndex: 'Comment'
  }
]

export const CKleft = [
  {
    title: 'Phân loại hàng hóa',
    dataIndex: 'POGoodsTypeId'
  },
  {
    title: 'Người đặt hàng',
    dataIndex: 'CreatedBy',
  },
  {
    title: 'Nhà cung cấp',
    dataIndex: 'SupplierId'
  },
  {
    title: 'Nhóm hàng',
    dataIndex: 'POStuffTypeId'
  }
]

export const deliveryStatus = [
  {
    Id: 9,
    StatusCode: 'Draft',
    StatusName: 'Lưu nháp',
    StatusValue: '0'
  },
  {
    Id: 10,
    StatusCode: 'New',
    StatusName: 'Tạo mới',
    StatusValue: '1'
  },
  {
    Id: 11,
    StatusCode: 'Confirmed',
    StatusName: 'Đã xác nhận',
    StatusValue: '2'
  },
  {
    Id: 12,
    StatusCode: 'Valid',
    StatusName: 'Hợp lệ',
    StatusValue: '3'
  },
  {
    Id: 13,
    StatusCode: 'InValid',
    StatusName: 'Chưa hợp lệ',
    StatusValue: '4'
  },
  {
    Id: 14,
    StatusCode: 'Note',
    StatusName: 'Ghi chú',
    StatusValue: '5'
  },
  {
    Id: 15,
    StatusCode: 'Completed',
    StatusName: 'Đã hoàn thành',
    StatusValue: '6'
  },
  {
    Id: 16,
    StatusCode: 'Cancelled',
    StatusName: 'Đã xóa',
    StatusValue: '7'
  },
  {
    Id: 26,
    StatusCode: 'ErrorSync',
    StatusName: 'Lỗi đồng bộ',
    StatusValue: '8'
  },
  {
    Id: 29,
    StatusCode: 'NoDelivery',
    StatusName: 'Chưa nhận hàng',
    StatusValue: '9'
  },
  {
    Id: 30,
    StatusCode: 'SAPProcessing',
    StatusName: 'SAP đang xử lý',
    StatusValue: '10'
  },
  {
    Id: 1,
    StatusCode: 'Draft',
    StatusName: 'Lưu nháp',
    StatusValue: '0'
  },
  {
    Id: 2,
    StatusCode: 'New',
    StatusName: 'Tạo mới',
    StatusValue: '1'
  },
  {
    Id: 3,
    StatusCode: 'Confirmed',
    StatusName: 'Đã xác nhận',
    StatusValue: '2'
  },
  {
    Id: 4,
    StatusCode: 'AutoConfirm',
    StatusName: 'Tự động hoàn thành',
    StatusValue: '3'
  },
  {
    Id: 5,
    StatusCode: 'Note',
    StatusName: 'Ghi chú',
    StatusValue: '4'
  },
  {
    Id: 6,
    StatusCode: 'Updated',
    StatusName: 'Giao hàng một phần',
    StatusValue: '5'
  },
  {
    Id: 7,
    StatusCode: 'Completed',
    StatusName: 'Đã hoàn thành',
    StatusValue: '6'
  },
  {
    Id: 8,
    StatusCode: 'Deleted',
    StatusName: 'Đã xóa',
    StatusValue: '7'
  },
  {
    Id: 25,
    StatusCode: 'ErrorSync',
    StatusName: 'Lỗi đồng bộ',
    StatusValue: '8'
  },
  {
    Id: 28,
    StatusCode: 'Reject',
    StatusName: 'Không xác nhận đơn',
    StatusValue: '10'
  }
]