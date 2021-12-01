import '@assets/css/orders.css'

import { SearchOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
// import CConfirmModal from '@components/common/CConfirmModal'
import CInput from '@components/common/CInput'
import CModal from '@components/common/CModal'
import CPagination from '@components/common/CPagination'
import CTable from '@components/common/CTable'
import InfiniteSearching from '@components/common/InfiniteSearching'
import ViewWrapper from '@components/common/ViewWrapper'
// import InputGroup from '@components/Layout/InputGroup'
import { getListRestaurant, postRestaurantSetting } from '@store/thunks/setting.thunk'
import { Button, Checkbox, Col, Divider, Form, Row } from 'antd'
import { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { formatNumber } from '@utils/core.utils'
import { listData, searchOptions } from '../../../static/supplier.static'

const SettingRestaurant = () => {
  const dispatch = useDispatch()
  const { restaurants, totalRestaurant, isLoading } = useSelector((state) => state['settings'])

  const [visible, setVisible] = useState(false)
  // const [searchValue, setSearchValue] = useState('')
  const [restauranstList, setRestauranstList] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [query, setQuery] = useState({ skip: page, take: limit })
  const btn = createRef()

  // const [isShowConfirm, setIsShowConfirm] = useState(false)

  const handleChangeAmount = (value, id) => {
    // console.log(value)
    setRestauranstList(
      restauranstList.map((item) => {
        if (item.Id === id) {
          return {
            ...item,
            OrderLimit: value
          }
        } else return item
      })
    )
  }

  const handleCheckSAP = (value, id) => {
    // console.log(value)
    setRestauranstList(
      restauranstList.map((item) => {
        if (item.Id === id) {
          return {
            ...item,
            isSAP: value
          }
        } else return item
      })
    )
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'key',
      width: '5%'
    },
    {
      title: 'Mã Nhà hàng',
      dataIndex: 'Plant',
      key: 'Plant',
      width: '15%',
      render: (text) => <p>{text == null ? ' - ' : text} </p>
    },
    {
      title: 'Tên nhà hàng/Phòng ban',
      dataIndex: 'Name',
      key: 'Name',
      width: '25%'
    },
    {
      title: 'Khu vực giá',
      dataIndex: 'SupplyRegion',
      key: 'SupplyRegion',
      width: '15%',
      render: (text) => <p>{text == null ? ' - ' : text} </p>
    },
    {
      title: 'Sử dụng SAP',
      dataIndex: 'IsSAP',
      key: 'IsSAP',
      width: '15%',
      align: 'center',
      render: (text, record) => (
        <Checkbox checked={text} onChange={(e) => handleCheckSAP(e.target.checked, record.Id)}></Checkbox>
      )
    },
    {
      title: 'Hạn mức đặt hàng',
      dataIndex: 'OrderLimit',
      key: 'OrderLimit',
      width: '15%',
      render: (text, record) => (
        <CInput
          inputType = 'Currency'
          value={text}
          onChange={(e) => handleChangeAmount(e || 0, record.Id)}
          min={0}
        ></CInput>
      )
    }
    // {
    //   title: () => <p classNam
    //   dataIndex: 'limitLink',
    //   key: 'limitLink',
    //   align: 'center',
    //   // width: '22%',
    //   render: () => (
    //     <>
    //       <span className="mr-4">
    //         <EditOutlined />
    //       </span>
    //       <a onClick={() => setVisible(true)}>
    //         <span className="text-yellow">Sửa</span>
    //       </a>
    //     </>
    //   )
    // }
  ]

  const onSearch = (e) => {
    // setSearchValue(e.codeOrNameRestaurant)
    setQuery({ ...query, codeOrNameRestaurant: e.codeOrNameRestaurant })
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
    await dispatch(getListRestaurant(query))
  }

  const onSaveAmount = async () => {
    await dispatch(postRestaurantSetting(restauranstList))
  }

  // const onOpenModal = () => {
  //   const payload = restauranstList
  //     .filter((item) => item.OrderLimit !== 0)
  //     .map((o) => {
  //       return {
  //         Id: o.Id,
  //         OrderLimit: o.OrderLimit
  //       }
  //     })
  //   if (payload?.length > 0) {
  //     setIsShowConfirm(true)
  //   }
  // }

  useEffect(() => {
    setRestauranstList(
      restaurants?.map((item, index) => {
        return {
          index: index + limit * (page - 1) + 1,
          isSAP: item.IsSAP,
          ...item
        }
      })
    )
  }, [restaurants])

  useEffect(() => {
    setPage(1)
    fetchData({ ...query, skip: 0 })
  }, [query])

  return (
    <ViewWrapper title="Quản lý định mức nhà hàng">
      <div className="mb-6">
        <Card>
          <CardHeader title="Tìm kiếm"></CardHeader>
          <Form onFinish={onSearch}>
            <Row>
              <Col span="8" className="px-6  pb-6">
                <Form.Item name="codeOrNameRestaurant">
                  <CInput label="Nhà hàng" inputType="" placeholder="Nhập mã hoặc tên nhà hàng" />
                </Form.Item>
              </Col>
              <Col span="24" className="self-end text-right px-5 pb-6">
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
        <CardHeader title="Danh sách nhà hàng"></CardHeader>
        <div className="pl-9 pr-9 pb-9 order-table">
          <CTable pagination={false} columns={columns} dataSource={restauranstList} loading={isLoading} />
          <CPagination
            current={page}
            limit={limit}
            total={totalRestaurant}
            handleChangeLimit={(e) => onChangeLimit(e)}
            handleChangePage={(e) => onChangePage(e)}
          ></CPagination>
          <div className="text-right mt-2">
            <CButton type="primary" onClick={()=>onSaveAmount()}>
              Lưu
            </CButton>
          </div>
        </div>
      </Card>

      <CModal
        title="Sửa liên kết Nhà cung cấp - Mặt hàng không được phép đặt"
        visible={visible}
        handleVisible={() => setVisible(!visible)}
        bodyStyle={{ padding: 0 }}
        w={800}
      >
        <div>
          <div className="px-8 pt-4 w-11/12">
            <div className="flex mb-4">
              <p className="mr-4">Mã nhà cung cấp:</p>
              <p className="font-medium float-left">1CSHO035</p>
            </div>
            <div className="flex">
              <p className="mr-4">Tên nhà cung cấp:</p>
              <p className="font-medium">127 Nguyễn Hồng Đào_Nguyễn văn Trụ</p>
            </div>
          </div>
          <Divider className="m-0 my-4" />
          <div className="px-8 pb-4 w-12/12">
            <header className="mb-4">Danh sách nhà hàng</header>
            <InfiniteSearching sortOptions={searchOptions} listData={listData} defaultSortOptions="all" />
          </div>
        </div>
      </CModal>
      {/* <CConfirmModal
        visible={isShowConfirm}
        onOk={() => onSaveAmount()}
        handleVisible={() => setIsShowConfirm(!isShowConfirm)}
        loading={isLoading}
      ></CConfirmModal> */}
    </ViewWrapper>
  )
}

export default SettingRestaurant
