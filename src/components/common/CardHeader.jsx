import { isValidToolBar } from '@utils'

const CardHeader = ({ title, toolbar, children, switcher }) => {
  const hasTitle = typeof title === 'string'

  return (
    <div className={`flex justify-between pl-6 pr-6 pt-5 pb-4 text-xl ${switcher ? 'w-2/3' : 'w-full'}`}>
      {hasTitle && <p className="leading-5 font-semibold mt-1 font-barlow">{title}</p>}
      {switcher ?? <div>{switcher}</div>}
      {isValidToolBar(toolbar) ? toolbar : children}
    </div>
  )
}

export default CardHeader
