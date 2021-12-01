import ViewWrapper from '@components/common/ViewWrapper'
import ReceiptList from '@views/ViewReceipt/elements/ReceiptList'

const ViewReceipt = () => {
  return (
    <ViewWrapper
      title="Danh sách đơn hàng"
      subTitle="Toàn bộ danh sách phiếu tổng hợp công nợ mà tài khoản được phân quyền"
    >
      <div className="mt-6">
        <ReceiptList />
      </div>
    </ViewWrapper>
  )
}

export default ViewReceipt
