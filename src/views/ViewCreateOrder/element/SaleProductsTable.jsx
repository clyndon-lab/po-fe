import { DeleteOutlined } from '@ant-design/icons'
import CInput from '@components/common/CInput'
import CTable from '@components/common/CTable'
import InputGroup from '@components/Layout/InputGroup'
import { addSaleProduct } from '@store/actions/orders.action'
import { findCurrentMaterial, findCurrentMaterialById } from '@utils/core.utils'
import { Form, InputNumber, message, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select

const SaleProductsTable = ({
  onChangeSalePOSl,
  onChangeSalePlant,
  onChangeSaleSloc,
  appPlant,
  handleClearSaleSelect,
  initQueries,
  onDeselectSale
}) => {
  const dispatch = useDispatch()
  const { specMaterialList } = useSelector((state) => state['combo'])
  const [defaultTableData, setDefaultTableData] = useState([])
  const [dataToSend, setDataToSend] = useState([])
  const [selectingStock, setSelectingStock] = useState(null)
  const [isDelPOStock, setIsDelPOStock] = useState(false)

  useEffect(() => {
    if (dataToSend.length) dispatch(addSaleProduct(dataToSend))
  }, [dataToSend])

  const columns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'MaterialId',
      width: '20%',
      render: (text) => <p>{findCurrentMaterialById(specMaterialList, text)?.Material}</p>
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'MaterialName',
      width: '20%',
      render: (_, record) => <p>{findCurrentMaterialById(specMaterialList, record.MaterialId)?.MaterialName}</p>
    },
    {
      title: 'SL yêu cầu',
      dataIndex: 'OrderQuantity',
      width: '10%',
      render: (text, record) => (
        <InputNumber
          defaultValue={text}
          onChange={(e) => onChangeSalePOSl(record, e)}
          className="block rounded"
          min={1}
          precision={2}
        />
      )
    },
    {
      title: 'ĐVT',
      dataIndex: 'Unit',
      width: '8%'
    },
    {
      title: 'Kho vật lý (plant)',
      dataIndex: 'PlantId',
      width: '15%',
      render: (text, record) => (
        <Select
          className="block"
          onChange={(e) => onChangeSalePlant(record, e)}
          defaultValue={appPlant?.Id}
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          <Option value={appPlant?.Id}>{appPlant?.Name}</Option>
        </Select>
      )
    },
    {
      title: 'Vị trí lưu kho (sloc)',
      dataIndex: 'StorageLocationId',
      width: '15%',
      render: (text, record) => (
        <Select
          className="block"
          onChange={(e) => onChangeSaleSloc(record, e)}
          defaultValue={appPlant?.SAPStorageLocation?.[0].Id}
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          {appPlant?.SAPStorageLocation?.map(({ SlocDes, Id }, idx) => (
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

  useEffect(() => selectingStock && addStock(false), [selectingStock])
  useEffect(() => {
    if (isDelPOStock) {
      addStock(true)
      setIsDelPOStock(false)
    }
  }, [initQueries])

  const addStock = (isClick) => {
    if (isClick) {
      setDefaultTableData(initQueries.POOrderMaterialMaps.filter(item => item.IsSale))
      handleClearSaleSelect()
      return
    }
    const isExistStock = initQueries.POOrderMaterialMaps.filter((item) => item.IsSale).find(
      (item) => item.MaterialId === findCurrentMaterial(specMaterialList, selectingStock.Material)?.Id
    )
    const foundMaterial = findCurrentMaterial(specMaterialList, selectingStock.Material)

    if (isExistStock) message.info('Đã tồn tại loại hàng này trong danh sách')
    else {
      setDataToSend([
        {
          MaterialId: foundMaterial.Id,
          PlantId: selectingStock.PlantId,
          NotDeliveredQuantity: 0,
          LastQuantity: 0,
          UseQuantity: 0,
          StandardQuantity: 0,
          OrderQuantity: 1,
          DeliveredQuantity: 0,
          ReceivedQuantity: 0,
          Unit: foundMaterial.OrderUnit ?? 'str',
          Price: 0,
          IsSale: true,
          Images: 'string',
          SumPrice: 0,
          IsNotNorm: true,
          NormQuantity: 0,
          LineNbr: 0,
          SAPUnit: foundMaterial.OrderUnit ?? 'str',
          StorageLocationId: 0,
          CKTicketId: 0
        }
      ])
    }
  }

  const delStock = ({ MaterialId }) => {
    dispatch(addSaleProduct({ MaterialId }))
    setIsDelPOStock(true)
  }

  const onChangeMaterialSelect = (value) => {
    const index = specMaterialList.findIndex((item) => item.Id === value)
    setSelectingStock({
      Material: specMaterialList[index].Material,
      MaterialName: specMaterialList[index].MaterialName,
      sl: '1',
      OrderUnit: specMaterialList[index].OrderUnit ?? 'Cái',
      PlantId: null
    })
  }

  return (
    <InputGroup
      title="Thông tin hàng hóa khuyến mại"
      typeGroup="Table"
      tableSlot={<CTable columns={columns} dataSource={defaultTableData} />}
      onClick={() => addStock(true)}
    >
      <Form.Item name="ABC4">
        <CInput
          inputType="Select"
          placeholder="Tên hàng hóa"
          options={specMaterialList}
          onSelect={onChangeMaterialSelect}
          onDeselect={onDeselectSale}
          additionValueType="takeId"
          mode="multiple"
        />
      </Form.Item>
    </InputGroup>
  )
}

export default SaleProductsTable
