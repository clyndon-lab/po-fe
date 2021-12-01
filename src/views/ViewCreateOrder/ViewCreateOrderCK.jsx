import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CTable from '@components/common/CTable'
import ViewWrapper from '@components/common/ViewWrapper'
import InputGroup from '@components/Layout/InputGroup'
import { exampleQueries, vendors } from '@static/viewCreateOrder.static'
import {
  fetchLoginInfo,
  getSapSuppliers,
  getSpecificMaterialList,
  getSuppliersByStuffType
} from '@store/thunks/combo.thunk'
import { createOrderAction, fetchPOGoodTypes, fetchStuffTypes } from '@store/thunks/orders.thunk'
import { getAppPlantById, getFullRestaurant } from '@store/thunks/setting.thunk'
import { dateToISO, findCurrentMaterial, findCurrentMaterialById, findCurrentPlant } from '@utils/core.utils'
import { Form, Input, message, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const { Option } = Select

const ViewCreateOrderCK = () => {
  const columns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'MaterialId',
      render: (text) => {
        return <p>{findCurrentMaterialById(materials, text)?.Material}</p>
      }
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'MaterialName',
      render: (_, record) => <p>{findCurrentMaterialById(materials, record.MaterialId)?.MaterialName}</p>
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'OrderQuantity',
      render: (text) => <Input defaultValue={text} />
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
      render: () => (
        <Select
          className="block"
          defaultValue={fullRestaurant?.[0].Id}
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
        return <p>{findCurrentMaterialById(materials, text)?.Material}</p>
      }
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'MaterialName',
      render: (_, record) => <p>{findCurrentMaterialById(materials, record.MaterialId)?.MaterialName}</p>
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'OrderQuantity',
      render: (text) => <Input defaultValue={text} />
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
      render: () => (
        <Select
          className="block"
          defaultValue={fullRestaurant?.[0].Id}
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
  const { poGoodTypes, stuffTypes, isLoading } = useSelector((state) => state['orders'])
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
  const [plantsMapped, setPLantsMapped] = useState([])
  const [materials, setMaterials] = useState([])
  const [form] = Form.useForm()

  // useEffect
  useEffect(() => {
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
          dispatch(createOrderAction(queries, history, true))
        } else dispatch(createOrderAction(queries, history, false))
      }
    }
    setSubmitType(null)
  }, [submitType])

  useEffect(() => {
    if (appPlantById) setPLantsMapped([...plantsMapped, appPlantById])
  }, [appPlantById])

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
    form.setFieldsValue({ SupplierId: null })
  }, [queries.POStuffTypeId])

  useEffect(() => {
    setSelectingStock(null)
  }, [queries.SupplierId])

  useEffect(() => {
    console.log('queries', queries)
  }, [queries])

  const handleOpenSaleTable = () => {
    setIsShowSaleTable(!isShowSaleTable)
  }
  useEffect(() => {
    if (selectingStock) {
      addStock(false)
    }
  }, [selectingStock?.Material])

  useEffect(() => {
    if (selectingSaleStock) {
      addSaleStock(false)
    }
  }, [selectingSaleStock?.Material])

  useEffect(() => {
    if (specMaterialList?.length) setMaterials([...materials, ...specMaterialList])
    console.log('materials', materials)
    console.log('specMaterialList', specMaterialList)
  }, [specMaterialList])

  const addStock = (isClick) => {
    if (!selectingStock) return message.info('Vui lòng chọn hàng hóa!')
    if (isClick) {
      setTableData(queries.POOrderMaterialMaps.filter((item) => !item.IsSale))
      form.setFieldsValue({ needDelete: undefined })
      return
    }

    const isExist = isExistStock()
    const foundMaterial = findCurrentMaterial(specMaterialList, selectingStock.Material)

    if (isExist) message.info('Đã tồn tại loại hàng này trong danh sách')
    else {
      if (selectingStock) {
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
              CKTicketId: 1,
              ReceiveAddress: 5
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
      form.setFieldsValue({ needDelete2: undefined })
      return
    }

    const isExist = queries.POOrderMaterialMaps.filter((item) => item.IsSale)
      .filter((item) => item.PlantId === selectingSalePlant.Id)
      .find((item) => item.MaterialId === selectingSaleStock.MaterialId)
      
    console.log('isExist', isExist)
    console.log('selectingSaleStock', selectingSaleStock)
    console.log('selectingSalePlant', selectingSalePlant)
    const foundMaterial = findCurrentMaterial(specMaterialList, selectingSaleStock.Material)

    if (isExist) message.info('Đã tồn tại loại hàng này trong danh sách')
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
              CKTicketId: 1,
              ReceiveAddress: 5
            }
          ]
        })
      }
    }
  }

  const handleValueChangeForm = (value) => {
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

  const isExistStock = () =>
    queries.POOrderMaterialMaps.filter((item) => item.PlantId === selectingPlant.Id).find(
      (item) => item.MaterialId === selectingStock.MaterialId
    )

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
  }
  const onDeselectSaleStock = (value) => {
    const isExist = saleTableData
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

  const handleClickReset = () => location.reload()

  return (
    <ViewWrapper title="Tạo phiếu yêu cầu" subTitle="Purchase request /..............">
      <Form onValuesChange={handleValueChangeForm} form={form}>
        <InputGroup title="Thông tin chung">
          <Form.Item name="POGoodsTypeId">
            <CInput
              label="Phân loại hàng hóa"
              important
              inputType="PlantsSelect"
              placeholder="Chọn loại hàng hóa"
              defaultValue={1}
              options={poGoodTypes}
              isLoading={isLoading}
            />
          </Form.Item>
          <Form.Item name="POVendorId">
            <CInput inputType="RadioGroup" label="Chọn đơn vị cung cấp" options={vendors} defaultValue={1} />
          </Form.Item>
        </InputGroup>

        <InputGroup title="Thông tin yêu cầu">
          <CInput label="Hệ thống xử lý" defaultValue="PO App" disabled />
          <Form.Item
            name="POStuffTypeId"
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc!'
              }
            ]}
          >
            <CInput
              label="Nhóm hàng"
              important
              inputType="Select"
              placeholder="Chọn nhóm hàng"
              options={stuffTypes}
              isLoading={isLoading}
              additionValueType="takeId"
              // onChange={onChangeSelect}
            />
          </Form.Item>
          <Form.Item
            name="SupplierId"
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc!'
              }
            ]}
          >
            <CInput
              label="Nhà cung cấp"
              important
              inputType="Select"
              placeholder="Chọn nhà cung cấp"
              options={suppliersByStuffType}
              disabled={!suppliersByStuffType.length}
              additionValueType="takeId"
              // onChange={onChangeSelect}
            />
          </Form.Item>

          <Form.Item
            name="OrderTimeTo"
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc!'
              }
            ]}
          >
            <CInput label="Ngày yêu cầu giao hàng" important inputType="DatePicker" />
          </Form.Item>
          <Form.Item
            name="OrderTime"
            rules={[
              {
                required: true,
                message: 'Trường này là bắt buộc!'
              }
            ]}
          >
            <CInput label="Ngày đặt hàng" important inputType="DatePicker" />
          </Form.Item>
          <Form.Item>
            <CInput label="Ghi chú" inputType="" placeholder="" />
          </Form.Item>
        </InputGroup>

        <InputGroup
          typeGroup="Table"
          title="Thông tin hàng hóa"
          tableSlot={<CTable columns={columns} dataSource={tableData} />}
          extra={
            <CButton type="secondary" onClick={handleOpenSaleTable}>
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
            compactFormName="needDelete"
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
        {isShowSaleTable && (
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
              compactFormName="needDelete2"
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
        )}

        <div className="float-right flex">
          <CButton type="danger" onClick={handleClickReset}>
            Nhập lại
          </CButton>
          <div className="mx-6">
            <CButton type="secondary" htmlType="submit" onClick={() => setSubmitType(2)}>
              Lưu tạm
            </CButton>
          </div>
          <CButton type="primary" htmlType="submit" loading={isLoading} onClick={() => setSubmitType(1)}>
            Hoàn thành
          </CButton>
        </div>
      </Form>
    </ViewWrapper>
  )
}

export default ViewCreateOrderCK
