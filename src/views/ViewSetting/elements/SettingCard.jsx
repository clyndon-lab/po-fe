import '@assets/css/orders.css'

import { SettingFilled } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const SettingCard = ({ title, description, id }) => {

  const history = useHistory()

  return (
    <div className="setting-card h-[140px]" onClick={()=>history.push(`/setting/${id}`)}>
      <div className="place-self-center">
        <SettingFilled className="rounded-full bg-blue-icon text-white w-[50px] h-[50px] p-[12px] text-base" />
      </div>
      <div className="ml-6 font-barlow font-medium self-center">
        <div style={{fontSize:'21px'}}>{title}</div>
        <div className="mt-[6px] text-gray-5 text-lg">{description}</div>
      </div>
    </div>
  )
}

export default SettingCard
