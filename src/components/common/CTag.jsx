import { Tag } from 'antd'

const CTag = (props) => {
  // console.log(props.type)
  const status = {
    draft: {
      title: 'Lưu tạm',
      color: '#0088FF'
    },
    Note: {
      title: 'Lưu tạm',
      color: '#0088FF'
    },
    string: {
      title: 'Lưu tạm',
      color: '#0088FF'
    },
    pending: {
      title: 'Đang xử lý',
      color: '#F0B71C'
    },
    Inprogress: {
      title: 'Đang xử lý',
      color: '#F0B71C'
    },
    INPROGRESS: {
      title: 'Đang xử lý',
      color: '#F0B71C'
    },
    complete: {
      title: 'Hoàn thành',
      color: '#0D7718'
    },
    error: {
      title: 'Hoàn thành',
      color: '#FF0000'
    },
    new: {
      title: 'Tạo mới',
      color: '#EF15D9'
    },
    /////Sync
    synced: {
      title: 'Đã đồng bộ',
      color: '#0D7718'
    },
    pendingSync: {
      title: 'Đang đồng bộ',
      color: '#F0B71C'
    },

    Draft: {
      title: 'Lưu nháp',
      color: '#0088FF',
    },
    New: {
      title: 'Tạo mới',
      color: '#EF15D9',
    },
    Confirmed: {
      title: 'Đã xác nhận',
      color: '#0D7718',
    },
    AutoConfirm: {
      title: 'Tự động hoàn thành',
      color: '#FF0000',
    },
    Updated: {
      title: 'Giao hàng một phần',
      color: '#0088FF',
    },
    Completed: {
      title: 'Đã hoàn thành',
      color: '#FF0000',
    },
    Deleted: {
      title: 'Đã xóa',
      color: '#0D7718',
    },
    ErrorSync: {
      title: 'Lỗi đồng bộ',
      color: '#0D7718',
    },
    Reject: {
      title: 'Không xác nhận đơn',
      color: '#f20505',
    },
    NoDelivery: {
      title: 'Chưa nhận hàng',
      color: '#0D7718',
    },
  }

  return (
    <Tag
      style={{
        background: 'white',
        borderColor: status[props?.type]?.color || '#eee',
        color: status[props?.type]?.color || '#eee'
      }}
      className="w-40 h-8 rounded-full text-center py-1 text-sm"
    >
      {props?.title === null || props?.title === '' || props?.title === undefined
        ? status[props?.type]?.title
        : props?.title || ''}
    </Tag>
  )
}

export default CTag
