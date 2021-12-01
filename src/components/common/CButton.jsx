import { Button } from 'antd'

const CButton = ({
  children,
  type,
  onClick,
  disabled,
  icon,
  loading,
  htmlType,
  baseSize,
  mt,
  ml,
  mb,
  mr,
  className
}) => {
  return (
    <Button
      onClick={onClick}
      className={`${className} ${
        type === 'primary'
          ? 'po-btn primary-btn'
          : type === 'secondary'
            ? 'po-btn secondary-btn'
            : type === 'simple '
              ? 'po-btn text-dark border-dark bg-white'
              : type === 'danger'
                ? 'po-btn danger-btn'
                : 'po-btn'
      }`}
      icon={icon}
      disabled={disabled}
      loading={loading}
      size="large"
      style={
        !baseSize
          ? { height: '52px', marginTop: mt, marginRight: mr, marginBottom: mb, marginLeft: ml }
          : { marginTop: mt, marginRight: mr, marginBottom: mb, marginLeft: ml }
      }
      htmlType={htmlType}
    >
      {children}
    </Button>
  )
}

export default CButton
