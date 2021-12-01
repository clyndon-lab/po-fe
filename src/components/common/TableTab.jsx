import { EditOutlined } from '@ant-design/icons'

const TableTab = (props) => {
  return (
    <div className="flex w-[180px]">
      <div className="self-center">
        <EditOutlined className="text-white rounded-full p-[10px]" style={{ background: props.color }} />
      </div>
      <div className="ml-2">
        <p style={{fontSize:'16px'}} className="font-medium text-black font-barlow">{props.title || ''}</p> 
        <p className="font-medium font-barlow" style={{ color: props.color, fontSize:'16px' }}>{props.amount || 0}</p>
      </div>
    </div>
  )
}

export default TableTab
