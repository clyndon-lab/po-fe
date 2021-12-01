import '@assets/css/orders.css'

import { CopyOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import ViewWrapper from '@components/common/ViewWrapper'
import InputGroup from '@components/Layout/InputGroup'
import { AMSleft, AMSright, deliveryStatus, POleft, POright, SAPleft, SAPright } from '@static/orderDetail.static'
import { updateQueries } from '@static/viewCreateOrder.static'
import {
  getAMSCategories,
  getAMSConfigQuantity,
  getAMSProducts,
  getAMSStocks,
  // getPOStatusType,
  getSpecificMaterialList,
  getSupplierInfoAsync
} from '@store/thunks/combo.thunk'
// import { createDeliveryAction } from '@store/thunks/delivery.thunk'
import {
  // createDeliveryTicket,
  // deleteOrder,
  fetchOrderByID,
  fetchPOGoodTypes,
  fetchStuffTypes,
  fetchSupplierByPage,
  updateOrderAction
  // updateStatus
} from '@store/thunks/orders.thunk'
import { getAppPlantById, getFullRestaurant } from '@store/thunks/setting.thunk'
import { dateToISO, findCurrentMaterialById, isoToStringDateCustom } from '@utils/core.utils'
import { Button, Col, Form, InputNumber, message, Row, Select } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

const { Option } = Select

const demoCreateDeliveryQueries = {
  Id: 0,
  OrderId: 0,
  DeliveryCode: 'str',
  DeliveryTime: '2021-10-31T08:34:38.236Z',
  DeliveryBy: 'str',
  ReceiveBy: 'str',
  SupplierNote: 'str',
  PlantNote: 'str',
  POStatusId: 0,
  CreatedBy: 'str',
  Deleted: true,
  CreatedType: 0,
  ReceiveDate: '2021-10-31T08:34:38.236Z',
  HaveStuffSale: true,
  NotDelivery: true,
  IsSAP: true,
  PODeliveryMaterialMaps: [
    {
      Id: 0,
      DeliveryId: 0,
      MaterialId: 0,
      OrderQuantity: 0,
      DeliveryQuantity: 0,
      ReceiveQuantity: 0,
      Unit: 'str',
      Price: 0,
      IsSale: true,
      Images: 'str',
      SumPrice: 0,
      IsNotNorm: true,
      NormQuantity: 0,
      HasNote: true,
      SupplierNote: 'str',
      LastedUpdate: '2021-10-31T08:34:38.236Z',
      LineNbr: 0,
      SAPUnit: 'str'
    }
  ]
  // DetailsIdDelete: [
  //   {
  //     Id: 0
  //   }
  // ]
}

const systems = [
  {
    Id: 1,
    Name: 'PO App'
  },
  {
    Id: 2,
    Name: 'SAP Fiori'
  },
  {
    Id: 3,
    Name: 'AMS'
  },
  {
    Id: 0,
    Name: 'Không tìm thấy hệ thống'
  }
]

const OrderDetail = () => {
  const history = useHistory()
  const { params } = useRouteMatch()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const { ordersByID, poGoodTypes, suppliers, stuffTypes, isSuccess } = useSelector((state) => state['orders'])
  const {
    // statusType,
    categories,
    flowRequests,
    specMaterialList,
    productsAMS,
    configQuantityAMS,
    stocksAMS,
    loadingAMSProducts,
    supplierInfo
  } = useSelector((state) => state['combo'])
  const { fullRestaurant, appPlantById } = useSelector((state) => state['settings'])

  // const [isShowConfirm] = useState(false)
  const [isShowShip] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState(demoCreateDeliveryQueries)
  const [selectingStock, setSelectingStock] = useState(null)
  const [selectingSaleStock, setSelectingSaleStock] = useState(null)
  const [selectingSAPStock, setSelectingSAPStock] = useState(null)
  const [selectingAMSStock, setSelectingAMSStock] = useState(null)
  const [orderData, setOrderData] = useState(updateQueries)
  const [dataTable, setDataTable] = useState([])
  const [saleTableData, setSaleTableData] = useState([])
  const [dataLeft, setDataLeft] = useState([])
  const [dataRight, setDataRight] = useState([])
  const [isOnEdit, setIsOnEdit] = useState(false)
  const [isShowSaleTable, setShowSaleTable] = useState(false)
  const [isDelPOStock, setIsDelPOStock] = useState(false)
  const [isDelSaleStock, setDelSaleStock] = useState(false)

  const [statusId, setStatusId] = useState(0)

  useEffect(() => {
    dispatch(fetchOrderByID({ id: params?.id }))
    dispatch(fetchPOGoodTypes())
    // dispatch(getPOStatusType({ statusType: 'order' }))
    dispatch(getFullRestaurant())
    dispatch(fetchStuffTypes())
    dispatch(fetchSupplierByPage({ skip: 1, take: 3000 }))
  }, [])

  // useEffect(() => {

  // }, [orderData])

  useEffect(() => {
    setStatusId(ordersByID?.POStatusId)
    if (ordersByID?.CKTicketId) {
      message.info('Đây là đơn hàng CK!')
      // setTimeout(() => history.push('/orders'), 1000)
    }

    setOrderData({ ...handleFormatQueries(ordersByID), SystemOrderId: ordersByID?.SystemOrderId })

    setDataTable(ordersByID?.POOrderMaterialMaps?.filter((item) => !item.IsSale))
    setSaleTableData(ordersByID?.POOrderMaterialMaps?.filter((item) => item.IsSale))

    if (ordersByID?.SystemOrderId === 3) {
      handleSetData(AMSleft, AMSright)
      setOrderData({
        ...handleFormatQueries(ordersByID),
        TypeProductOrderId: Number(ordersByID?.TypeRequest),
        RequestTypeId: Number(ordersByID?.FlowRequest),
        WarehouseId: Number(ordersByID?.WarehouseReceived),
        SystemOrderId: ordersByID?.SystemOrderId
      })
      dispatch(
        getAMSCategories({
          CostCenter: '10GG410001' || ordersByID?.CostCenter,
          Email: 'hn.gogi.bigc@ggg.com.vn' || ordersByID?.Email
        })
      )
      dispatch(
        getAMSProducts({
          CostCenter: '10GG410001' || ordersByID?.CostCenter,
          Email: 'hn.gogi.bigc@ggg.com.vn' || ordersByID?.Email,
          RequestTypeId: ordersByID?.FlowRequest,
          TypeProductOrderId: ordersByID?.TypeRequest,
          WarehouseId: ordersByID?.WarehouseReceived ?? 1
        })
      )
      dispatch(
        getAMSStocks({
          RequestTypeId: ordersByID?.FlowRequest,
          Email: 'hn.37thstreet.indochina@ggg.com.vn'
        })
      )
    }
    if (ordersByID?.SystemOrderId === 2) {
      dispatch(getAppPlantById(ordersByID?.PlantId))
      dispatch(getSpecificMaterialList({ suppliersId: ordersByID?.SupplierId }))
      handleSetData(SAPleft, SAPright)
    }
    if (ordersByID?.SystemOrderId === 1) {
      dispatch(getAppPlantById(ordersByID?.PlantId))
      dispatch(getSupplierInfoAsync({ Id: ordersByID?.SupplierId }))
      dispatch(getSpecificMaterialList({ suppliersId: ordersByID?.SupplierId }))
      handleSetData(POleft, POright)
      const findSale = ordersByID?.POOrderMaterialMaps?.find((item) => item?.IsSale)
      console.log('findSale', findSale)
      if (findSale) setShowSaleTable(true)
      else setShowSaleTable(false)
    }
  }, [ordersByID])

  useEffect(() => {
    console.log('configQuantityAMS', configQuantityAMS)
    if (configQuantityAMS?.list_quantity?.length) {
      console.log('vo day222')
      setSelectingAMSStock({
        ...selectingAMSStock,
        Unit: configQuantityAMS?.list_quantity?.[0]?.list_uom?.[0]?.name,
        LastQuantity: configQuantityAMS?.list_quantity?.[0]?.order_qty_nearest,
        UseQuantity: configQuantityAMS?.list_quantity?.[0]?.qty_use,
        NotDeliveredQuantity: configQuantityAMS?.list_quantity?.[0]?.qty_in_process,
        StandardQuantity: configQuantityAMS?.list_quantity?.[0]?.qty_par_stock,
        Price: configQuantityAMS?.list_quantity?.[0]?.price_unit_plan
      })
    }
  }, [configQuantityAMS])

  useEffect(() => {
    if (isDelPOStock) {
      if (ordersByID?.SystemOrderId === 1) addStock(true)
      if (ordersByID?.SystemOrderId === 2) addSAPStock(true)
      if (ordersByID?.SystemOrderId === 3) addAMSStock(true)
      setIsDelPOStock(false)
    }
  }, [isDelPOStock])

  useEffect(() => {
    if (isDelSaleStock) {
      if (ordersByID?.SystemOrderId === 1) addSaleStock(true)
      setDelSaleStock(false)
    }
  }, [isDelSaleStock])

  const findSupplier = (id) => {
    const a = suppliers?.find((item) => item.Id === id)
    console.log('asdqwe', a)
    return a
  }
  const findSystem = (id) => systems.find((item) => item.Id == id)
  const findStuffType = (id) => stuffTypes?.find((item) => item.Id == id)
  const findFlowReQuest = (id) => flowRequests?.find((item) => item.id === id)
  const findTypeReQuest = (id) => categories?.find((item) => item.id === id)
  const findStock = (id) => {
    console.log(
      'stocksAMS',
      stocksAMS?.find((item) => item.id === id)
    )
  }
  const handleSetData = (left, right) => {
    setDataLeft(left)
    setDataRight(right)
  }

  const handleFormatQueries = (queries) => {
    var data = {
      ...queries,
      POOrderMaterialMaps: queries?.POOrderMaterialMaps.map(
        // eslint-disable-next-line
        ({ LongName, SlocDes, StorageLocation, ReceiveAddress, ...keep }) => keep
      ),
      TypeProductOrderId: null,
      RequestTypeId: null,
      WarehouseId: null,
      DetailsIdDelete: []
    }
    delete data?.SystemOrderId
    delete data?.POOrderHistories
    return data
  }

  const formatDisplayData = (value, formatType) => {
    if (formatType === 'POGoodsTypeId') return poGoodTypes?.find((item) => item.Id === value)?.Name
    if (formatType === 'POVendorId') return value === 1 ? 'Bộ phận cung ứng nội bộ' : 'Nhà cung cấp'
    if (formatType === 'SupplierId') {
      if (ordersByID?.SystemOrderId === 1) return supplierInfo?.SupplierName
      return findSupplier(value)?.LongName ?? 'string'
    }
    if (formatType === 'SystemOrderId') return findSystem(value)?.Name
    if (formatType === 'POStatusId')
      return <CTag type={deliveryStatus?.find((item) => item.Id === value)?.StatusCode} />
    if (formatType === 'PlantId') return fullRestaurant?.find((item) => item.Id === value)?.Name
    if (formatType === 'OrderTime') return isoToStringDateCustom(value, 'dd/MM/yyyy hh:mm')
    if (formatType === 'CreatedDate') return isoToStringDateCustom(value, 'dd/MM/yyyy hh:mm')
    if (formatType === 'OrderTimeTo') return isoToStringDateCustom(value, 'dd/MM/yyyy hh:mm')
    if (formatType === 'POStuffTypeId') return findStuffType(value)?.Name
    if (formatType === 'FlowRequest') return findFlowReQuest(Number(value))?.name
    if (formatType === 'TypeRequest') return findTypeReQuest(Number(value))?.name ?? 'Yêu cầu mượn hàng'
    if (formatType === 'WarehouseId') console.log('asd', findStock(value)?.name)

    return value
  }

  const InfoSections = (value) => {
    return (
      <Row gutter={1} className="mt-6 first:mt-0">
        <Col span={8}>
          <p className="text-right text-lg font-barlow">{value?.title}:</p>
        </Col>
        <Col span={12}>
          <p className="text-left text-lg  ml-5 text-dark font-medium font-barlow">{value?.value}</p>
          <p className="text-left text-lg  ml-5 text-dark font-medium font-barlow">
            {formatDisplayData(ordersByID?.[value?.dataIndex], value?.dataIndex)}
          </p>
        </Col>
      </Row>
    )
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(ordersByID?.OrderCode)
    message.success('Đã sao chép mã đơn hàng!')
  }

  const POTableColumns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'MaterialId',
      key: 'name',
      width: '10%',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'MaterialName',
      render: (_, record) => <p>{findCurrentMaterialById(specMaterialList, record.MaterialId)?.MaterialName}</p>
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'OrderQuantity',
      align: 'center',
      key: 'OrderQuantity',
      render: (text, record) =>
        isOnEdit ? (
          <InputNumber
            min={0}
            defaultValue={text}
            onChange={(e) => handleChangeOrder(record, 'OrderQuantity', e)}
            precision={2}
          />
        ) : (
          <p>{text}</p>
        )
    },
    {
      title: 'ĐVT',
      dataIndex: 'Unit'
    },
    {
      title: 'Kho vậy lý (plant)',
      dataIndex: 'PlantId',
      render: (text, record) =>
        isOnEdit ? (
          <Select
            className="block"
            onChange={(e) => handleChangeOrder(record, 'PlantId', e)}
            defaultValue={ordersByID?.PlantId}
            optionFilterProp="children"
            showSearch
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            <Option value={appPlantById?.Id}>{appPlantById?.Name}</Option>
          </Select>
        ) : (
          <p>{appPlantById?.Name}</p>
        )
    },
    {
      title: 'Vị trí lưu kho',
      dataIndex: 'StorageLocationId',
      render: (text, record) =>
        isOnEdit ? (
          <Select
            className="block"
            onChange={(e) => handleChangeOrder(record, 'StorageLocationId', e)}
            defaultValue={text ?? ordersByID?.PODeliveryMaterialMaps[0].StorageLocationId}
            optionFilterProp="children"
            showSearch
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {appPlantById?.SAPStorageLocation?.map(({ SlocDes, Id }, idx) => (
              <Option value={Id} key={idx}>
                {SlocDes}
              </Option>
            ))}
          </Select>
        ) : (
          <p>{appPlantById?.SAPStorageLocation?.find((item) => item.Id === text)?.SlocDes}</p>
        )
    },
    {
      title: '',
      dataIndex: '',
      render: (record) => (
        <Button
          type="text"
          disabled={!isOnEdit && ordersByID?.POStatusId === 1}
          icon={<DeleteOutlined />}
          onClick={() => delStock(record)}
        ></Button>
      )
    }
  ]
  const SaleTableColumns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'MaterialId',
      key: 'name',
      width: '10%',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'MaterialName',
      render: (_, record) => <p>{findCurrentMaterialById(specMaterialList, record.MaterialId)?.MaterialName}</p>
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'OrderQuantity',
      align: 'center',
      key: 'OrderQuantity',
      render: (text, record) =>
        isOnEdit ? (
          <InputNumber
            min={0}
            defaultValue={text}
            onChange={(e) => handleChangeOrder(record, 'OrderQuantity', e)}
            precision={2}
          />
        ) : (
          <p>{text}</p>
        )
    },
    {
      title: 'ĐVT',
      dataIndex: 'Unit'
    },
    {
      title: 'Kho vậy lý (plant)',
      dataIndex: 'PlantId',
      render: (text, record) =>
        isOnEdit ? (
          <Select
            className="block"
            onChange={(e) => handleChangeOrder(record, 'PlantId', e)}
            defaultValue={ordersByID?.PlantId}
            optionFilterProp="children"
            showSearch
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            <Option value={appPlantById?.Id}>{appPlantById?.Name}</Option>
          </Select>
        ) : (
          <p>{appPlantById?.Name}</p>
        )
    },
    {
      title: 'Vị trí lưu kho',
      dataIndex: isOnEdit ? 'StorageLocationId' : 'SlocDes',
      render: (text, record) =>
        isOnEdit ? (
          <Select
            className="block"
            onChange={(e) => handleChangeOrder(record, 'StorageLocationId', e)}
            defaultValue={text ?? ordersByID?.PODeliveryMaterialMaps[0].StorageLocationId}
            optionFilterProp="children"
            showSearch
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {appPlantById?.SAPStorageLocation?.map(({ SlocDes, Id }, idx) => (
              <Option value={Id} key={idx}>
                {SlocDes}
              </Option>
            ))}
          </Select>
        ) : (
          <p>{text}</p>
        )
    },
    {
      title: '',
      dataIndex: '',
      render: (record) => (
        <Button
          type="text"
          disabled={!isOnEdit && ordersByID?.POStatusId === 1}
          icon={<DeleteOutlined />}
          onClick={() => delSaleStock(record)}
        ></Button>
      )
    }
  ]
  const AMSColumns = [
    {
      title: 'Vật tư chi phí',
      dataIndex: 'MaterialId',
      render: (text) => <p>{productsAMS?.find((item) => item.SAPId === text)?.MaterialName}</p>
    },
    {
      title: 'ĐVT',
      dataIndex: 'Unit',
      render: (text) => <p>{text === '' ? 'Cái' : text}</p>
    },
    {
      title: 'SL chưa giao',
      dataIndex: 'NotDeliveredQuantity',
      render: (text) => <p>{text === null ? '- - -' : text}</p>
    },
    {
      title: 'SL đặt gần nhất',
      dataIndex: 'LastQuantity',
      render: (text) => <p>{text === null ? '- - -' : text}</p>
    },
    {
      title: 'SL đang sử dụng',
      dataIndex: 'UseQuantity',
      render: (text) => <p>{text === null ? '- - -' : text}</p>
    },
    {
      title: 'SL tiêu chuẩn',
      dataIndex: 'StandardQuantity',
      render: (text) => <p>{text === null ? '- - -' : text}</p>
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'OrderQuantity',
      render: (text, record) =>
        isOnEdit ? (
          <InputNumber
            min={0}
            defaultValue={text}
            onChange={(e) => handleChangeOrder(record, 'OrderQuantity', e)}
            precision={2}
          />
        ) : (
          <p>{text}</p>
        )
    },
    {
      title: 'Đơn giá dự kiện',
      dataIndex: 'Price',
      render: (text) => <p>{text === null ? '- - -' : text}</p>
    },
    {
      title: 'Tổng tiền dự kiến',
      dataIndex: 'SumPrice'
    },
    {
      title: '',
      dataIndex: '',
      render: (record) => (
        <Button
          type="text"
          disabled={!isOnEdit && ordersByID?.POStatusId === 1}
          icon={<DeleteOutlined />}
          onClick={() => delAMSStock(record)}
        ></Button>
      )
    }
  ]

  const FioriTableColumns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'MaterialId'
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'MaterialName',
      render: (_, record) => {
        console.log('123', specMaterialList)
        return <p>{findCurrentMaterialById(specMaterialList, record.MaterialId)?.MaterialName}</p>
      }
    },
    {
      title: 'ĐVT',
      dataIndex: 'Unit'
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'OrderQuantity',
      render: (text, record) =>
        isOnEdit ? (
          <InputNumber
            min={0}
            defaultValue={text}
            onChange={(e) => handleChangeOrder(record, 'OrderQuantity', e)}
            precision={2}
          />
        ) : (
          <p>{text}</p>
        )
    },
    {
      title: 'SL giao',
      dataIndex: 'DeliveredQuantity',
      render: (text) => <p>{text === 0 ? '- - -' : text}</p>
    },
    {
      title: 'SL nhận',
      dataIndex: 'ReceivedQuantity',
      render: (text) => <p>{text === 0 ? '- - -' : text}</p>
    },
    {
      title: 'Khu vực lưu trữ',
      dataIndex: 'StorageLocationId',
      render: (text) => <p>{appPlantById?.SAPStorageLocation?.find((item) => item.Id === text)?.SlocDes}</p>
    },
    {
      title: '',
      dataIndex: '',
      render: (record) => (
        <Button
          type="text"
          disabled={!isOnEdit && ordersByID?.POStatusId === 1}
          icon={<DeleteOutlined />}
          onClick={() => delSAPStock(record)}
        ></Button>
      )
    }
  ]

  const ToolBar = (
    <div className="flex">
      <CButton h={40} icon={<CopyOutlined />} onClick={handleCopy}>
        Sao chép
      </CButton>
      <div className="ml-6">
        <CButton h={40} icon={<PrinterOutlined />}>
          In phiếu
        </CButton>
      </div>
    </div>
  )

  // const handleDeleteOrder = () => {
  //   dispatch(deleteOrder({ id: params?.id }, history))
  // }
  useEffect(() => selectingStock && addStock(false), [selectingStock])
  useEffect(() => selectingSAPStock && addSAPStock(false), [selectingSAPStock])
  useEffect(() => {
    if (selectingAMSStock && selectingAMSStock.Unit === '') addAMSStock(false)
  }, [selectingAMSStock])
  useEffect(() => selectingSaleStock && addSaleStock(false), [selectingSaleStock])

  const addStock = (isClick) => {
    if (isClick) {
      if (selectingStock) {
        const filter = orderData.POOrderMaterialMaps.filter((item) => !item.IsSale)
        console.log('filter', filter)
        setDataTable(filter)
        form.setFieldsValue({ deleteItem: undefined })
        setSelectingStock(null)
      } else !isDelPOStock && message.info('Vui lòng chọn hàng hóa')
      return
    }
    const isExistStock = dataTable.find((item) => item.MaterialId === selectingStock.MaterialId)

    if (isExistStock) message.info('Đã tồn tại loại hàng này trong danh sách')
    else {
      if (selectingStock) {
        // setDataTable([...dataTable, selectingStock])
        setOrderData({
          ...orderData,
          POOrderMaterialMaps: [
            ...orderData.POOrderMaterialMaps,
            {
              MaterialId: selectingStock.MaterialId,
              PlantId: selectingStock.PlantId,
              NotDeliveredQuantity: 0,
              LastQuantity: 0,
              UseQuantity: 0,
              StandardQuantity: 0,
              OrderQuantity: selectingStock.OrderQuantity,
              DeliveredQuantity: 0,
              ReceivedQuantity: 0,
              Unit: selectingStock.Unit,
              Price: 0,
              IsSale: false,
              Images: 'string',
              SumPrice: 0,
              IsNotNorm: true,
              NormQuantity: 0,
              LineNbr: 0,
              SAPUnit: selectingStock.Unit,
              StorageLocationId: selectingStock.StorageLocationId,
              CKTicketId: 0
            }
          ]
        })
      }
    }
    // console.log('orderData', orderData)
  }
  const addSAPStock = (isClick) => {
    if (isClick) {
      if (selectingSAPStock) {
        setDataTable(orderData.POOrderMaterialMaps)
        form.setFieldsValue({ deleteItem: undefined })
        setSelectingStock(null)
      } else !isDelPOStock && message.info('Vui lòng chọn hàng hóa')
      return
    }

    const isExistStock = dataTable.find((item) => item.MaterialId === selectingSAPStock.MaterialId)

    if (isExistStock) message.info('Đã tồn tại loại hàng này trong danh sách')
    else {
      if (selectingSAPStock) {
        setOrderData({
          ...orderData,
          POOrderMaterialMaps: [
            ...orderData.POOrderMaterialMaps,
            {
              MaterialId: selectingSAPStock.MaterialId,
              PlantId: ordersByID?.PlantId,
              NotDeliveredQuantity: 0,
              LastQuantity: 0,
              UseQuantity: 0,
              StandardQuantity: 0,
              OrderQuantity: selectingSAPStock.OrderQuantity,
              DeliveredQuantity: selectingSAPStock.DeliveredQuantity,
              ReceivedQuantity: selectingSAPStock.ReceivedQuantity,
              Unit: selectingSAPStock.Unit,
              Price: 0,
              IsSale: false,
              Images: 'string',
              SumPrice: 0,
              IsNotNorm: true,
              NormQuantity: 0,
              LineNbr: 0,
              SAPUnit: selectingSAPStock.Unit,
              StorageLocationId: selectingSAPStock.StorageLocationId,
              CKTicketId: 0
            }
          ]
        })
      }
    }
    // console.log('orderData', orderData)
  }

  const addSaleStock = (isClick) => {
    if (isClick) {
      if (selectingSaleStock) {
        const filter = orderData.POOrderMaterialMaps.filter((item) => item.IsSale)
        console.log('filter', filter)
        setSaleTableData(filter)
        form.setFieldsValue({ deleteItem2: undefined })
        setSelectingSaleStock(null)
      } else !isDelSaleStock && message.info('Vui lòng chọn hàng hóa')
      return
    }
    const isExistStock = saleTableData.find((item) => item.MaterialId === selectingSaleStock.MaterialId)

    if (isExistStock) message.info('Đã tồn tại loại hàng này trong danh sách')
    else {
      if (selectingSaleStock) {
        setOrderData({
          ...orderData,
          POOrderMaterialMaps: [
            ...orderData.POOrderMaterialMaps,
            {
              MaterialId: selectingSaleStock.MaterialId,
              PlantId: selectingSaleStock.PlantId,
              NotDeliveredQuantity: 0,
              LastQuantity: 0,
              UseQuantity: 0,
              StandardQuantity: 0,
              OrderQuantity: selectingSaleStock.OrderQuantity,
              DeliveredQuantity: 0,
              ReceivedQuantity: 0,
              Unit: selectingSaleStock.Unit,
              Price: 0,
              IsSale: true,
              Images: 'string',
              SumPrice: 0,
              IsNotNorm: true,
              NormQuantity: 0,
              LineNbr: 0,
              SAPUnit: selectingSaleStock.Unit,
              StorageLocationId: selectingSaleStock.StorageLocationId,
              CKTicketId: 0
            }
          ]
        })
      }
    }
    // console.log('orderData', orderData)
  }
  const addAMSStock = (isClick) => {
    if (isClick) {
      if (selectingAMSStock) {
        setDataTable(orderData.POOrderMaterialMaps)
        form.setFieldsValue({ deleteItem: undefined })
        setSelectingAMSStock(null)
      } else !isDelPOStock && message.info('Vui lòng chọn hàng hóa')
      return
    }
    const isExistStock = dataTable?.find((item) => item.MaterialId === selectingAMSStock.MaterialId)

    if (isExistStock) message.info('Đã tồn tại loại hàng này trong danh sách')
    else {
      if (selectingAMSStock) {
        // setDataTable([...dataTable, selectingAMSStock])
        setOrderData({
          ...orderData,
          POOrderMaterialMaps: [
            ...orderData.POOrderMaterialMaps,
            {
              MaterialId: selectingAMSStock.MaterialId,
              PlantId: ordersByID?.PlantId,
              NotDeliveredQuantity: selectingAMSStock.NotDeliveredQuantity,
              LastQuantity: selectingAMSStock.LastQuantity,
              UseQuantity: selectingAMSStock.UseQuantity,
              StandardQuantity: selectingAMSStock.StandardQuantity,
              OrderQuantity: selectingAMSStock.OrderQuantity,
              DeliveredQuantity: 0,
              ReceivedQuantity: 0,
              Unit: selectingAMSStock.Unit,
              Price: selectingAMSStock.Price,
              IsSale: false,
              Images: 'string',
              SumPrice: selectingAMSStock.Unit * selectingAMSStock.Price || 0,
              IsNotNorm: true,
              NormQuantity: 0,
              LineNbr: 0,
              SAPUnit: selectingAMSStock.Unit,
              StorageLocationId: null,
              CKTicketId: 0
            }
          ]
        })
      }
    }
    // console.log('orderData', orderData)
  }

  const onSelectingPOStock = (value) => {
    const index = specMaterialList.findIndex((item) => item.Id === value)
    console.log('index', index)
    setSelectingStock({
      MaterialId: specMaterialList[index].Id,
      LongName: specMaterialList[index].MaterialName,
      OrderQuantity: 1,
      Unit: specMaterialList[index].OrderUnit ?? 'Cái',
      PlantId: ordersByID?.PlantId,
      StorageLocationId: ordersByID?.POOrderMaterialMaps?.[0].StorageLocationId
    })
  }

  const onSelectingSaleStock = (value) => {
    const index = specMaterialList.findIndex((item) => item.Id === value)
    setSelectingSaleStock({
      MaterialId: specMaterialList[index].Id,
      LongName: specMaterialList[index].MaterialName,
      OrderQuantity: 1,
      Unit: specMaterialList[index].OrderUnit ?? 'Cái',
      PlantId: ordersByID?.PlantId,
      StorageLocationId: ordersByID?.POOrderMaterialMaps?.[0].StorageLocationId
    })
  }

  const onSelectingSAPStock = (value) => {
    const index = specMaterialList.findIndex((item) => item.Id === value)
    setSelectingSAPStock({
      MaterialId: specMaterialList[index].Id,
      LongName: specMaterialList[index].MaterialName,
      Unit: specMaterialList[index].OrderUnit ?? 'Cái',
      OrderQuantity: 1,
      DeliveredQuantity: 0,
      ReceivedQuantity: 0,
      StorageLocationId: ordersByID?.POOrderMaterialMaps?.[0].StorageLocationId
    })
  }

  const onSelectingAMSStock = (value) => {
    const index = productsAMS.findIndex((item) => item.SAPId === value)
    dispatch(
      getAMSConfigQuantity({
        CostCenter: '10GG410001' || ordersByID?.CostCenter,
        Email: 'hn.gogi.bigc@ggg.com.vn' || ordersByID?.Email,
        ProductId: value
      })
    )
    setSelectingAMSStock({
      MaterialId: productsAMS[index].SAPId,
      LongName: productsAMS[index].MaterialName,
      Unit: productsAMS[index].OrderUnit ?? '',
      NotDeliveredQuantity: 1,
      LastQuantity: 0,
      UseQuantity: 0,
      StandardQuantity: 0,
      OrderQuantity: 1,
      Price: 0,
      SumPrice: 0
    })
  }

  const handleChangeOrder = (record, dataIndex, value) => {
    console.log('value', value)
    setOrderData({
      ...orderData,
      POOrderMaterialMaps: orderData?.POOrderMaterialMaps?.map((item) =>
        item.Id === record.Id ? { ...item, [dataIndex]: value } : item
      )
    })
    console.log('orderData', orderData)
  }

  const handleUpdateOrder = () => {
    console.log('orderData', orderData)
    if (ordersByID?.SystemOrderId === 1) {
      const foundProducts = orderData?.POOrderMaterialMaps?.find((item) => !item.IsSale)
      if (!foundProducts) message.error('Vui lòng nhập thông tin hàng hóa!')
      else dispatch(updateOrderAction(orderData))
    } else {
      if (!orderData?.POOrderMaterialMaps?.length) message.info('Vui lòng nhập hàng hóa!')
      else dispatch(updateOrderAction(orderData))
    }
  }

  const onDeselectMaterial = (value) => {
    const filterNormalItems = orderData.POOrderMaterialMaps.filter((item) => !item.IsSale).filter(
      (item) => item.MaterialId !== value
    )
    setOrderData({
      ...orderData,
      POOrderMaterialMaps: orderData.POOrderMaterialMaps.filter((item) => item.IsSale).concat(filterNormalItems)
    })
  }

  const onDeselectAMS = (value) => {
    const filterNormalItems = orderData.POOrderMaterialMaps.filter((item) => item.MaterialId !== value)
    setOrderData({
      ...orderData,
      POOrderMaterialMaps: filterNormalItems
    })
  }

  const onDeselectSaleMaterial = (value) => {
    const filterNormalItems = orderData.POOrderMaterialMaps.filter((item) => item.IsSale).filter(
      (item) => item.MaterialId !== value
    )
    setOrderData({
      ...orderData,
      POOrderMaterialMaps: orderData.POOrderMaterialMaps.filter((item) => !item.IsSale).concat(filterNormalItems)
    })
  }

  const handleDatePicker = (dateString) => setDeliveryInfo({ ...deliveryInfo, DeliveryTime: dateToISO(dateString) })

  const onUpdateStatus = async (status) => {
    // const payload = {
    //   Id: ordersByID?.Id,
    //   StatusCode: status.toString()
    // }
    await dispatch(updateOrderAction({ ...orderData, POStatusId: status }))
    // console.log("orderData", orderData);
    // await dispatch(updateStatus(payload))
  }

  const findStockId = (MaterialId) => orderData.POOrderMaterialMaps.find((item) => item.MaterialId === MaterialId)

  // PO + SAP + AMS
  const delStock = ({ MaterialId }) => {
    const filtered = orderData.POOrderMaterialMaps.filter((item) => !item.IsSale).filter(
      (item) => item.MaterialId !== MaterialId
    )
    setDataTable(dataTable.filter((item) => item.MaterialId !== MaterialId))
    setOrderData({
      ...orderData,
      POOrderMaterialMaps: orderData.POOrderMaterialMaps.filter((item) => item.IsSale).concat(filtered),
      DetailsIdDelete: [...orderData.DetailsIdDelete, { Id: findStockId(MaterialId)?.Id }]
    })
    setIsDelPOStock(true)
  }

  const delSAPStock = ({ MaterialId }) => {
    const filtered = orderData.POOrderMaterialMaps.filter((item) => item.MaterialId !== MaterialId)
    setDataTable(dataTable.filter((item) => item.MaterialId !== MaterialId))
    setOrderData({
      ...orderData,
      POOrderMaterialMaps: orderData.POOrderMaterialMaps.filter((item) => item.IsSale).concat(filtered),
      DetailsIdDelete: [...orderData.DetailsIdDelete, { Id: findStockId(MaterialId)?.Id }]
    })
    setIsDelPOStock(true)
  }

  const delAMSStock = ({ MaterialId }) => {
    const filtered = orderData.POOrderMaterialMaps.filter((item) => item.MaterialId !== MaterialId)
    setDataTable(dataTable.filter((item) => item.MaterialId !== MaterialId))
    setOrderData({
      ...orderData,
      POOrderMaterialMaps: filtered,
      DetailsIdDelete: [...orderData.DetailsIdDelete, { Id: findStockId(MaterialId)?.Id }]
    })
    setIsDelPOStock(true)
  }

  const delSaleStock = ({ MaterialId }) => {
    const filtered = orderData.POOrderMaterialMaps.filter((item) => item.IsSale).filter(
      (item) => item.MaterialId !== MaterialId
    )
    setSaleTableData(saleTableData.filter((item) => item.MaterialId !== MaterialId))
    setOrderData({
      ...orderData,
      POOrderMaterialMaps: orderData.POOrderMaterialMaps.filter((item) => !item.IsSale).concat(filtered),
      DetailsIdDelete: [...orderData.DetailsIdDelete, { Id: findStockId(MaterialId)?.Id }]
    })
    setDelSaleStock(true)
  }

  const handleCreateTicket = () => {
    history.push({ pathname: `/orders/delivery/${params?.id}` })
  }

  // useEffect(() => {
  //   if (isSuccess === true) {
  //     history.push('/delivery')
  //   }
  // }, [isSuccess])

  console.log(2222, isSuccess)
  // useEffect(() => {
  //   if (isSuccess === true) {
  //     history.push('/delivery')
  //   }
  // }, [isSuccess])

  const POTable = <CTable columns={POTableColumns} dataSource={dataTable} />
  const AMStable = <CTable columns={AMSColumns} dataSource={dataTable} loading={loadingAMSProducts} />
  const FioiriTable = <CTable columns={FioriTableColumns} dataSource={dataTable} />

  return (
    <ViewWrapper
      title={ordersByID?.OrderCode}
      subTitle={`${findSystem(ordersByID?.SystemOrderId)?.Name} - ${moment().format('DD/MM/YYYY HH:mm')}`}
      toolBar={ToolBar}
    >
      <div>
        <Card>
          <CardHeader title="Thông tin yêu cầu"></CardHeader>
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
      <Form onFinish={handleCreateTicket} form={form}>
        {isShowShip && (
          <div className="mt-4">
            <InputGroup title="Thông tin giao hàng">
              <CInput label="Mã phiếu giao hàng" placeholder="Hệ thống tự sinh" disabled />
              <Form.Item name="SupplierCode" rules={[{ required: true, message: 'Vui lòng nhập ngày giao hàng!' }]}>
                <CInput
                  label="Ngày giao hàng"
                  important
                  placeholder="dd/MM/yyyy hh:mm"
                  inputType="DatePicker"
                  onChange={handleDatePicker}
                />
              </Form.Item>
              <CInput
                label="Ghi chú"
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, SupplierNote: e.target.value })}
                placeholder="Ghi chú"
              />
            </InputGroup>
          </div>
        )}

        <div className="mt-6">
          <InputGroup
            typeGroup={!isOnEdit ? 'TableOnly' : 'Table'}
            tableSlot={
              ordersByID?.SystemOrderId === 3 ? AMStable : ordersByID?.SystemOrderId === 2 ? FioiriTable : POTable
            }
            onClick={() =>
              ordersByID?.SystemOrderId === 3
                ? addAMSStock(true)
                : ordersByID?.SystemOrderId === 2
                  ? addSAPStock(true)
                  : addStock(true)
            }
            title="Thông tin nguyên vật liệu"
            extra={
              ordersByID?.SystemOrderId === 1 && isOnEdit ? (
                <CButton type="secondary" onClick={() => setShowSaleTable(!isShowSaleTable)}>
                  Thêm sản phẩm khuyến mại
                </CButton>
              ) : null
            }
          >
            <Form.Item name="deleteItem">
              <CInput
                inputType="Select"
                placeholder="Tên hàng hóa"
                allowClear
                options={ordersByID?.SystemOrderId === 3 ? productsAMS : specMaterialList}
                onSelect={
                  ordersByID?.SystemOrderId === 3
                    ? onSelectingAMSStock
                    : ordersByID?.SystemOrderId === 2
                      ? onSelectingSAPStock
                      : onSelectingPOStock
                }
                onDeselect={ordersByID?.SystemOrderId === 3 ? onDeselectAMS : onDeselectMaterial}
                mode="multiple"
                additionValueType="takeId"
              />
            </Form.Item>
          </InputGroup>
        </div>

        {isShowSaleTable && (
          <div className="mt-6">
            <InputGroup
              typeGroup={!isOnEdit ? 'TableOnly' : 'Table'}
              tableSlot={<CTable columns={SaleTableColumns} dataSource={saleTableData} />}
              onClick={() => addSaleStock(true)}
              title="Thông tin nguyên vật liệu"
            >
              <Form.Item name="deleteItem2">
                <CInput
                  inputType="Select"
                  placeholder="Tên hàng hóa"
                  allowClear
                  options={specMaterialList}
                  onSelect={onSelectingSaleStock}
                  onDeselect={onDeselectSaleMaterial}
                  additionValueType="takeId"
                  mode="multiple"
                />
              </Form.Item>
            </InputGroup>
          </div>
        )}

        {statusId === 1 || (ordersByID?.SystemOrderId === 1 && statusId === 28) ? (
          <div className="mt-10 w-full text-right flex place-content-end">
            <div className="mr-4">
              <CButton type="danger" onClick={isOnEdit ? () => setIsOnEdit(false) : () => history.push('/orders')}>
                {isOnEdit ? 'Thoát' : 'Hủy'}
              </CButton>
            </div>
            <div
              className={`mr-4 ${
                (statusId === 28 && ordersByID?.SystemOrderId === 1) || statusId === 1 ? null : 'hidden'
              }`}
            >
              <CButton type="secondary" onClick={isOnEdit ? handleUpdateOrder : () => setIsOnEdit(true)}>
                {isOnEdit ? 'Lưu tạm' : 'Điều chỉnh'}
              </CButton>
            </div>
            <div className={isOnEdit ? null : 'hidden'}>
              <CButton
                type="primary"
                onClick={() => {
                  // chuyển status đơn từ lưu tạm sang tạo mới (ấn nút hoàn thành)
                  onUpdateStatus(2)
                }}
              >
                Hoàn thành
              </CButton>
            </div>
          </div>
        ) : null}

        {statusId === 29 && (
          <div className="mt-10 w-full text-right flex place-content-end">
            <CButton
              type="primary"
              onClick={() => {
                onUpdateStatus(15)
              }}
            >
              Đã nhận hàng
            </CButton>
          </div>
        )}

        {statusId === 2 && (
          <div className="mt-10 w-full text-right flex place-content-end">
            <div className="mr-4">
              <CButton
                type="danger"
                onClick={() => {
                  onUpdateStatus(28)
                }}
              >
                Không xác nhận
              </CButton>
            </div>
            <CButton
              type="primary"
              onClick={() => {
                // Xác nhận đơn
                onUpdateStatus(ordersByID?.SystemOrderId === 3 ? 29 : 3)
              }}
            >
              Xác nhận
            </CButton>
          </div>
        )}

        {statusId === 3 && (
          <div className="flex text-right w-full place-content-end">
            <CButton
              type="secondary"
              // onClick={() => {
              //   onUpdateStatus(28)
              // }}
              htmlType="submit"
            >
              Nhận hàng một phần
            </CButton>
            <div className="mx-4">
              <CButton
                type="primary"
                onClick={() => {
                  onUpdateStatus(7)
                }}
                htmlType="submit"
              >
                Hoàn thành
              </CButton>
            </div>
            <CButton
              type="primary"
              onClick={() => {
                handleCreateTicket()
              }}
              htmlType="submit"
            >
              Giao hàng
            </CButton>
          </div>
        )}
      </Form>
    </ViewWrapper>
  )
}

export default OrderDetail
