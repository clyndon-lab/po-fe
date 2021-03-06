export const tableData = [
  {
    maHangHoa: 'CP0123123123782',
    maDonHang: '01123246454648',
    nhomHang: 'rau củ quả',
    ngayTao: '28/07/2021',
    nhaHang: 'Kichi Kichi Lạc Long Quân, Tây Hồ, Hà Nội',
    supplier: 'Nhà cung cấp thực phẩm sạch ABC',
    status: 'complete',
  },
  {
    maHangHoa: 'CP0123123123783',
    maDonHang: '01123246454648',
    nhomHang: 'rau củ quả',
    ngayTao: '28/07/2021',
    nhaHang: 'Kichi Kichi Lạc Long Quân, Tây Hồ, Hà Nội',
    supplier: 'Nhà cung cấp thực phẩm sạch ABC',
    status: 'complete',
  },
  {
    maHangHoa: 'CP0123123123784',
    maDonHang: '01123246454648',
    nhomHang: 'rau củ quả',
    ngayTao: '28/07/2021',
    nhaHang: 'Kichi Kichi Lạc Long Quân, Tây Hồ, Hà Nội',
    supplier: 'Nhà cung cấp thực phẩm sạch ABC',
    status: 'complete',
  },
]

export const createComplaintTable = [
  {
    goodsId: 'NRAU045 - 10003383', // Unknown fields in queries
    goodsName: 'Cải ngọt dài 20-35cm _HCM', // Unknown fields in queries
    OrderedQuantity: '5',
    DeliveredQuantity: '5',
    ReceivedQuantity: '5',
    Unit: 'KG',
    ErrorType: '0002 - Lỗi chất lượng',
    Error: '',
    ErrorDescription: '',
    ComplaintQuantity: '',
    RequestQuantity: '',
    RequestDate: '',
    ErrorReason: '',
    PreventionAction: '',
    PreventionActionDescription: '',
    TypeOfError: '',
    Priority: '',
    Status: 'complete',
  },
]

export const defaultInsertComplaint = {
  Id: 0,
  Code: 'string',
  Status: 'string',
  ProductGroup: 'string',
  OrderCode: 'string',
  DeliveryCode: 'string',
  DeliveredDate: '2021-10-21T11:56:01.438Z',
  Supplier: 'string',
  SupplierCode: 'string',
  RestaurantMobile: 'string',
  RestaurantCode: 'string',
  Restaurant: 'string',
  CreatedByName: 'string',
  CreatedDate: '2021-10-21T11:56:01.438Z',
  LastModifiedDate: '2021-10-21T11:56:01.438Z',
  CreatedBy: 'string',
  LastModifiedByName: 'string',
  LastModifiedBy: 'string'
}

export const defaultMergeComplaint = {
  Id: 0,
  Code: 'string',
  Material: 'string',
  Name: 'string',
  Unit: 'string',
  OrderedQuantity: 0,
  DeliveredQuantity: 0,
  ReceivedQuantity: 0,
  Error: 'string',
  ErrorDescription: 'string',
  ItemFiles: 'string',
  ComplaintQuantity: 0,
  RequestQuantity: 0,
  RequestDate: '2021-10-22T07:51:08.019Z',
  ErrorReason: 'string',
  ErrorReasonDescription: 'string',
  Action: 'string',
  ActionDescription: 'string',
  PreventionAction: 'string',
  PreventionActionDescription: 'string',
  ErrorType: 'string',
  Priority: 'string',
  Status: 'string',
  CreatedDate: '2021-10-22T07:51:08.019Z',
  LastModifiedDate: '2021-10-22T07:51:08.019Z',
  CreatedBy: 'string',
  LastModifiedBy: 'string',
  Complaint_Id: 0,
  SyncedMessage: 'string',
  TypeOfError: 'string'
}
export const defaultGetComplaintList = {
  ComplaintCode: '',
  OrderCode: '',
  DeliveryCode: '',
  ProductGroup: '',
  CreateReceiptFrom: '2021-10-22T08:25:29.030Z',
  CreateReceiptTo: '2021-10-22T08:25:29.030Z',
  RestaurantCode: '',
  SupplierCode: '',
  Take: 1,
  Skip: 0
}