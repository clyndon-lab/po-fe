import { Modal } from 'antd'

const CModal = ({ children, title, visible, handleVisible, footer, w }) => {
  // const Footer = (
  //   <div>
  //     <CButton type="secondary" onClick={handleVisible}>
  //       Thoát
  //     </CButton>
  //     <CButton type="primary" onClick={handleVisible}>
  //       Đồng bộ
  //     </CButton>
  //   </div>
  // )

  const Title = <div className="font-barlow text-xl font-medium">{title}</div>

  return (
    <Modal
      closable={false}
      width={w}
      footer={footer}
      title={Title}
      visible={visible}
      onOk={handleVisible}
    >
      {children}
    </Modal>
  )
}

export default CModal
