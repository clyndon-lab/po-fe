import { Modal } from 'antd'

import CButton from './CButton'

const CConfirmModal = ({ title, description, visible, handleVisible, onOk, loading }) => {
  const Footer = (
    <div>
      <CButton h={40} type="secondary" onClick={handleVisible}>
        Hủy
      </CButton>
      <CButton loading={loading} h={40} type="primary" onClick={onOk}>
        Xác nhận
      </CButton>
    </div>
  )

  const Title = <div className="font-barlow text-xl font-medium">{title || 'Xác nhận'}</div>

  return (
    <Modal
      centered={true}
      closable={false}
      width={450}
      footer={Footer}
      title={Title}
      visible={visible}
      onOk={onOk}
    >
      <div className="font-barlow text-lg">{description || 'Bạn có chắc chắn muốn thao tác?'}</div>
    </Modal>
  )
}

export default CConfirmModal
