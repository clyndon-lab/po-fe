import { EditOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CModal from '@components/common/CModal'
import CTable from '@components/common/CTable'
import InfiniteSearching from '@components/common/InfiniteSearching'
import ViewWrapper from '@components/common/ViewWrapper'
import { getSuppliersByStuffType } from '@store/thunks/combo.thunk'
import { fetchStuffTypes, fetchSupplierByPage } from '@store/thunks/orders.thunk'
import { saveSupplierStuffTypeUpdate } from '@store/thunks/setting.thunk'
import { Divider } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SettingStufftype = () => {
  const dispatch = useDispatch()
  const { stuffTypes, suppliers } = useSelector((state) => state['orders'])
  const { suppliersByStuffType } = useSelector((state) => state['combo'])

  // State
  const [stuffTypesList, setStuffTypeList] = useState([])
  const [supplierList, setSupplierList] = useState([])
  const [selectingStuffType, setSelectingStuffType] = useState({})
  const [selectingStuffTypeName, setSelectingStuffTypeName] = useState({})
  const [dataToUpdate, setDataToUpdate] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchStuffTypes())
    dispatch(fetchSupplierByPage({ skip: 1, take: 3000 }))
  }, [])

  useEffect(() => setStuffTypeList(stuffTypes), [stuffTypes])
  useEffect(() => setSupplierList(suppliers), [suppliers])
  useEffect(
    () =>
      suppliersByStuffType.length
        ? setSupplierList(supplierList.filter((item) => !mapsuppliersByStuffTypeId().includes(item.Id)))
        : setSupplierList(suppliers),
    [suppliersByStuffType]
  )

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'center',
      // eslint-disable-next-line
      render: (text, record, index) => <p>{index + 1}</p>
    },
    {
      title: 'Mã nhóm hàng',
      dataIndex: 'Code',
      // eslint-disable-next-line
      render: (text, record, index) => <a>{text}</a>
    },
    {
      title: 'Tên nhóm hàng',
      dataIndex: 'Name'
    },
    {
      title: 'Cấu hình nhóm hàng - NCC',
      dataIndex: 'edit',
      align: 'center',
      render: (_, record) => (
        <div className="flex justify-center items-center cursor-pointer" onClick={() => handleOpenUpdateModal(record)}>
          <EditOutlined />
          <a className="text-yellow ml-4">Sửa</a>
        </div>
      )
    }
  ]

  const handleSetVisible = () => setVisible(!visible)
  const getSupplierByStuff = (listStuffTypeIds) => dispatch(getSuppliersByStuffType({ listStuffTypeIds }))
  const mapsuppliersByStuffTypeId = () => suppliersByStuffType.map((item) => item.Id)

  const handleOpenUpdateModal = (record) => {
    handleSetVisible()
    getSupplierByStuff(record.Id)
    setSelectingStuffType({ StuffTypeId: record.Id, Id: record.Id })
    setSelectingStuffTypeName(record.Name)
    console.log(record)
  }

  const handleSelectingSuppliers = (e) => {
    const value = e.target.value
    // console.log(value)
    if (!dataToUpdate?.length) setDataToUpdate([...dataToUpdate, { ...selectingStuffType, SupplierId: value }])
    else
      !dataToUpdate?.find((item) => item.SupplierId === value)
        ? setDataToUpdate([...dataToUpdate, { ...selectingStuffType, SupplierId: value }])
        : setDataToUpdate(dataToUpdate.filter((item) => item.SupplierId !== value))

    console.log('dataToUpdate', dataToUpdate)
  }

  const handleOnSearchSuppliers = (e) => {
    const value = e.target.value

    setTimeout(() => {
      if (value) {
        if (isNaN(value))
          setSupplierList(supplierList.filter((item) => item.LongName.toLowerCase().includes(value.toLowerCase())))
        else setSupplierList(supplierList.filter((item) => item.Id.toString().includes(value)))
      } else setSupplierList(suppliers)
    }, 500)
  }

  const handleFilterByOptionSuppliers = (value) => {
    if (value === 'unSelecting')
      setSupplierList(suppliers.filter((item) => !selectingStuffType.SupplierId.includes(item.Id)))
    if (value === 'selecting') {
      setSupplierList(suppliers.filter((item) => selectingStuffType.SupplierId.includes(item.Id)))
    }
    if (value === 'all') setSupplierList(suppliers)
  }

  const handleUpdate = () => {
    console.log('selectingStuffType', selectingStuffType)
    dispatch(saveSupplierStuffTypeUpdate(dataToUpdate))
  }

  const Footer = (
    <div>
      <CButton type="secondary" onClick={handleSetVisible}>
        Hủy
      </CButton>
      <CButton type="primary" onClick={handleUpdate}>
        Thêm
      </CButton>
    </div>
  )

  return (
    <ViewWrapper title="Cấu hình Nhóm hàng - Nhà cung cấp">
      <Card>
        <CardHeader title="Danh sách nhóm hàng" />
        <div className="p-6">
          <CTable columns={columns} dataSource={stuffTypesList} />
        </div>
      </Card>

      <CModal
        w={850}
        footer={Footer}
        title="Sửa liên kết Nhóm hàng - Nhà cung cấp"
        visible={visible}
        handleVisible={handleSetVisible}
      >
        <div className="flex ml-12 text-lg">
          <div className="text-right mr-4">
            <p className="mb-4">Nhóm hàng:</p>
            <p>Tên nhóm hàng:</p>
          </div>
          <div className="text-left text-lg font-medium mr-4">
            <p className="mb-4">{selectingStuffType?.StuffTypeId}</p>
            <p>{selectingStuffTypeName}</p>
          </div>
        </div>
        <Divider />
        <p className="font-medium text-lg mb-2">Danh sách nhà cung cấp</p>
        <InfiniteSearching
          onChange={handleSelectingSuppliers}
          onSearch={handleOnSearchSuppliers}
          onFilter={handleFilterByOptionSuppliers}
          placeholder="Tìm nhà cung cấp theo mã hoặc tên"
          listData={supplierList}
        />
      </CModal>
    </ViewWrapper>
  )
}

export default SettingStufftype
