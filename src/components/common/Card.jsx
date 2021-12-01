const Card = ({ children, additionClassName, px, py }) => {
  return (
    <div style={{padding: `${py}px ${px}px`}} className={`bg-white rounded-2xl shadow-sm ${additionClassName}`}>
      {children}
    </div>
  )
}

export default Card
