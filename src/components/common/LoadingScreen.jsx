import { Spin } from 'antd'

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen z-50 fixed top-0 left-0">
      <Spin size="large" />
    </div>
  )
}

export default LoadingScreen
