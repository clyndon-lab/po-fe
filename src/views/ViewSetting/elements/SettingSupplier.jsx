import '@assets/css/orders.css'

import { EditOutlined, SearchOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CModal from '@components/common/CModal'
import CPagination from '@components/common/CPagination'
import CTable from '@components/common/CTable'
import InfiniteSearching from '@components/common/InfiniteSearching'
import ViewWrapper from '@components/common/ViewWrapper'
// import InputGroup from '@components/Layout/InputGroup'
import { fetchSupplierList, getMappingsupplierRestaurant, updatePlantForSupplier } from '@store/thunks/setting.thunk'
import { Button, Col, Divider, Form, Row } from 'antd'
import { cloneDeep } from 'lodash'
import { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SettingSupplier = () => {
  const dispatch = useDispatch()
  const { suppliers, totalSuppliers, mappingsupplierRestaurant, isLoading } = useSelector((state) => state['settings'])
  const btn = createRef()

  const [visible, setVisible] = useState(false)
  const [supplierList, setSupplierList] = useState([])
  const [restaurantList, setRestaurantList] = useState(null)
  const [updateSupplierState, setUpdateSupplierState] = useState({
    SupplierId: null,
    LegacyCode: null,
    ShortName: null,
    PlantId: 0,
    MaterialId: 0
  })
  const [plantMap, setPlantMap] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [query, setQuery] = useState({ skip: page, take: limit, codeOrNameSupplier: '' })

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'key',
      width: '5%'
    },
    {
      title: 'Mã SAP NCC',
      dataIndex: 'Supplier',
      key: 'Supplier',
      width: '15%'
    },
    {
      title: 'Tên nhà cung cấp',
      dataIndex: 'ShortName',
      key: 'ShortName',
      width: '55%'
    },
    {
      title: () => <p className="whitespace-nowrap">LK nhà hàng</p>,
      dataIndex: 'storeLink',
      align: 'center',
      key: 'perone',
      // width: '15%',
      render: (_, record) => (
        <>
          <span className="mr-4">
            <EditOutlined />
          </span>
          <a onClick={() => handleOpenModalEditSupplier(record)}>
            <span className="text-yellow">Sửa</span>
          </a>
        </>
      )
    }
  ]

  useEffect(() => {
    setRestaurantList(mappingsupplierRestaurant)
    setPlantMap(
      mappingsupplierRestaurant
        .filter((r) => r.Checked)
        ?.map((item) => ({
          ...item,
          SupplierId: updateSupplierState.SupplierId,
          PlantId: item.PlantID,
          Checked: item.Checked,
          Name: item.Name
        }))
    )
  }, [mappingsupplierRestaurant])

  const onSearch = (e) => {
    // setSearchValue(e.codeOrNameSupplier)
    setQuery({ ...query, codeOrNameSupplier: e.codeOrNameSupplier })
  }

  const onChangeLimit = (e) => {
    setLimit(e)
    setPage(1)
    fetchData({ ...query, skip: 0, take: e })
  }

  const onChangePage = (e) => {
    setPage(e)
    fetchData({ ...query, skip: limit * (e - 1), take: limit })
  }

  const fetchData = async (query) => {
    await dispatch(fetchSupplierList(query))
  }

  useEffect(() => {
    // if (suppliers && suppliers.length > 0)
    setSupplierList(
      suppliers?.map((item, index) => {
        return {
          index: index + limit * (page - 1) + 1,
          ...item
        }
      })
    )
  }, [suppliers])

  useEffect(() => {
    setPage(1)
    fetchData({ ...query, skip: 0 })
  }, [query])

  const handleOpenModalEditSupplier = (record) => {
    setRestaurantList([])
    setUpdateSupplierState({
      ...updateSupplierState,
      SupplierId: record.Id,
      LegacyCode: record.LegacyCode,
      ShortName: record.ShortName
    })
    dispatch(getMappingsupplierRestaurant({ supplierID: record.Id }))
    setVisible(true)
    setPlantMap([])
  }

  const handlePickPlant = async (e) => {
    const val = e.target.value
    const itemChange = mappingsupplierRestaurant.find((item) => item?.PlantID === val)
    !plantMap.find((item) => item?.PlantId === val)
      ? setPlantMap([
        ...plantMap,
        { ...itemChange, SupplierId: updateSupplierState?.SupplierId, PlantId: val, Checked: true }
      ])
      : setPlantMap(
        cloneDeep(plantMap).map((p) => {
          if (p.PlantId === val) {
            p = { ...itemChange }
            p.Checked = false
            p.PlantId = val
            p.SupplierId = updateSupplierState?.SupplierId
          }
          return p
        })
      )
    setRestaurantList(
      restaurantList.map((r) => {
        if (r?.PlantID === val) {
          r.Checked === !r.Checked
        }
        return r
      })
    )
  }

  const handleSave = () => {
    setVisible(false)
    const changeList = plantMap.reduce((res, item) => {
      const existRestaurant = mappingsupplierRestaurant.find((m) => m?.PlantID === item?.PlantId)
      if (!existRestaurant?.PlantID || existRestaurant.Checked !== item.Checked) {
        res.push({
          SupplierId: updateSupplierState?.SupplierId,
          PlantId: item.PlantID,
          Checked: item.Checked
        })
      }
      return res
    }, [])
    dispatch(updatePlantForSupplier(changeList))
  }

  const searchRestaurant = (value) => {
    const list = mappingsupplierRestaurant.filter(
      (r) => r?.Name?.toLowerCase()?.includes(value) || r?.Plant?.includes(value)
    )
    setRestaurantList(list)
  }

  const handleSelectFilter = (value) => {
    switch (value) {
    case 'all':
      setRestaurantList(mappingsupplierRestaurant)
      break
    case 'selecting':
      setRestaurantList(mappingsupplierRestaurant.filter((r) => r.Checked))
      break
    case 'unSelecting':
      setRestaurantList(mappingsupplierRestaurant.filter((r) => !r.Checked))
      break

    default:
      break
    }
  }

  const Footer = (
    <div className="flex">
      <div className="justify-end flex w-full">
        <CButton type="secondary" onClick={() => setVisible(false)}>
          Thoát
        </CButton>
        <CButton type="primary" onClick={handleSave}>
          Lưu
        </CButton>
      </div>
    </div>
  )

  return (
    <ViewWrapper title="Danh sách nhà cung cấp">
      <div className="mb-6">
        <Card>
          <CardHeader title="Danh sách nhà cung cấp"></CardHeader>
          <Form onFinish={onSearch}>
            <Row>
              <Col span="8" className="px-6  pb-6">
                <Form.Item name="codeOrNameSupplier">
                  <CInput label="Nhà cung cấp" inputType="" placeholder="Nhập mã hoặc tên nhà cung cấp" />
                </Form.Item>
              </Col>
              <Col span="16" className="self-end text-right px-5 pb-6">
                <Button
                  onClick={() => btn.current.click()}
                  className="po-btn primary-btn h-[38px]"
                  icon={<SearchOutlined></SearchOutlined>}
                >
                  Tìm kiếm
                </Button>
              </Col>
            </Row>
            <Form.Item className="hidden">
              <Button ref={btn} htmlType="submit" />
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Card>
        <CardHeader title="Danh sách nhà cung cấp"></CardHeader>
        <div className="pl-9 pr-9 pb-9 order-table">
          <CTable pagination={false} columns={columns} dataSource={supplierList} loading={isLoading} />
          <CPagination
            current={page}
            limit={limit}
            total={totalSuppliers}
            handleChangeLimit={(e) => onChangeLimit(e)}
            handleChangePage={(e) => onChangePage(e)}
          ></CPagination>
        </div>
      </Card>
      {visible && (
        <CModal
          title="Sửa liên kết Nhà cung cấp - Nhà hàng"
          visible={visible}
          handleVisible={() => setVisible(!visible)}
          bodyStyle={{ padding: 0 }}
          footer={Footer}
          w={800}
        >
          <div>
            <div className="px-8 pt-4 w-11/12">
              <div className="flex mb-4">
                <p className="mr-4 text-lg">Mã nhà cung cấp:</p>
                <p className="font-medium float-left text-lg">{updateSupplierState?.LegacyCode}</p>
              </div>
              <div className="flex">
                <p className="mr-4 text-lg">Tên nhà cung cấp:</p>
                <p className="font-medium text-lg">{updateSupplierState?.ShortName}</p>
              </div>
            </div>
            <Divider className="m-0 my-4" />
            {/* <EditBody /> */}
            <div className="px-8 pb-4 w-12/12">
              <header className="mb-4 text-lg">Danh sách nhà hàng</header>
              <InfiniteSearching
                listData={restaurantList}
                onChange={handlePickPlant}
                loading={isLoading || !restaurantList}
                defaultSortOptions="all"
                onSearch={(e) => searchRestaurant(e.target.value)}
                placeholder="Tìm nhà hàng theo mã hoặc tên"
                onFilter={(e) => handleSelectFilter(e)}
              />
            </div>
          </div>
        </CModal>
      )}
    </ViewWrapper>
  )
}

export default SettingSupplier
