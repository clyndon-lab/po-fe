import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import ViewWrapper from '@components/common/ViewWrapper'
import InputGroup from '@components/Layout/InputGroup'
import { CKleft, CKright , deliveryStatus } from '@static/orderDetail.static'
import { exampleQueries } from '@static/viewCreateOrder.static'
import {
  fetchLoginInfo,
  getSapSuppliers,
  getSpecificMaterialList,
  getSuppliersByStuffType
} from '@store/thunks/combo.thunk'
import {
  createOrderAction,
  fetchOrderByID,
  fetchPOGoodTypes,
  fetchStuffTypes,
  updateOrderAction
} from '@store/thunks/orders.thunk'
import { getAppPlantById, getFullRestaurant } from '@store/thunks/setting.thunk'
import { dateToISO, findCurrentMaterial, findCurrentMaterialById, findCurrentPlant } from '@utils/core.utils'
import { Col, Form, InputNumber, message, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

const { Option } = Select

const UpdateCK = () => {
  const columns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'MaterialId',
      render: (text) => {
        return <p>{findCurrentMaterialById(specMaterialList, text)?.Material}</p>
      }
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'MaterialName',
      render: (_, record) => <p>{findCurrentMaterialById(specMaterialList, record.MaterialId)?.MaterialName}</p>
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'OrderQuantity',
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
      title: 'ĐVT',
      dataIndex: 'OrderUnit'
    },
    {
      title: 'Plant',
      dataIndex: 'PlantId',
      render: (_, record) => <p>{findCurrentPlant(fullRestaurant, record?.PlantId)?.Name}</p>
    },
    {
      title: 'Vị trí lưu kho(sloc)',
      dataIndex: 'StorageLocationId',
      render: (text, record) => (
        <Select
          className="block"
          onChange={(e) => onChangeSloc(record, e)}
          defaultValue={text}
          optionFilterProp="children"
          showSearch
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          {plantsMapped
            ?.find((item) => item?.Id === record.PlantId)
            ?.SAPStorageLocation?.map(({ SlocDes, Id }, idx) => (
              <Option value={Id} key={idx}>
                {SlocDes}
              </Option>
            ))}
        </Select>
      )
    },
    {
      title: 'Địa chỉ nhận hàng',
      dataIndex: 'ReceiveAddress',
      render: (text) => (
        <Select
          className="block"
          // defaultValue={fullRestaurant?.[0]?.Id}
          defaultValue={text ?? fullRestaurant?.[0]?.Id}
          optionFilterProp="children"
          showSearch
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          {fullRestaurant?.map(({ Name, Id }, idx) => (
            <Option value={Id} key={idx}>
              {Name}
            </Option>
          ))}
        </Select>
      )
    }
  ]
  const saleColumns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'MaterialId',
      render: (text) => {
        return <p>{findCurrentMaterialById(specMaterialList, text)?.Material}</p>
      }
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'MaterialName',
      render: (_, record) => <p>{findCurrentMaterialById(specMaterialList, record.MaterialId)?.MaterialName}</p>
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'OrderQuantity',
      render: (text) => (
        <InputNumber
          defaultValue={text}
          // onChange={(e) => onChangePOSl(record, e)}
          className="block rounded"
          min={1}
          precision={2}
        />
      )
    },
    {
      title: 'ĐVT',
      dataIndex: 'OrderUnit'
    },
    {
      title: 'Plant',
      dataIndex: 'PlantId',
      render: (_, record) => <p>{findCurrentPlant(fullRestaurant, record?.PlantId)?.Name}</p>
    },
    {
      title: 'Vị trí lưu kho(sloc)',
      dataIndex: 'StorageLocationId',
      render: (text, record) => (
        <Select
          className="block"
          onChange={(e) => onChangeSaleSloc(record, e)}
          defaultValue={text}
          optionFilterProp="children"
          showSearch
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          {plantsMapped
            ?.find((item) => item?.Id === record.PlantId)
            ?.SAPStorageLocation?.map(({ SlocDes, Id }, idx) => (
              <Option value={Id} key={idx}>
                {SlocDes}
              </Option>
            ))}
        </Select>
      )
    },
    {
      title: 'Địa chỉ nhận hàng',
      dataIndex: 'ReceiveAddress',
      render: (text) => (
        <Select
          className="block"
          // defaultValue={fullRestaurant?.[0]?.Id}
          defaultValue={text ?? fullRestaurant?.[0]?.Id}
          optionFilterProp="children"
          showSearch
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          {fullRestaurant?.map(({ Name, Id }, idx) => (
            <Option value={Id} key={idx}>
              {Name}
            </Option>
          ))}
        </Select>
      )
    }
  ]
  const dispatch = useDispatch()
  const history = useHistory()
  const { params } = useRouteMatch()
  const { poGoodTypes, stuffTypes, ordersByID, isLoading } = useSelector((state) => state['orders'])
  const { suppliersByStuffType, specMaterialList, loginInfo } = useSelector((state) => state['combo'])
  const { fullRestaurant, appPlantById } = useSelector((state) => state['settings'])

  // State
  const [tableData, setTableData] = useState([])
  const [saleTableData, setSaleTableData] = useState([])
  const [selectingPlant, setSelectingPlant] = useState(null)
  const [selectingStock, setSelectingStock] = useState(null)
  const [selectingSalePlant, setSelectingSalePlant] = useState(null)
  const [selectingSaleStock, setSelectingSaleStock] = useState(null)
  const [submitType, setSubmitType] = useState(null)
  const [queries, setQueries] = useState(exampleQueries)
  const [isShowSaleTable, setIsShowSaleTable] = useState(false)
  const [slocsMapped, setSlocMap] = useState([])
  const [plantsMapped, setPLantsMapped] = useState([])
  const [form] = Form.useForm()

  // useEffect
  useEffect(() => {
    dispatch(fetchOrderByID({ id: params?.id }))
    dispatch(fetchPOGoodTypes())
    dispatch(getSapSuppliers())
    dispatch(fetchStuffTypes())
    dispatch(getFullRestaurant())
    dispatch(fetchLoginInfo())

    setQueries({ ...queries, CKTicketId: 1 })
  }, [])

  useEffect(() => {
    if (submitType) {
      const foundProducts = queries?.POOrderMaterialMaps?.find(item => !item.IsSale)
      if (!foundProducts) message.error('Vui lòng nhập thông tin hàng hóa!')
      else {
        if (submitType === 2) {
          dispatch(updateOrderAction(queries, history, true))
        } else dispatch(createOrderAction(queries, history, false))
      }
    }
    setSubmitType(null)
  }, [submitType])

  useEffect(() => {
    console.log('queries', queries)
  }, [queries])

  useEffect(() => {
    if (
      specMaterialList.length &&
      fullRestaurant.length &&
      slocsMapped.length === ordersByID?.POOrderMaterialMaps?.length
    ) {
      setSlocMap([])
    }
  }, [fullRestaurant, specMaterialList, slocsMapped])

  useEffect(() => {
    if (appPlantById && !tableData.length) {
      setSlocMap([...slocsMapped, appPlantById])
    }
    if (appPlantById) setPLantsMapped([...plantsMapped, appPlantById])
  }, [appPlantById])

  useEffect(() => {
    if (ordersByID) {
      form.setFieldsValue(ordersByID)
      ordersByID?.POOrderMaterialMaps?.forEach((item) => dispatch(getAppPlantById(item?.PlantId)))
      dispatch(getSuppliersByStuffType({ listStuffTypeIds: ordersByID?.POStuffTypeId }))
      dispatch(getSpecificMaterialList({ suppliersId: ordersByID?.SupplierId }))
      // setTableData(ordersByID?.POOrderMaterialMaps)

      const isIsale = ordersByID?.POOrderMaterialMaps.find((item) => item.IsSale)
      if (isIsale) {
        setIsShowSaleTable(true)
        // setSaleTableData(ordersByID?.POOrderMaterialMaps)
      }
    }

    if (ordersByID?.POOrderMaterialMaps?.length) {
      setTableData(ordersByID?.POOrderMaterialMaps?.filter((item) => !item.IsSale))
      setSaleTableData(ordersByID?.POOrderMaterialMaps?.filter((item) => item.IsSale))
      setQueries({ ...handleFormatQueries(ordersByID), SystemOrderId: ordersByID?.SystemOrderId })
    }
  }, [ordersByID])

  useEffect(() => {
    if (loginInfo)
      setQueries({
        ...queries,
        CreatedBy: loginInfo.Users.UserName,
        OrderBy: loginInfo.Users.FullName,
        PlantId: loginInfo.Users.PlantId ?? 1,
        Email: loginInfo.Users.Email
      })
  }, [loginInfo])

  useEffect(() => {
    setSelectingStock(null)
    // form.setFieldsValue({ SupplierId: null })
  }, [queries.POStuffTypeId])

  useEffect(() => {
    setSelectingStock(null)
  }, [queries.SupplierId])

  const handleOpenSaleTable = () => {
    setIsShowSaleTable(!isShowSaleTable)
  }

  useEffect(() => {
    if (selectingStock) {
      addStock(false)
    }
  }, [selectingStock?.Material])

  useEffect(() => {
    if (selectingSaleStock) addSaleStock(false)
  }, [selectingSaleStock?.Material])

  const addStock = (isClick) => {
    if (!selectingStock) return message.info('Vui lòng chọn hàng hóa!')
    if (isClick) {
      setTableData(queries.POOrderMaterialMaps.filter((item) => !item.IsSale))
      return
    }
    const isExist = queries.POOrderMaterialMaps.filter((item) => !item.IsSale)
      .filter((item) => item.PlantId === selectingPlant.Id)
      .find((item) => item.MaterialId === selectingStock.MaterialId)
    const foundMaterial = findCurrentMaterial(specMaterialList, selectingStock.Material)

    if (isExist) message.info('Đã tồn tại loại hàng này trong danh sách')
    else {
      if (selectingStock) {
        // setTableData([...tableData, selectingStock])
        setQueries({
          ...queries,
          POOrderMaterialMaps: [
            ...queries.POOrderMaterialMaps,
            {
              MaterialId: foundMaterial.Id,
              PlantId: selectingPlant?.Id,
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
              CKTicketId: 1
            }
          ]
        })
      }
    }
  }
  const addSaleStock = (isClick) => {
    if (!selectingSaleStock) return message.info('Vui lòng chọn hàng hóa!')
    if (isClick) {
      setSaleTableData(queries.POOrderMaterialMaps.filter((item) => item.IsSale))
      return
    }
    const isExistStock = queries.POOrderMaterialMaps.filter((item) => item.IsSale)
      .filter((item) => item.PlantId === selectingSalePlant.Id)
      .find((item) => item.MaterialId === selectingSaleStock.MaterialId)
    const foundMaterial = findCurrentMaterial(specMaterialList, selectingSaleStock.Material)

    if (isExistStock) message.info('Đã tồn tại loại hàng này trong danh sách')
    else {
      if (selectingSaleStock) {
        setQueries({
          ...queries,
          POOrderMaterialMaps: [
            ...queries.POOrderMaterialMaps,
            {
              MaterialId: foundMaterial.Id,
              PlantId: selectingSalePlant?.Id,
              NotDeliveredQuantity: 0,
              LastQuantity: 0,
              UseQuantity: 0,
              StandardQuantity: 0,
              OrderQuantity: 1,
              DeliveredQuantity: 0,
              ReceivedQuantity: 0,
              Unit: foundMaterial.OrderUnit ?? 'string',
              Price: 0,
              IsSale: true,
              Images: 'string',
              SumPrice: 0,
              IsNotNorm: true,
              NormQuantity: 0,
              LineNbr: 0,
              SAPUnit: foundMaterial.OrderUnit ?? 'str',
              StorageLocationId: appPlantById?.SAPStorageLocation?.[0].Id,
              CKTicketId: 1
            }
          ]
        })
      }
    }
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

  const handleValueChangeForm = (value) => {
    console.log('value', value)
    if (value.OrderTimeTo) value.OrderTimeTo = dateToISO(value.OrderTimeTo._d)
    if (value.OrderTime) value.OrderTime = dateToISO(value.OrderTime._d)
    if (value.POStuffTypeId) dispatch(getSuppliersByStuffType({ listStuffTypeIds: value.POStuffTypeId }))
    if (value.SupplierId) dispatch(getSpecificMaterialList({ suppliersId: value.SupplierId }))

    setQueries({ ...queries, ...value })
  }

  const onSelectingStock = (value) => {
    const index = specMaterialList.findIndex((item) => item.Id === value)
    setSelectingStock({
      MaterialId: value,
      Material: specMaterialList[index].Material,
      MaterialName: specMaterialList[index].MaterialName,
      sl: 1,
      OrderUnit: specMaterialList[index].OrderUnit ?? 'Cái',
      PlantId: selectingPlant?.Id,
      StorageLocationId: appPlantById?.SAPStorageLocation,
      ReceiveAddress: fullRestaurant
    })
  }

  const onDeselectStock = (value) => {
    const isExist = tableData
      .filter((item) => item.PlantId === selectingPlant.Id)
      .find((item) => item.MaterialId === selectingStock.MaterialId)
    if (isExist) return

    const filterSale = queries.POOrderMaterialMaps.filter((item) => !item.IsSale)
      .filter((item) => item.PlantId === selectingPlant.Id)
      .filter((item) => item.MaterialId !== value)

    const filterPlant = queries.POOrderMaterialMaps.filter((item) => !item.IsSale)
      .filter((item) => item.PlantId !== selectingPlant.Id)
      .concat(filterSale)

    setQueries({
      ...queries,
      POOrderMaterialMaps: queries.POOrderMaterialMaps.filter((item) => item.IsSale).concat(filterPlant)
    })

    setSelectingStock(null)
  }

  const onDeselectSaleStock = (value) => {
    const isExist = tableData
      .filter((item) => item.PlantId === selectingSalePlant.Id)
      .find((item) => item.MaterialId === selectingSaleStock.MaterialId)
    if (isExist) return

    const filterSale = queries.POOrderMaterialMaps.filter((item) => item.IsSale)
      .filter((item) => item.PlantId === selectingSalePlant.Id)
      .filter((item) => item.MaterialId !== value)

    const filterPlant = queries.POOrderMaterialMaps.filter((item) => item.IsSale)
      .filter((item) => item.PlantId !== selectingSalePlant.Id)
      .concat(filterSale)

    setQueries({
      ...queries,
      POOrderMaterialMaps: queries.POOrderMaterialMaps.filter((item) => !item.IsSale).concat(filterPlant)
    })

    setSelectingSaleStock(null)
  }

  const onSelectingsaleStock = (value) => {
    const index = specMaterialList.findIndex((item) => item.Id === value)
    setSelectingSaleStock({
      MaterialId: value,
      Material: specMaterialList[index].Material,
      MaterialName: specMaterialList[index].MaterialName,
      sl: 1,
      OrderUnit: specMaterialList[index].OrderUnit ?? 'Cái',
      PlantId: selectingSalePlant?.Id,
      StorageLocationId: appPlantById?.SAPStorageLocation,
      ReceiveAddress: fullRestaurant
    })
  }

  const onSelectingPlant = (value) => {
    const foundPlant = findCurrentPlant(fullRestaurant, value)
    setSelectingPlant(foundPlant)
    setSelectingStock({
      ...selectingStock,
      PlantId: foundPlant?.Id
    })
    dispatch(getAppPlantById(foundPlant?.Id))
  }

  const onSelectingSalePlant = (value) => {
    const foundPlant = findCurrentPlant(fullRestaurant, value)
    setSelectingSalePlant(foundPlant)
    setSelectingSaleStock({
      ...selectingSaleStock,
      PlantId: foundPlant?.Id
    })
    dispatch(getAppPlantById(foundPlant?.Id))
  }

  const onChangeSloc = (record, sloc) => {
    const foundMaterial = findCurrentMaterial(specMaterialList, record.Material)
    const filterdByPlant = queries.POOrderMaterialMaps.filter((item) => item.PlantId === record.PlantId && !item.IsSale)
    const updatedArr = filterdByPlant.map((item) =>
      item.MaterialId === foundMaterial.Id ? { ...item, StorageLocationId: sloc } : item
    )
    const concatOtherArr = queries.POOrderMaterialMaps.filter(
      (item) => item.PlantId !== record.PlantId && !item.IsSale
    ).concat(queries.POOrderMaterialMaps.filter((item) => item.IsSale))
    const compose = concatOtherArr.concat(updatedArr)
    setQueries({
      ...queries,
      POOrderMaterialMaps: compose
    })
  }

  const onChangeSaleSloc = (record, sloc) => {
    const foundMaterial = findCurrentMaterial(specMaterialList, record.Material)
    const filterdByPlant = queries.POOrderMaterialMaps.filter((item) => item.PlantId === record.PlantId && item.IsSale)
    const updatedArr = filterdByPlant.map((item) =>
      item.MaterialId === foundMaterial.Id ? { ...item, StorageLocationId: sloc } : item
    )
    const concatOtherArr = queries.POOrderMaterialMaps.filter(
      (item) => item.PlantId !== record.PlantId && item.IsSale
    ).concat(queries.POOrderMaterialMaps.filter((item) => !item.IsSale))
    const compose = concatOtherArr.concat(updatedArr)
    setQueries({
      ...queries,
      POOrderMaterialMaps: compose
    })
  }

  const onChangePOSl = (record, sl) => {
    setQueries({
      ...queries,
      POOrderMaterialMaps: queries.POOrderMaterialMaps.map((item) =>
        item.MaterialId === record.MaterialId ? { ...item, OrderQuantity: sl } : item
      )
    })
  }

  const handleUpdateOrder = () => {
    if (!queries.POOrderMaterialMaps.length) message.error('Vui lòng nhập thông tin hàng hóa!')
    else dispatch(updateOrderAction(queries, true, history, params))
    // console.log('queries', queries)
    // console.log('tableData', tableData)
  }

  const formatDisplayData = (value, formatType) => {
    if (formatType === 'POStuffTypeId') return stuffTypes?.find((item) => item.Id === value)?.Name
    if (formatType === 'POGoodsTypeId') return poGoodTypes?.find((item) => item.Id === value)?.Name
    if (formatType === 'SupplierId') return suppliersByStuffType?.find((item) => item.Id === value)?.SupplierName
    if (formatType === 'POStatusId')
      return <CTag type={deliveryStatus?.find((item) => item.Id === value)?.StatusCode} />

    return value
  }

  const InfoSections = (value) => {
    return (
      <Row gutter={1} className="mt-6 first:mt-0">
        <Col span={8}>
          <p className="text-right text-lg font-barlow">{value?.title}:</p>
        </Col>
        <Col span={12}>
          <p className="text-left text-lg  ml-5 text-dark font-medium font-barlow">
            {formatDisplayData(ordersByID?.[value?.dataIndex], value?.dataIndex)}
          </p>
        </Col>
      </Row>
    )
  }

  return (
    <ViewWrapper title="Tạo phiếu yêu cầu" subTitle="Purchase request /..............">
      <div className="mb-4">
        <Card>
          <CardHeader title="Thông tin yêu cầu"></CardHeader>
          <Row gutter={0} className="pb-6 pl-2">
            <Col span={10}>
              {CKleft.map((item, index) => (
                <InfoSections key={index} {...item}></InfoSections>
              ))}
            </Col>
            <Col span={12}>
              {CKright.map((item, index) => (
                <InfoSections key={index} {...item}></InfoSections>
              ))}
            </Col>
          </Row>
        </Card>
      </div>
      <Form onValuesChange={handleValueChangeForm} form={form}>
        <InputGroup
          typeGroup="Table"
          title="Thông tin hàng hóa"
          tableSlot={<CTable columns={columns} dataSource={tableData} />}
          extra={
            <CButton
              type="secondary"
              onClick={handleOpenSaleTable}
              disabled={queries.POOrderMaterialMaps.filter((item) => item.IsSale).length}
            >
              Thêm sản phẩm khuyến mại
            </CButton>
          }
          onClick={() => addStock(true)}
        >
          <CInput
            inputType="CompactSelect"
            direction="vertical"
            placeholder="Tìm hàng hóa theo mã hoặc tên"
            showSearch
            selectPlaceholder="Chọn nhà hàng"
            // value={selectingStock?.MaterialName}
            sortOptions={fullRestaurant}
            dataOptions={specMaterialList}
            disabled={!fullRestaurant.length}
            disabledData={!selectingPlant || !specMaterialList.length}
            onSelect={onSelectingStock}
            onFilter={onSelectingPlant}
            onDeselect={onDeselectStock}
            mode="multiple"
          />
        </InputGroup>

        {/* Sale Table */}
        {isShowSaleTable || saleTableData?.length ? (
          <InputGroup
            typeGroup="Table"
            title="Thông tin hàng hóa khuyến mại"
            tableSlot={<CTable columns={saleColumns} dataSource={saleTableData} />}
            onClick={() => addSaleStock(true)}
          >
            <CInput
              inputType="CompactSelect"
              direction="vertical"
              placeholder="Tìm hàng hóa theo mã hoặc tên"
              showSearch
              selectPlaceholder="Chọn nhà hàng"
              // value={selectingSaleStock?.MaterialName}
              sortOptions={fullRestaurant}
              dataOptions={specMaterialList}
              disabled={!fullRestaurant.length}
              disabledData={!selectingSalePlant || !specMaterialList.length}
              onSelect={onSelectingsaleStock}
              onFilter={onSelectingSalePlant}
              onDeselect={onDeselectSaleStock}
              mode="multiple"
            />
          </InputGroup>
        ) : null}

        <div className="float-right flex">
          <CButton type="" onClick={() => history.push(`/orders/detail-ck/${params.id}`)}>
            Thoát
          </CButton>
          <div className="ml-4">
            <CButton type="primary" htmlType="submit" loading={isLoading} onClick={handleUpdateOrder}>
              Hoàn thành
            </CButton>
          </div>
        </div>
      </Form>
    </ViewWrapper>
  )
}

export default UpdateCK
