// import { DeleteOutlined } from '@ant-design/icons'
import { DeleteOutlined } from '@ant-design/icons'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CTable from '@components/common/CTable'
import ViewWrapper from '@components/common/ViewWrapper'
import InputGroup from '@components/Layout/InputGroup'
import {
  fetchLoginInfo,
  getAMSCategories,
  getAMSConfigQuantity,
  getAMSProducts,
  getAMSStocks,
  getConfigBySupplier,
  getMaterialGroupList,
  getPlantsByMaterialGroup,
  getSapSuppliers,
  getSlocsByPlant,
  getSpecificMaterialList,
  getSuppliersByStuffType
} from '@store/thunks/combo.thunk'
import {
  createOrderAction,
  fetchOrderSystems,
  fetchPOGoodTypes,
  fetchStuffTypes,
  fetchSupplierByPage
} from '@store/thunks/orders.thunk'
import {
  getAppPlantById,
  getConfigProcessSystem,
  getDetailSystemParameter,
  getFullRestaurant
} from '@store/thunks/setting.thunk'
import {
  dateToISO,
  disabledDate,
  findAMSProduct,
  findCurrentMaterial,
  findCurrentMaterialById,
  findCurrentMaterialGroup,
  findCurrentPlant,
  formatBaseDate
} from '@utils/core.utils'
import { Form, InputNumber, message, Select } from 'antd'
import moment from 'moment'
// import { has, mergeLeft } from 'ramda'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  exampleQueries,
  radioData
  // selectInputData,
  // tableData
} from '../../static/viewCreateOrder.static'
import SaleProductsTable from './element/SaleProductsTable'

const { Option } = Select

const ViewCreateOrder = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { poGoodTypes, stuffTypes, saleProducts, isLoading } = useSelector((state) => state['orders'])
  // const btn = createRef()
  const {
    materialGroupList,
    specMaterialList,
    slocsByPlant,
    categories,
    flowRequests,
    stocksAMS,
    productsAMS,
    configQuantityAMS,
    suppliersByStuffType,
    loginInfo,
    sapSuppliers,
    configBySupplier,
    // isFetching,
    loadingAMSProducts
  } = useSelector((state) => state['combo'])
  const { fullRestaurant, appPlantById, processSystemConfigList, systemDetailParams } = useSelector(
    (state) => state['settings']
  )
  const [form] = Form.useForm()
  useEffect(() => {
    dispatch(fetchPOGoodTypes())
    dispatch(fetchLoginInfo())
    dispatch(fetchOrderSystems())
    dispatch(fetchSupplierByPage())
    dispatch(fetchStuffTypes())
    dispatch(getMaterialGroupList())
    dispatch(getFullRestaurant())
    dispatch(getDetailSystemParameter())
    dispatch(getConfigProcessSystem({ skip: 1, take: 100 }))

    form.setFieldsValue({
      ...exampleQueries,
      OrderTimeTo: moment(formatBaseDate(new Date()), 'DD/MM/YYYY'),
      OrderTime: moment(formatBaseDate(new Date()), 'DD/MM/YYYY')
    })
  }, [])

  const POTableColumns = [
    {
      title: 'M?? h??ng h??a',
      dataIndex: 'MaterialId',
      width: '20%',
      render: (text) => <p>{findCurrentMaterialById(specMaterialList, text)?.Material}</p>
    },
    {
      title: 'T??n h??ng h??a',
      dataIndex: 'MaterialName',
      width: '20%',
      render: (_, record) => <p>{findCurrentMaterialById(specMaterialList, record.MaterialId)?.MaterialName}</p>
    },
    {
      title: 'SL y??u c???u',
      dataIndex: 'OrderQuantity',
      width: '10%',
      render: (text, record) => (
        <InputNumber
          defaultValue={text}
          onChange={(e) => onChangePOSl(record, e)}
          className="block rounded"
          min={1}
          precision={2}
        />
      )
    },
    {
      title: '??VT',
      dataIndex: 'Unit',
      width: '8%'
    },
    {
      title: 'Kho v???t l?? (plant)',
      dataIndex: 'PlantId',
      width: '15%',
      render: (text, record) => (
        <Select
          className="block"
          onChange={(e) => onChangePlant(record, e)}
          defaultValue={appPlantById?.Id}
          optionFilterProp="children"
          showSearch
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          <Option value={appPlantById?.Id}>{appPlantById?.Name}</Option>
        </Select>
      )
    },
    {
      title: 'V??? tr?? l??u kho (sloc)',
      dataIndex: 'StorageLocationId',
      width: '15%',
      render: (text, record) => (
        <Select
          className="block"
          onChange={(e) => onChangeSloc(record, e)}
          defaultValue={appPlantById?.SAPStorageLocation?.[0].Id}
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
      )
    },
    {
      title: '',
      dataIndex: '',
      render: (record) => <DeleteOutlined className="cursor-pointer" onClick={() => delStock(record)} />
    }
  ]

  const AMSTableColumns = [
    {
      title: 'V???t t?? chi ph??',
      dataIndex: 'MaterialId',
      render: (text) => (
        <p>{`${findAMSProduct(productsAMS, text)?.Material} - ${findAMSProduct(productsAMS, text)?.MaterialName}`}</p>
      )
    },
    {
      title: 'SL ch??a giao',
      dataIndex: 'NotDeliveredQuantity'
    },
    {
      title: 'SL ?????t g???n nh???t',
      dataIndex: 'LastQuantity'
    },
    {
      title: 'SL ??ang s??? d???ng',
      dataIndex: 'UseQuantity'
    },
    {
      title: 'SL ti??u chu???n',
      dataIndex: 'StandardQuantity'
    },
    {
      title: 'SL y??u c???u',
      dataIndex: 'OrderQuantity',
      render: (text, record) => (
        <InputNumber
          defaultValue={text}
          onChange={(e) => onChangeSLAMS(record, e)}
          className="block rounded"
          min={1}
          precision={2}
        />
      )
    },
    {
      title: '??VT',
      dataIndex: 'Unit'
    },
    {
      title: '????n gi?? d??? ki???n',
      dataIndex: 'Price'
    },
    {
      title: 'T???ng ti???n d??? ki???n',
      dataIndex: 'SumPrice',
      render: (text, record) => <p>{record.OrderQuantity * record.Price}</p>
    },
    {
      title: '',
      dataIndex: '',
      render: (record) => <DeleteOutlined className="cursor-pointer" onClick={() => delAMSStock(record)} />
    }
  ]

  const FioriTableColumns = [
    {
      title: 'M?? h??ng h??a',
      dataIndex: 'MaterialId',
      // render: (text, record) => <p>{`${record.Id} - ${text}`}</p>,
      render: (text, record) => (
        <p>{`${findCurrentMaterialById(specMaterialList, text)?.Material} - ${record.MaterialId}`}</p>
      )
    },
    {
      title: 'T??n h??ng h??a',
      dataIndex: 'name',
      render: (_, record) => <p>{findCurrentMaterialById(specMaterialList, record.MaterialId)?.MaterialName}</p>
    },
    {
      title: 'S??? l?????ng y??u c???u',
      dataIndex: 'OrderQuantity',
      render: (text, record) => (
        <InputNumber
          defaultValue={text}
          onChange={(e) => onchangeFioriSL(record, e)}
          className="block rounded"
          min={1}
          precision={2}
        />
      )
    },
    {
      title: '??VT',
      dataIndex: 'Unit'
    },
    {
      title: 'Khu v???c l??u tr???',
      dataIndex: 'sloc',
      render: (text, record) => (
        <Select
          className="block"
          onChange={(e) => onChangeFioriSloc(record, e)}
          defaultValue={appPlantById?.SAPStorageLocation?.[0].Id}
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          {appPlantById?.SAPStorageLocation?.map(({ SlocDes, Id }, idx) => (
            <Option value={Id} key={idx}>
              {SlocDes}
            </Option>
          ))}
        </Select>
      )
    },
    {
      title: '',
      dataIndex: '',
      render: (record) => <DeleteOutlined className="cursor-pointer" onClick={() => delStock(record)} />
    }
  ]

  const [initQueries, setInitQueries] = useState(exampleQueries)
  const [defaultTableData, setDefaultTableData] = useState([])
  const [orderSystemId, setOrderSystemId] = useState(null)
  // const [materialListState, setMaterialListState] = useState([])
  const [selectingStock, setSelectingStock] = useState(null)
  const [selectingAMSProduct, setSelectingAMSProduct] = useState(null)
  const [selectingFioriProduct, setSelectingFioriProduct] = useState(null)
  const [submitType, setSubmitType] = useState(null)
  const [isShowSaleTable, setIsShowSaleTable] = useState(false)
  const [tableColumns, setTableColumns] = useState(POTableColumns)

  const [isDelPOStock, setIsDelPOStock] = useState(false)

  const handleGetProcessingSystem = () => {
    const filterRole = processSystemConfigList.filter((item) => item.AppRoleName === loginInfo?.Users?.RoleName)
    const orderSystemByGoodsType = filterRole.filter((item) => item.GoodsTypeId === initQueries?.POGoodsTypeId)
    const orderSystemBySupplyType = orderSystemByGoodsType?.filter(
      (item) => item.SupplyTypeName === (initQueries.POVendorId === 1 ? 'Nh?? cung ???ng n???i b???' : 'Nh?? cung c???p')
    )

    if (initQueries.SystemOrderId !== orderSystemBySupplyType[0]?.SystemOrderId)
      setInitQueries({ ...initQueries, SystemOrderId: orderSystemBySupplyType[0]?.SystemOrderId })

    setOrderSystemId(orderSystemBySupplyType[0]?.SystemOrderId)
  }

  useEffect(() => {
    if (submitType) {
      if (!initQueries.POOrderMaterialMaps.length) {
        message.error('Vui l??ng nh???p th??ng tin h??ng h??a!')
      } else {
        if (submitType === 2) {
          // console.log("initQueries", initQueries);
          // dispatch(createOrderAction({ ...initQueries, POStatusId: 1 }, history, true))
        } else dispatch(createOrderAction({ ...initQueries, POStatusId: 2 }, history, false))
      }
    }
    setSubmitType(null)
  }, [submitType])

  useEffect(() => {
    if (orderSystemId === 3) {
      setInitQueries({
        ...initQueries,
        POStuffTypeId: 1,
        SupplierId: 1,
        OrderTimeTo: dateToISO(new Date()),
        OrderTime: dateToISO(new Date())
      })
      form.setFieldsValue({ FlowRequest: null, TypeRequest: null, WarehouseReceived: null })
      if (tableColumns.length !== AMSTableColumns.length) setTableColumns(AMSTableColumns)
      if (!categories.length)
        dispatch(
          getAMSCategories({
            CostCenter: '10GG410001' || loginInfo?.Users?.CostCenter,
            Email: 'hn.gogi.bigc@ggg.com.vn' || loginInfo?.Users?.Email
          })
        )
    } else if (orderSystemId === 2) {
      if (tableColumns.length !== FioriTableColumns.length) setTableColumns(FioriTableColumns)
      if (!sapSuppliers.length) dispatch(getSapSuppliers())
      setInitQueries({
        ...initQueries,
        POStuffTypeId: 1,
        OrderTimeTo: dateToISO(new Date()),
        OrderTime: dateToISO(new Date())
      })
    } else {
      setInitQueries({
        ...initQueries,
        FlowRequest: 'string',
        TypeRequest: 'string',
        WarehouseReceived: 'string',
        OrderTimeTo: dateToISO(new Date()),
        OrderTime: dateToISO(new Date())
      })
      if (tableColumns.length !== POTableColumns.length) {
        setTableColumns(POTableColumns)
      }
    }

    if (orderSystemId === undefined || orderSystemId === 0) message.info('Kh??ng t??m th???y h??? th???ng x??? l??!')
  }, [orderSystemId])

  const dispatchAMSProduct = () =>
    dispatch(
      getAMSProducts({
        CostCenter: '10GG410001' || loginInfo?.Users?.CostCenter,
        Email: 'hn.gogi.bigc@ggg.com.vn' || loginInfo?.Users?.Email,
        RequestTypeId: initQueries.FlowRequest,
        TypeProductOrderId: initQueries.TypeRequest,
        WarehouseId: initQueries.WarehouseReceived
      })
    )

  useEffect(() => {
    handleGetProcessingSystem()
    setSubmitType(null)
    if (
      initQueries.FlowRequest !== 'string' &&
      initQueries.TypeRequest !== 'string' &&
      initQueries.WarehouseReceived !== 'string' &&
      !productsAMS.length &&
      orderSystemId === 3
    )
      dispatchAMSProduct()

    if (initQueries.SupplierId && !specMaterialList.length && (orderSystemId === 1 || orderSystemId === 2)) {
      dispatch(getSpecificMaterialList({ suppliersId: initQueries.SupplierId }))
    }
    console.log('initQueries', initQueries)
  }, [initQueries])

  useEffect(() => {
    form.setFieldsValue({
      SupplierId: null
    })
    setInitQueries({
      ...initQueries,
      SupplierId: null
    })
  }, [initQueries.POStuffTypeId])
  useEffect(() => {
    form.setFieldsValue({
      WarehouseReceived: null
    })
    setInitQueries({
      ...initQueries,
      WarehouseReceived: null
    })
    handleClearAMSSelect()
    dispatchAMSProduct()
    setDefaultTableData([])
    setInitQueries({ ...initQueries, POOrderMaterialMaps: [] })
  }, [initQueries.TypeRequest])

  useEffect(() => {
    handleClearAMSSelect()
    dispatchAMSProduct()
    setDefaultTableData([])
    setInitQueries({ ...initQueries, POOrderMaterialMaps: [] })
  }, [initQueries.WarehouseReceived])

  useEffect(() => {
    handleClearSAPSelect()
    if ((initQueries.SupplierId && orderSystemId === 2) || orderSystemId === 1) {
      dispatch(getSpecificMaterialList({ suppliersId: initQueries?.SupplierId }))
    }

    if (orderSystemId === 2) {
      setDefaultTableData([])
      setInitQueries({ ...initQueries, POOrderMaterialMaps: [] })
    }
  }, [initQueries.SupplierId])

  useEffect(() => {
    handleClearPOSelect()
    handleClearSaleSelect()
  }, [specMaterialList])

  useEffect(() => handleGetProcessingSystem(), [processSystemConfigList])
  useEffect(() => handleGetProcessingSystem(), [loginInfo])
  useEffect(() => {
    if (saleProducts.MaterialId) {
      const filterdIsSale = initQueries.POOrderMaterialMaps.filter((item) => item.IsSale)
      const deletedArray = filterdIsSale.filter((item) => item.MaterialId !== saleProducts.MaterialId)
      setInitQueries({
        ...initQueries,
        POOrderMaterialMaps: initQueries.POOrderMaterialMaps.filter((item) => !item.IsSale).concat(deletedArray)
      })
    }

    if (!saleProducts.MaterialId) {
      const format = {
        ...saleProducts?.[0],
        StorageLocationId: appPlantById?.SAPStorageLocation?.[0].Id,
        PlantId: loginInfo?.Users?.PlantId ?? 1
      }
      setInitQueries({
        ...initQueries,
        POOrderMaterialMaps: [...initQueries.POOrderMaterialMaps, format]
      })
    }
  }, [saleProducts])

  // useEffect(() => {
  //   if (configBySupplier.length)
  // }, [configBySupplier])

  useEffect(() => {
    setDefaultTableData([])
    setInitQueries({ ...initQueries, POOrderMaterialMaps: [] })
    setIsShowSaleTable(false)
  }, [tableColumns])

  useEffect(() => {
    if (loginInfo) {
      console.log('loginInfo', [loginInfo?.Users])
      dispatch(getAppPlantById(loginInfo?.Users?.PlantId))
      setInitQueries({
        ...initQueries,
        CreatedBy: loginInfo.Users.UserName,
        OrderBy: loginInfo.Users.FullName,
        PlantId: loginInfo.Users.PlantId ?? 1,
        Email: loginInfo.Users.Email,
        CosCenter: loginInfo?.Users?.CostCenter
      })
    }
  }, [loginInfo])

  useEffect(
    () =>
      setSelectingAMSProduct({
        ...selectingAMSProduct,
        Unit: configQuantityAMS?.list_quantity?.[0]?.list_uom?.[0]?.name ?? 'C??i',
        LastQuantity: configQuantityAMS?.list_quantity?.[0]?.order_qty_nearest,
        UseQuantity: configQuantityAMS?.list_quantity?.[0]?.qty_use,
        NotDeliveredQuantity: configQuantityAMS?.list_quantity?.[0]?.qty_in_process,
        StandardQuantity: configQuantityAMS?.list_quantity?.[0]?.qty_par_stock,
        Price: configQuantityAMS?.list_quantity?.[0]?.price_unit_plan
      }),
    [configQuantityAMS]
  )

  useEffect(() => selectingStock && addStock(false), [selectingStock])
  useEffect(() => {
    if (isDelPOStock) {
      if (orderSystemId === 1) addStock(true)
      if (orderSystemId === 2) addFioriProduct(true)
      if (orderSystemId === 3) addAMSProduct(true)
      setIsDelPOStock(false)
    }
  }, [isDelPOStock])

  // SAP
  useEffect(() => {
    if (selectingFioriProduct) addFioriProduct(false)
  }, [selectingFioriProduct])
  // AMS
  useEffect(() => {
    if (selectingAMSProduct && selectingAMSProduct.Unit === '') addAMSProduct(false)
  }, [selectingAMSProduct])

  const addStock = (isClick) => {
    if (isClick) {
      console.log('initQueries.POOrderMaterialMaps', initQueries.POOrderMaterialMaps)
      setDefaultTableData(initQueries.POOrderMaterialMaps.filter((item) => !item.IsSale))
      handleClearPOSelect()
      return
    }
    console.log('selectingStock.Material', selectingStock.Material)
    const isExistStock = findExistStock()
    const foundMaterial = findCurrentMaterial(specMaterialList, selectingStock.Material)
    console.log('selectingStock', selectingStock.PlantId)

    if (isExistStock) message.info('???? t???n t???i lo???i h??ng n??y trong danh s??ch')
    else {
      if (selectingStock) {
        setInitQueries({
          ...initQueries,
          POVendorId: !initQueries.POVendorId ? 2 : initQueries.POVendorId,
          POOrderMaterialMaps: [
            ...initQueries.POOrderMaterialMaps,
            {
              MaterialId: foundMaterial.Id,
              PlantId: loginInfo.Users.PlantId ?? 1,
              NotDeliveredQuantity: 0,
              LastQuantity: 0,
              UseQuantity: 0,
              StandardQuantity: 0,
              OrderQuantity: 1,
              DeliveredQuantity: 0,
              ReceivedQuantity: 0,
              Unit: foundMaterial.OrderUnit ?? 'string',
              Price: 0,
              IsSale: false,
              Images: 'string',
              SumPrice: 0,
              IsNotNorm: true,
              NormQuantity: 0,
              LineNbr: 0,
              SAPUnit: foundMaterial.OrderUnit ?? 'str',
              StorageLocationId: appPlantById?.SAPStorageLocation?.[0].Id,
              CKTicketDetailId: 0
            }
          ]
        })
      }
    }
  }

  // PO + SAP d??ng chung function
  const delStock = ({ MaterialId }) => {
    const filterdIsSale = initQueries.POOrderMaterialMaps.filter((item) => !item.IsSale).filter(
      (item) => item.MaterialId !== MaterialId
    )
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.filter((item) => item.IsSale).concat(filterdIsSale)
    })
    setIsDelPOStock(true)
  }

  const delAMSStock = ({ MaterialId }) => {
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.filter((item) => item.MaterialId !== MaterialId)
    })
    setIsDelPOStock(true)
  }

  const handleClearAMSSelect = () => form.setFieldsValue({ ABC2: undefined })
  const handleClearPOSelect = () => form.setFieldsValue({ ABC: undefined })
  const handleClearSAPSelect = () => form.setFieldsValue({ ABC3: undefined })
  const handleClearSaleSelect = () => form.setFieldsValue({ ABC4: undefined })

  const addAMSProduct = (isClick) => {
    if (isClick) {
      setDefaultTableData(initQueries.POOrderMaterialMaps)
      handleClearAMSSelect()
      return
    }
    const isExistStock = initQueries.POOrderMaterialMaps.find((item) => item.MaterialId === selectingAMSProduct?.id)
    if (isExistStock) message.info('???? t???n t???i lo???i h??ng n??y trong danh s??ch')
    else {
      setInitQueries({
        ...initQueries,
        POVendorId: !initQueries.POVendorId ? 2 : initQueries.POVendorId,
        TypeProductOrderId: initQueries.TypeRequest,
        RequestTypeId: initQueries.TypeRequest,
        WarehouseId: Number(initQueries.WarehouseReceived),
        POOrderMaterialMaps: [
          ...initQueries.POOrderMaterialMaps,
          {
            MaterialId: selectingAMSProduct.id,
            PlantId: loginInfo?.Users?.PlantId,
            NotDeliveredQuantity: selectingAMSProduct.NotDeliveredQuantity,
            LastQuantity: selectingAMSProduct.LastQuantity,
            UseQuantity: selectingAMSProduct.UseQuantity,
            StandardQuantity: selectingAMSProduct.StandardQuantity,
            OrderQuantity: selectingAMSProduct.OrderQuantity ?? 1,
            DeliveredQuantity: 0,
            ReceivedQuantity: 0,
            Unit: selectingAMSProduct.Unit ?? 'str',
            Price: selectingAMSProduct.Price,
            IsSale: false,
            Images: 'string',
            SumPrice: selectingAMSProduct.OrderQuantity * selectingAMSProduct.Price,
            IsNotNorm: true,
            NormQuantity: 0,
            LineNbr: 0,
            SAPUnit: selectingAMSProduct.Unit ?? 'str',
            StorageLocationId: null,
            CKTicketDetailId: 0
          }
        ]
      })
    }
  }
  const addFioriProduct = (isClick) => {
    if (isClick) {
      setDefaultTableData(initQueries.POOrderMaterialMaps)
      handleClearSAPSelect()
      return
    }
    const isExistStock = initQueries.POOrderMaterialMaps.find(
      (item) => item.MaterialId === findCurrentMaterial(specMaterialList, selectingFioriProduct.Material)?.Id
    )

    if (isExistStock) message.info('???? t???n t???i lo???i h??ng n??y trong danh s??ch')
    else {
      setInitQueries({
        ...initQueries,
        POVendorId: !initQueries.POVendorId ? 2 : initQueries.POVendorId,
        POOrderMaterialMaps: [
          ...initQueries.POOrderMaterialMaps,
          {
            MaterialId: selectingFioriProduct.Id,
            PlantId: initQueries.PlantId,
            NotDeliveredQuantity: 0,
            LastQuantity: 0,
            UseQuantity: 0,
            StandardQuantity: 0,
            OrderQuantity: selectingFioriProduct.OrderQuantity ?? 1,
            DeliveredQuantity: 0,
            ReceivedQuantity: 0,
            Unit: selectingFioriProduct.Unit ?? 'string',
            Price: 0,
            IsSale: false,
            Images: 'string',
            SumPrice: 0,
            IsNotNorm: true,
            NormQuantity: 0,
            LineNbr: 0,
            SAPUnit: selectingFioriProduct.Unit ?? 'str',
            StorageLocationId: appPlantById?.SAPStorageLocation?.[0].Id,
            CKTicketDetailId: 0
          }
        ]
      })
    }
  }

  const onChangeMaterialSelect = (value) => {
    const index = specMaterialList.findIndex((item) => item.Id === value)
    setSelectingStock({
      Material: specMaterialList[index].Material,
      MaterialName: specMaterialList[index].MaterialName,
      sl: '1',
      OrderUnit: specMaterialList[index].OrderUnit ?? 'C??i',
      PlantId: null
    })
  }

  const findExistStock = () =>
    initQueries.POOrderMaterialMaps.filter((item) => !item.IsSale).find(
      (item) => item.MaterialId === findCurrentMaterial(specMaterialList, selectingStock.Material)?.Id
    )

  const onDeSelectMaterial = (value) => {
    const isExistStock = findExistStock()
    if (isExistStock) return

    const filterSale = initQueries.POOrderMaterialMaps.filter((item) => !item.IsSale).filter(
      (item) => item.MaterialId !== value
    )
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.filter((item) => item.IsSale).concat(filterSale)
    })
  }

  const onDeselectSale = (value) => {
    const isExistStock = initQueries.POOrderMaterialMaps.filter((item) => item.IsSale).find(
      (item) => item.MaterialId === findCurrentMaterial(specMaterialList, selectingStock.Material)?.Id
    )
    if (isExistStock) return

    const filterSale = initQueries.POOrderMaterialMaps.filter((item) => item.IsSale).filter(
      (item) => item.MaterialId !== value
    )
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.filter((item) => !item.IsSale).concat(filterSale)
    })
  }

  const onChangeAMSProductsSelect = (value) => {
    const index = productsAMS.findIndex((item) => item.SAPId === value)
    dispatch(
      getAMSConfigQuantity({
        CostCenter: '10GG410001' || loginInfo?.Users?.CostCenter,
        Email: 'hn.gogi.bigc@ggg.com.vn' || loginInfo?.Users?.Email,
        ProductId: productsAMS[index]?.AMSId
      })
    )
    setSelectingAMSProduct({
      id: productsAMS[index]?.SAPId,
      name: productsAMS[index]?.MaterialName,
      code: productsAMS[index]?.Material,
      NotDeliveredQuantity: 0,
      LastQuantity: 0,
      UseQuantity: 0,
      StandardQuantity: 0,
      OrderQuantity: 1,
      Unit: '',
      Price: 0,
      SumPrice: 0
    })
  }

  const onDeSelectAMS = (value) => {
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.filter((item) => item.MaterialId !== value)
    })
  }

  const onChangeFioriProductSelect = (value) => {
    const index = specMaterialList.findIndex((item) => item.Id === value)
    setSelectingFioriProduct({
      name: specMaterialList[index].MaterialName,
      Material: specMaterialList[index].Material,
      Id: specMaterialList[index].Id,
      OrderQuantity: 1,
      Unit: specMaterialList[index].OrderUnit ?? 'C??i',
      StorageLocationId: slocsByPlant.Id
    })
  }

  const onDeSelectFiori = (value) => {
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.filter((item) => item.MaterialId !== value)
    })
  }

  const onChangePlant = (record, plant) => {
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.map((item) =>
        item.MaterialId === record.MaterialId ? { ...item, PlantId: plant } : item
      )
    })
  }

  const onChangeSalePlant = (record, plant) => {
    const foundMaterial = findCurrentMaterialById(specMaterialList, record.MaterialId)
    const foundCurrentPlant = findCurrentPlant(fullRestaurant, plant)
    dispatch(getSlocsByPlant({ plant: foundCurrentPlant.Plant }))

    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.map((item) =>
        item.MaterialId === foundMaterial.Id && item.IsSale ? { ...item, PlantId: plant } : item
      )
    })
  }

  const onChangeSloc = (record, sloc) => {
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.map((item) =>
        item.MaterialId === record.MaterialId ? { ...item, StorageLocationId: sloc } : item
      )
    })
  }

  const onChangeSaleSloc = (record, sloc) => {
    const foundMaterial = findCurrentMaterialById(specMaterialList, record.MaterialId)
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.map((item) =>
        item.MaterialId === foundMaterial.Id && item.IsSale ? { ...item, StorageLocationId: sloc } : item
      )
    })
  }

  const onChangeFioriSloc = (record, sloc) => {
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.map((item) =>
        item.MaterialId === record.MaterialId ? { ...item, StorageLocationId: sloc } : item
      )
    })
  }

  const onChangePOSl = (record, sl) => {
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.map((item) =>
        item.MaterialId === record.MaterialId ? { ...item, OrderQuantity: sl } : item
      )
    })
  }

  const onChangeSalePOSl = (record, sl) => {
    const foundMaterial = findCurrentMaterialById(specMaterialList, record.MaterialId)
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.map((item) =>
        item.MaterialId === foundMaterial.Id && item.IsSale ? { ...item, OrderQuantity: sl } : item
      )
    })
  }

  const onChangeSLAMS = (record, sl) => {
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.map((item) =>
        item.MaterialId === record.MaterialId ? { ...item, OrderQuantity: sl } : item
      )
    })
  }

  const onchangeFioriSL = (record, sl) => {
    setInitQueries({
      ...initQueries,
      POOrderMaterialMaps: initQueries.POOrderMaterialMaps.map((item) =>
        item.MaterialId === record.MaterialId ? { ...item, OrderQuantity: sl } : item
      )
    })
  }

  const handleValueChangeForm = (value) => {
    if (value.OrderTimeTo) value.OrderTimeTo = dateToISO(value.OrderTimeTo._d)
    if (value.OrderTime) value.OrderTime = dateToISO(value.OrderTime._d)
    if (value.FlowRequest)
      dispatch(
        getAMSStocks({
          RequestTypeId: value.FlowRequest,
          Email: 'hn.37thstreet.indochina@ggg.com.vn'
        })
      )
    if (value.MaterialGroupCode) {
      const materialId = findCurrentMaterialGroup(materialGroupList, value.MaterialGroupCode)
      console.log('materialId', materialId)
      dispatch(getPlantsByMaterialGroup({ materialId: materialId.Id }))
    }
    if (value.PlantId) {
      const foundCurrentRestaurant = fullRestaurant.find((item) => item.Id === value.PlantId)
      console.log('foundCurrentRestaurant', foundCurrentRestaurant)
      dispatch(getSlocsByPlant({ plant: foundCurrentRestaurant.Plant }))
    }
    if (value.POStuffTypeId) {
      dispatch(getSuppliersByStuffType({ listStuffTypeIds: value.POStuffTypeId }))
      dispatch(getPlantsByMaterialGroup({ materialId: value.POStuffTypeId }))
    }
    if (value.SupplierId) {
      dispatch(getConfigBySupplier({ Id: value.SupplierId }))
    }

    delete value?.ABC
    delete value?.ABC2
    delete value?.ABC3

    setInitQueries({ ...initQueries, ...value })
  }

  // const handleGetSpecifiMaterialList = () => {
  //   console.log('initQueries', initQueries)
  //   if (!initQueries.MaterialGroupCode || !initQueries.SupplierId)
  //     message.error('Vui l??ng nh???p th??ng tin Nh?? Cung C???p ho???c Nh??m H??ng')
  //   else {
  //     dispatch(getSpecificMaterialList({ suppliersId: initQueries.SupplierId }))
  //   }
  // }

  const handleOpenSaleTable = () => {
    setIsShowSaleTable(!isShowSaleTable)
  }

  const POTable = <CTable columns={POTableColumns} dataSource={defaultTableData} />
  const AMStable = <CTable columns={AMSTableColumns} dataSource={defaultTableData} />
  const FioiriTable = <CTable columns={FioriTableColumns} dataSource={defaultTableData} />

  const handleClickReset = () => location.reload()

  return (
    <ViewWrapper
      title="T???o ????n ?????t h??ng"
      subTitle="T???o y??u c???u ?????t h??ng cho nh?? cung c???p ho???c c??c b??? ph???n cung ???ng n???i b???"
    >
      <Form form={form} onValuesChange={handleValueChangeForm}>
        <InputGroup title="Th??ng tin chung">
          <Form.Item name="POGoodsTypeId">
            <CInput
              label="Ph??n lo???i h??ng h??a"
              important
              inputType="PlantsSelect"
              placeholder="Ch???n lo???i h??ng h??a"
              options={poGoodTypes}
              isLoading={isLoading}
            />
          </Form.Item>
          <Form.Item name="POVendorId">
            <CInput inputType="RadioGroup" label="Ch???n ????n v??? cung c???p" options={radioData} />
          </Form.Item>
        </InputGroup>

        {/* Flow here */}
        <InputGroup title="Th??ng tin y??u c???u">
          <CInput
            label="H??? th???ng x??? l??"
            value={orderSystemId === 3 ? 'AMS' : orderSystemId === 2 ? 'SAP Fiori' : orderSystemId === 1 ? 'PO' : ''}
            disabled
          />
          {orderSystemId === 3 ? (
            <>
              <Form.Item
                name="FlowRequest"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Lu???ng y??u c???u"
                  inputType="Select"
                  placeholder="Ch???n lu???ng y??u c???u"
                  important
                  options={flowRequests}
                  isLoading={isLoading}
                  additionValueType="takeId"
                />
              </Form.Item>
              <Form.Item
                name="TypeRequest"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Lo???i y??u c???u"
                  important
                  inputType="Select"
                  placeholder="Ch???n lo???i y??u c???u"
                  options={categories}
                  isLoading={isLoading}
                  additionValueType="takeId"
                  // onChange={onChangeSelect}
                />
              </Form.Item>

              <Form.Item
                name="WarehouseReceived"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Kho ti???p nh???n"
                  important
                  inputType="Select"
                  placeholder="Ch???n kho ti???p nh???n"
                  disabled={!stocksAMS?.length}
                  options={stocksAMS}
                  additionValueType="takeId"
                />
              </Form.Item>
              <Form.Item
                name="OrderTimeTo"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Ng??y y??u c???u giao h??ng"
                  important
                  inputType="DatePicker"
                  disabledDate={(current) => current && current < moment().endOf('day')}
                  defaultValue={moment(formatBaseDate(new Date()), 'DD/MM/YYYY')}
                />
              </Form.Item>
              <Form.Item
                name="OrderTime"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Ng??y ?????t h??ng"
                  important
                  notShowTime
                  inputType="DatePicker"
                  disabledDate={(d) => disabledDate(d, 0, systemDetailParams?.OrderBeforeDay)}
                  defaultValue={moment(formatBaseDate(new Date()), 'DD/MM/YYYY')}
                />
              </Form.Item>
            </>
          ) : orderSystemId === 2 ? (
            <>
              {/* <Form.Item name="OrderSystemId4">
                <CInput label="H??? th???ng x??? l??" defaultValue="SAP Fiori" disabled />
              </Form.Item> */}
              <Form.Item
                // name="POStuffTypeId"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Lo???i y??u c???u"
                  important
                  inputType="Select"
                  placeholder="Lo???i y??u c???u"
                  defaultValue={1}
                  value={1}
                  options={[
                    {
                      Id: 1,
                      Name: 'Y??u c???u m?????n h??ng - Stock transfer order'
                    }
                  ]}
                  additionValueType="takeId"
                  disabled
                />
              </Form.Item>
              <Form.Item
                name=""
                // rules={[
                //   {
                //     required: true,
                //     message: 'Tr?????ng n??y l?? b???t bu???c!'
                //   }
                // ]}
              >
                <CInput
                  label="M?? c??ng ty ?????t h??ng"
                  important
                  inputType="Select"
                  placeholder="Ch???n c??ng ty"
                  additionValueType="takeId"
                  showCompact
                  defaultValue={`${loginInfo?.Users?.CompanyCode} - ${loginInfo?.Users?.CompanyName}`}
                  disabled
                />
              </Form.Item>

              <Form.Item
                name="SupplierId"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="B??? ph???n cung ???ng n???i b???"
                  inputType="Select"
                  placeholder="Ch???n b??? ph???n cung ???ng n???i b???"
                  options={sapSuppliers?.filter((item) => item.Id !== loginInfo?.Users?.PlantId)}
                  isLoading={isLoading}
                  important
                  additionValueType="takeId"
                />
              </Form.Item>
              <Form.Item
                name="OrderTime"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Ng??y t???o phi???u"
                  important
                  notShowTime
                  inputType="DatePicker"
                  disabledDate={(d) => disabledDate(d, 0, systemDetailParams?.OrderBeforeDay)}
                  defaultValue={moment(formatBaseDate(new Date()), 'DD/MM/YYYY')}
                />
              </Form.Item>
              <Form.Item
                name="OrderTimeTo"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Ng??y y??u c???u giao h??ng"
                  important
                  inputType="DatePicker"
                  disabledDate={(d) => disabledDate(d, systemDetailParams?.DayProcessOrder)}
                  defaultValue={moment(formatBaseDate(new Date()), 'DD/MM/YYYY')}
                />
              </Form.Item>
            </>
          ) : orderSystemId === 1 ? (
            // PO
            <>
              {/* <Form.Item name="OrderSystemId3">
                <CInput label="H??? th???ng x??? l??" defaultValue="PO" disabled />
              </Form.Item> */}
              <Form.Item
                name="POStuffTypeId"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Nh??m h??ng"
                  important
                  inputType="Select"
                  placeholder="Ch???n nh??m h??ng"
                  additionValueType="takeId"
                  options={stuffTypes}
                />
              </Form.Item>
              <Form.Item
                name="SupplierId"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Nh?? cung c???p"
                  inputType="Select"
                  placeholder="Ch???n nh?? cung c???p"
                  options={suppliersByStuffType}
                  disabled={!suppliersByStuffType.length}
                  important
                  additionValueType="takeId"
                />
              </Form.Item>
              <Form.Item
                name="OrderTimeTo"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Ng??y y??u c???u giao h??ng"
                  important
                  inputType="DatePicker"
                  disabledDate={
                    configBySupplier?.length ? (d) => disabledDate(d, systemDetailParams?.DayProcessOrder) : false
                  }
                  defaultValue={moment(formatBaseDate(new Date()), 'DD/MM/YYYY')}
                />
              </Form.Item>
              <Form.Item
                name="OrderTime"
                rules={[
                  {
                    required: true,
                    message: 'Tr?????ng n??y l?? b???t bu???c!'
                  }
                ]}
              >
                <CInput
                  label="Ng??y ?????t h??ng"
                  important
                  inputType="DatePicker"
                  notShowTime
                  disabledDate={(d) => disabledDate(d, 0, systemDetailParams?.OrderBeforeDay)}
                  defaultValue={moment(formatBaseDate(new Date()), 'DD/MM/YYYY')}
                />
              </Form.Item>
              <Form.Item>
                <CInput label="Ghi ch??" inputType="" placeholder="" />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item>
                <CInput
                  label="Nh??m h??ng"
                  important
                  inputType="Select"
                  placeholder="Ch???n nh??m h??ng"
                  additionValueType="takeId"
                />
              </Form.Item>
              <Form.Item>
                <CInput
                  label="Nh?? cung c???p"
                  inputType="Select"
                  placeholder="Ch???n nh?? cung c???p"
                  important
                  additionValueType="takeId"
                />
              </Form.Item>
              <Form.Item>
                <CInput
                  label="Ng??y y??u c???u giao h??ng"
                  important
                  inputType="DatePicker"
                  // defaultValue={moment(formatBaseDate(new Date()), 'DD/MM/YYYY')}
                />
              </Form.Item>
              <Form.Item>
                <CInput
                  label="Ng??y ?????t h??ng"
                  important
                  inputType="DatePicker"
                  // defaultValue={moment(formatBaseDate(new Date()), 'DD/MM/YYYY')}
                />
              </Form.Item>
              <Form.Item>
                <CInput label="Ghi ch??" inputType="" placeholder="" />
              </Form.Item>
            </>
          )}
        </InputGroup>
        <InputGroup
          typeGroup="Table"
          tableSlot={orderSystemId === 3 ? AMStable : orderSystemId === 2 ? FioiriTable : POTable}
          onClick={() =>
            orderSystemId === 3 ? addAMSProduct(true) : orderSystemId === 2 ? addFioriProduct(true) : addStock(true)
          }
          title="Th??ng tin h??ng h??a"
          extra={
            orderSystemId === 1 ? (
              <CButton type="secondary" onClick={handleOpenSaleTable}>
                Th??m s???n ph???m khuy???n m???i
              </CButton>
            ) : null
          }
        >
          {orderSystemId === 3 ? (
            <Form.Item name="ABC2">
              <CInput
                showCompact
                inputType="Select"
                placeholder="T??n h??ng h??a"
                options={productsAMS}
                onSelect={onChangeAMSProductsSelect}
                onDeselect={onDeSelectAMS}
                additionValueType="takeId"
                isLoading={loadingAMSProducts}
                disabled={!productsAMS.length || loadingAMSProducts}
                mode="multiple"
              />
            </Form.Item>
          ) : orderSystemId === 2 ? (
            <Form.Item name="ABC3">
              <CInput
                showCompact
                inputType="Select"
                placeholder="T??n h??ng h??a"
                options={specMaterialList}
                onSelect={onChangeFioriProductSelect}
                onDeselect={onDeSelectFiori}
                additionValueType="takeId"
                mode="multiple"
              />
            </Form.Item>
          ) : (
            // PO
            <Form.Item name="ABC">
              <CInput
                showCompact
                inputType="Select"
                placeholder="T??n h??ng h??a"
                options={specMaterialList}
                onSelect={onChangeMaterialSelect}
                onDeselect={onDeSelectMaterial}
                additionValueType="takeId"
                mode="multiple"
              />
            </Form.Item>
          )}
        </InputGroup>

        {isShowSaleTable && (
          <SaleProductsTable
            onChangeSalePOSl={onChangeSalePOSl}
            onChangeSalePlant={onChangeSalePlant}
            onChangeSaleSloc={onChangeSaleSloc}
            onDeselectSale={onDeselectSale}
            appPlant={appPlantById}
            handleClearSaleSelect={handleClearSaleSelect}
            initQueries={initQueries}
          />
        )}

        <div className="float-right flex">
          <CButton type="danger" onClick={handleClickReset}>
            Nh???p l???i
          </CButton>
          <div className="mx-6">
            <CButton type="secondary" htmlType="submit" onClick={() => setSubmitType(2)} disabled={!orderSystemId}>
              L??u t???m
            </CButton>
          </div>
          <CButton
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={() => setSubmitType(1)}
            disabled={!orderSystemId}
          >
            Ho??n th??nh
          </CButton>
        </div>
      </Form>
    </ViewWrapper>
  )
}

export default ViewCreateOrder
