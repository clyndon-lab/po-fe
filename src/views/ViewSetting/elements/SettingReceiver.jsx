import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CModal from '@components/common/CModal'
import CPagination from '@components/common/CPagination'
import CTable from '@components/common/CTable'
import ViewWrapper from '@components/common/ViewWrapper'
import InputGroup from '@components/Layout/InputGroup'
import { getListAppPlants, updateSlocForPlant } from '@store/thunks/setting.thunk'
import { Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SettingReceiver = () => {
  const dispatch = useDispatch()
  const { appPlants, appPlantById, isLoading, totalAppPlants } = useSelector((state) => state['settings'])

  const [plantUpdate, setPlanUpdate] = useState(null)
  const [visible, setVisible] = useState(false)
  const [isSettingSloc, setIsSettingSloc] = useState(false)
  const [updateSlocState, setUpdateSlocState] = useState({
    Id: 0,
    ReceiveAddress: 'string',
    IsReceiveAddressSloc: true,
    SAPStorageLocation: []
  })
  const [slocTableDataSource, setSlocTableDataSource] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [query, setQuery] = useState({ skip: page, take: limit })
  const typeAddress = [
    { name: 'Tất cả', value: -1 },
    { name: 'Plant', value: 'plant' },
    { name: 'Sloc', value: 'sloc' }
  ]

  const onChangePage = (e) => {
    setPage(e)
    setQuery({ ...query, skip: limit * (e - 1), take: limit })
  }

  const onChangeLimit = (e) => {
    setLimit(e)
    setPage(1)
    setQuery({ ...query, skip: 0, take: e })
  }

  useEffect(() => {
    dispatch(getListAppPlants({ ...query }))
  }, [query])

  const renderStt = (text, record, index) => {
    return <p>{index + 1 + (page - 1) * limit}</p>
  }
  const handleSelectPlant = (item) => {
    setVisible(!visible)
    setPlanUpdate(item)
  }

  const tableColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: renderStt
    },
    {
      title: 'Mã nhà hàng (plant)',
      dataIndex: 'Plant',
      key: 'Plant',
      render: (text, record) => (
        <a className="text-blue-text" onClick={() => handleSelectPlant(record)}>
          {text}
        </a>
      )
    },
    {
      title: 'Tên nhà hàng (plant)',
      dataIndex: 'Name',
      key: 'Name'
    },
    {
      title: 'Loại cấu hình địa chỉ',
      dataIndex: 'IsReceiveAddressSloc',
      key: 'IsReceiveAddressSloc',
      render: (text) => (text ? <p>Sloc</p> : <p>Plant</p>)
    }
  ]

  const plantTableColumns = [
    {
      title: 'Sloc',
      dataIndex: 'SlocDes',
      width: '20%'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'ReceiveAddress',
      render: (text, record) => (
        <Input
          placeholder="Nhập địa chỉ"
          defaultValue={text}
          className="rounded"
          onChange={(e) => handleSelectingSloc(record, e)}
        />
      )
    }
  ]

  const handleSelectingSloc = (record, e) => {
    setSlocTableDataSource(
      slocTableDataSource.map((item) => (item.Id === record.Id ? { ...item, ReceiveAddress: e.target.value } : item))
    )
  }

  useEffect(() => {
    if (updateSlocState.SAPStorageLocation.length) dispatch(updateSlocForPlant(updateSlocState))
  }, [updateSlocState.SAPStorageLocation])

  useEffect(() => {
    setSlocTableDataSource(plantUpdate?.SAPStorageLocation)
    setIsSettingSloc(false)
  }, [plantUpdate])

  const onSaveSloc = () => {
    const a = slocTableDataSource.filter((item) => item.ReceiveAddress)
    if (!a.length) return message.error('Bạn chưa nhập thông tin!')
    setIsSettingSloc(false)
    setUpdateSlocState({
      ...updateSlocState,
      SAPStorageLocation: a
    })
  }

  const ModalFooter = (
    <>
      <CButton type="secondary" onClick={() => setVisible(!visible)}>
        Thoát
      </CButton>
      <CButton type="primary" onClick={onSaveSloc}>
        Lưu
      </CButton>
    </>
  )

  const onClickSearch = () => {
    // const { plantSelected, address } = values
    // const plantIds = plantSelected.join(',')
    // let take = 10
    // if (plantSelected.length > 0 || address) {
    //   take = -1
    // }
    // dispatch(getListAppPlants({ take:10 }))
  }

  const handleUpdateReceiveSloc = (e) => {
    if (e.target.checked) {
      setUpdateSlocState({
        ...updateSlocState,
        Id: appPlantById?.Id,
        ReceiveAddress: appPlantById?.ReceiveAddress || '',
        IsReceiveAddressSloc: true
      })
    }
    setIsSettingSloc(e.target.checked)
  }

  useEffect(() => appPlants, [appPlants])

  return (
    <ViewWrapper title="Danh sách địa chỉ nhận hàng">
      <Form onFinish={onClickSearch}>
        <InputGroup typeGroup="SearchForm" title="Thông tin tìm kiếm">
          <Form.Item name="plantSelected">
            <CInput label="Tìm kiếm nhà hàng" placeholder="Nhập mã hoặc tên nhà hàng" />
          </Form.Item>
          <Form.Item name="address">
            <CInput label="Loại cấu hình địa chỉ" options={typeAddress} inputType="Select" />
          </Form.Item>
        </InputGroup>
      </Form>

      <div className="mt-6">
        <Card>
          <CardHeader title="Danh sách phiếu yêu cầu"></CardHeader>
          <div className="pb-9 px-9 order-table">
            <CTable pagination={false} columns={tableColumns} dataSource={appPlants} loading={isLoading} />
            <CPagination
              className="mt-5"
              current={page}
              limit={limit}
              total={totalAppPlants}
              handleChangeLimit={(e) => onChangeLimit(e)}
              handleChangePage={(e) => onChangePage(e)}
            ></CPagination>
          </div>
        </Card>
      </div>
      {visible && (
        <CModal
          title={`Cấu hình địa chỉ nhận hàng cho plant: ${plantUpdate?.Plant}`}
          visible={visible}
          handleVisible={() => setVisible(!visible)}
          bodyStyle={{ padding: 0 }}
          footer={ModalFooter}
          w={800}
        >
          <div>
            <div className="w-full mx-auto">
              <div className="flex w-full mb-4 text-lg">
                <p className="w-3/12 text-right mr-4">Tên plant:</p>
                <p className="w-9/12">{plantUpdate?.Name}</p>
              </div>
              <div className="flex w-full items-center mb-4 text-lg">
                <p className="mr-4 w-3/12 text-right">Địa chỉ plant:</p>
                <div className="w-9/12">
                  <CInput placeholder="Nhập địa chỉ plant" full defaultValue={plantUpdate?.Address} />
                </div>
              </div>
              <div className="w-ful flex mx-auto w-[47%] text-lg">
                <CInput
                  placeholder="Nhập mã hoặc tên địa chỉ"
                  inputType="CheckBox"
                  checked={isSettingSloc}
                  onChange={(e) => handleUpdateReceiveSloc(e)}
                />
                <p className="ml-4">Nhập địa chỉ sloc</p>
              </div>

              {isSettingSloc && (
                <div>
                  <CTable columns={plantTableColumns} dataSource={slocTableDataSource} />
                </div>
              )}
            </div>
          </div>
        </CModal>
      )}
    </ViewWrapper>
  )
}

export default SettingReceiver
