import ViewWrapper from '@components/common/ViewWrapper'
import { fetchPost } from '@store/thunks/posts.thunk'
import OrderList from '@views/ViewHome/elements/OrdersTable'
import Shipments from '@views/ViewHome/elements/Shipments'
import ShipmentsBack from '@views/ViewHome/elements/ShipmentsBack'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const ViewHome = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPost())
  }, [])

  return (
    <ViewWrapper title="Trang chủ">
      <div>
        <OrderList />
      </div>
      <div className="mt-6 pb-6">
        <Shipments />
      </div>
      <div className="mt-6">
        <ShipmentsBack />
      </div>
    </ViewWrapper>
  )
}

export default ViewHome
