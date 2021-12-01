export const radioData = [
  {
    label: 'Nhà cung cấp',
    value: 0,
  },
  {
    label: 'Bộ phận cung ứng nội bộ',
    value: 1,
    // disabled: true
  }
]

export const vendors = [
  {
    label: 'Nhà cung cấp',
    value: 1,
  },
  {
    label: 'Bộ phận cung ứng nội bộ',
    value: 2,
  }
]

export const selectInputData = [
  {
    Name: 'Thực phẩm',
    Code: 'tp'
  },
  {
    Name: 'Phi thực phẩm - Hàng tiêu hao',
    Code: 'ptp'
  },
  {
    Name: 'Phi thực phẩm - Vật tư và công cụ dụng cụ',
    Code: 'dc'
  }
]

export const plantList = [
  {
    name: 'Asima Điện Biên Phủ',
    value: 'asima1'
  },
  {
    name: 'Asima Điện Biên Phủ 2',
    value: 'asima2'
  },
  {
    name: 'Asima Điện Biên Phủ 3',
    value: 'asima3'
  },
]

export const slocList = [
  {
    name: 'Quầy Bar',
    value: 'bar'
  },
  {
    name: 'Bếp',
    value: 'bep'
  },
  {
    name: 'Lễ Tân',
    value: 'leTan',
  },
]

export const tableSelectData = [
  {
    Name: 'Cải ngọt dài 20-35cm _HCM',
    Code: 'Cải ngọt dài',
    code: 'NRAU045 - 10003383'
  },
  {
    Name: 'Cải xanh 20-35cm _HCM',
    Code: 'Cải xanh',
    code: 'NRAU011 - 10003367'
  },
  {
    Name: 'Nấm kim châm',
    Code: 'Nấm kim châm',
    code: 'NRAU011 - 10003368'
  }
]

export const tableData = [
  {
    key: '0',
    checked: false,
    maHangHoa: 'NRAU045 - 10003383',
    tenHangHoa: {
      name: 'NRAU045 - 10003383 - Cải ngọt dài 20-35cm _HCM',
      value: 'Cải ngọt dài'
    },
    sl: '1',
    dv: 'KG',
    plant: {
      name: 'Asima Điện Biên Phủ',
      value: 'asima1'
    },
    sloc: {
      name: 'Quầy Bar',
      value: 'bar',
    }
  },
  {
    key: '1',
    checked: false,
    maHangHoa: 'NRAU011 - 10003367',
    tenHangHoa: {
      name: 'NRAU045 - 10003383 - Cải xanh 20-35cm _HCM',
      value: 'Cải xanh'
    },
    sl: '1',
    dv: 'KG',
    plant: {
      name: 'Asima Điện Biên Phủ',
      value: 'asima2'
    },
    sloc: {
      name: 'Bếp',
      value: 'bep',
    }
  },
]

export const exampleQueries = {
  POGoodsTypeId: 1,
  POVendorId: 1,
  SupplierId: null,
  POStuffTypeId: null,
  PlantId: 5,
  POStatusId: 1,
  FlowRequest: 'string',
  TypeRequest: 'string',
  WarehouseReceived: 'string',
  OrderTime: null,
  OrderTimeTo: null,
  OrderBy: 'admin',
  CreatedBy: 'admin',
  SumOrder: 1,
  Images: 'string',
  CreatedType: 1,
  OrderIsSale: false,
  OrderIsBefore: true,
  CosCenter: 'CosCenter',
  CKTicketId: 0,
  SystemOrderId: 1,
  Email: null,
  DateOfIssue: '2021-11-22T02:53:40.633Z',
  TypeProductOrderId: 0,
  RequestTypeId: 0,
  WarehouseId: 0,
  POOrderMaterialMaps: []
}

export const updateQueries = {
  Id: 2,
  POGoodsTypeId: 1,
  POVendorId: 1,
  SupplierId: 1,
  POStuffTypeId: 1,
  PlantId: 5,
  POStatusId: 3,
  FlowRequest: 'string',
  TypeRequest: 'string',
  WarehouseReceived: null,
  OrderCode: 'PO000000002',
  OrderTime: '2021-10-31T15:41:53.097',
  OrderTimeTo: '2021-10-31T15:41:53.097',
  OrderBy: 'admin',
  Comment: null,
  CreatedDate: '2021-11-01T00:27:17.51',
  CreatedBy: 'admin',
  LastedUpdate: '2021-11-01T00:27:17.51',
  Deleted: false,
  DeliveryComplete: null,
  SumDelivery: null,
  SumOrder: 4000,
  AdminComment: null,
  Images: 'string',
  CreatedType: 1,
  OrderIsSale: true,
  OrderIsBefore: true,
  IsSAP: false,
  CosCenter: 'CosCenter',
  CKTicketId: 0,
  IsSale: null,
  TypeProductOrderId: 1,
  RequestTypeId: 1,
  WarehouseId: 1,
  POOrderMaterialMaps: [
    {
      Id: 1,
      MaterialId: 2,
      PlantId: 5,
      NotDeliveredQuantity: 32,
      LastQuantity: 32,
      UseQuantity: 32,
      StandardQuantity: 23,
      OrderQuantity: 23,
      DeliveredQuantity: 23,
      ReceivedQuantity: 23,
      Unit: '23',
      Price: 323,
      IsSale: true,
      Images: 'string',
      SumPrice: 0,
      IsNotNorm: true,
      NormQuantity: 0,
      LineNbr: 0,
      SAPUnit: 'eb',
      StorageLocationId: 3,
      CKTicketId: 0
    }
  ],
  DetailsIdDelete: []
}