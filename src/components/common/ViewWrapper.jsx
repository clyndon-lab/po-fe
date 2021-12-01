import { isValidToolBar } from '@utils'
import { Typography } from 'antd'

const ViewWrapper = ({ children, title, subTitle, toolBar }) => {
  const hasTitle = typeof title === 'string' && title !== ''
  const hasSubTitle = typeof subTitle === 'string' && subTitle !== ''

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow-0 flex justify-between">
        {hasTitle && (
          <div className="mb-8">
            <Typography.Title className="font-barlow" strong level={3}>{title}</Typography.Title>
            {hasSubTitle && <h2 className="header-subtitle">{subTitle}</h2>}
          </div>
        )}

        {isValidToolBar(toolBar) && toolBar}
      </div>
      <div className="flex-grow overflow-y-auto h-[calc(100vh-180px)] hide-scrollbar">{children}</div>
    </div>
  )
}

export default ViewWrapper
