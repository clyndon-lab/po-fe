import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import InfiniteSearching from '@components/common/InfiniteSearching'
import ViewWrapper from '@components/common/ViewWrapper'
import { fetchSupplierList, getFullRestaurant, sendNotifications } from '@store/thunks/setting.thunk'
import { Col, message, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { searchOptions } from '../../../static/supplier.static'

const SettingNotification = () => {
  const dispatch = useDispatch()
  const { fullRestaurant, suppliers, isLoading } = useSelector((state) => state['settings'])
  const [restaurantList, setRestaurantList] = useState()
  const [supplierList, setSupplierList] = useState()
  const [selectResIDs, setSelectResIDs] = useState([])
  const [selectNCCIDs, setSelectNCCIDs] = useState([])
  const [contentToSend, setContentToSend] = useState({
    Subject: '',
    Contents: '',
    CreatedBy: 'Admin',
    ListRestaurantIds: [],
    ListSuppliersIds: []
  })

  useEffect(() => {
    dispatch(getFullRestaurant())
    dispatch(fetchSupplierList({ take: 10 }))
  }, [])

  useEffect(() => setRestaurantList(fullRestaurant), [fullRestaurant])
  useEffect(() => setSupplierList(suppliers), [suppliers])
  useEffect(() => setContentToSend({ ...contentToSend, ListRestaurantIds: selectResIDs }), [selectResIDs])
  useEffect(() => setContentToSend({ ...contentToSend, ListSuppliersIds: selectNCCIDs }), [selectNCCIDs])

  const handleSelectingRestaurant = (e) => {
    if (!selectResIDs.length) setSelectResIDs([...selectResIDs, e.target.value])
    else
      !selectResIDs.find((item) => item === e.target.value)
        ? setSelectResIDs([...selectResIDs, e.target.value])
        : setSelectResIDs(selectResIDs.filter((item) => item !== e.target.value))
  }

  const handleSelectingSuppliers = (e) => {
    console.log(e.target.value)
    if (!selectNCCIDs.length) setSelectNCCIDs([...selectNCCIDs, e.target.value])
    else
      !selectNCCIDs.find((item) => item === e.target.value)
        ? setSelectNCCIDs([...selectNCCIDs, e.target.value])
        : setSelectNCCIDs(selectNCCIDs.filter((item) => item !== e.target.value))
  }

  const checkValid = () => {
    if (
      !contentToSend.Subject ||
      !contentToSend.Contents ||
      !contentToSend.ListRestaurantIds.length ||
      !contentToSend.ListSuppliersIds.length
    )
      return false
    return true
  }

  const handleClickSend = () =>
    !checkValid() ? message.error('Vui l??ng nh???p ?????y ????? th??ng tin!') : dispatch(sendNotifications(contentToSend))

  const handleOnSearchRestaurant = (e) => {
    const value = e.target.value

    setTimeout(() => {
      if (value) {
        if (isNaN(value))
          setRestaurantList(restaurantList.filter((item) => item.Name.toLowerCase().includes(value.toLowerCase())))
        else setRestaurantList(restaurantList.filter((item) => item.Id.toString().includes(value)))
      } else setRestaurantList(fullRestaurant)
    }, 500)
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

  const handleFilterByOptionRestaurant = (value) => {
    console.log('value', value)
    console.log('selectResIDs', selectResIDs)

    if (value === 'unSelecting') setRestaurantList(fullRestaurant.filter((item) => !selectResIDs.includes(item.Id)))
    if (value === 'selecting') {
      setRestaurantList(fullRestaurant.filter((item) => selectResIDs.includes(item.Id)))
    }
    if (value === 'all') setRestaurantList(fullRestaurant)
  }

  const handleFilterByOptionSuppliers = (value) => {
    if (value === 'unSelecting') setSupplierList(suppliers.filter((item) => !selectNCCIDs.includes(item.Id)))
    if (value === 'selecting') {
      setSupplierList(suppliers.filter((item) => selectNCCIDs.includes(item.Id)))
    }
    if (value === 'all') setSupplierList(suppliers)
  }

  return (
    <ViewWrapper title="G???i th??ng b??o ?????n Nh?? h??ng - Nh?? cung c???p">
      <Card>
        <CardHeader title="N???i dung th??ng b??o"></CardHeader>
        <Row gutter="10" className="p-5 pr-7">
          <Col span="4">
            <p className="text-lg text-right">Ti??u ?????:</p>
          </Col>
          <Col span="20" className="mb-4">
            <CInput
              placeholder="Nh???p ti??u ?????"
              direction="horizontal"
              full
              onChange={(e) => setContentToSend({ ...contentToSend, Subject: e.target.value })}
            ></CInput>
          </Col>

          <Col span="4">
            <p className="text-lg text-right">N???i dung:</p>
          </Col>
          <Col span="20" className="mb-4">
            <CInput
              placeholder="Nh???p n???i dung"
              direction="horizontal"
              inputType="Multiline"
              rows={5}
              onChange={(e) => setContentToSend({ ...contentToSend, Contents: e.target.value })}
            ></CInput>
          </Col>

          <Col span="4">
            <p className="text-lg text-right">Danh s??ch nh?? h??ng: </p>
          </Col>
          <Col span="20">
            <InfiniteSearching
              onChange={handleSelectingRestaurant}
              onSearch={handleOnSearchRestaurant}
              onFilter={handleFilterByOptionRestaurant}
              listData={restaurantList}
              loading={isLoading}
              defaultSortOptions="all"
              placeholder="T??m nh?? h??ng theo m?? ho???c t??n"
            />
          </Col>

          <Col span="4" className="mt-4">
            <p className="text-lg text-right">Danh s??ch NCC: </p>
          </Col>
          <Col span="20" className="mt-4">
            <InfiniteSearching
              onChange={handleSelectingSuppliers}
              onSearch={handleOnSearchSuppliers}
              onFilter={handleFilterByOptionSuppliers}
              typeList="suppliers"
              loading={isLoading}
              listData={supplierList}
              defaultSortOptions="all"
              placeholder="T??m nh?? cung c???p theo m?? ho???c t??n"
            />
          </Col>
          <div className="w-full text-right mt-4 mr-2">
            <CButton type="primary" onClick={handleClickSend}>
              G???i Email
            </CButton>
          </div>
        </Row>
      </Card>
    </ViewWrapper>
  )
}

export default SettingNotification
