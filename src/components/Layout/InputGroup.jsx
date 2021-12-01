import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons'
import { Card, ConfigProvider } from 'antd'

import CButton from '../common/CButton'
import CEmpty from '../common/CEmpty'
import CTable from '../common/CTable'

const InputGroup = ({ children, typeGroup, title, extra, tableSlot, onClick }) => {
  return (
    <Card title={title} className="w-full mb-4 rounded-2xl inputGroup shadow-sm font-barlow" extra={extra}>
      {typeGroup === 'Table' ? (
        <div className="w-full">
          <div className="flex mb-6 justify-between">
            <div className="w-11/12 mr-6">{children}</div>
            <CButton onClick={onClick} icon={<PlusSquareOutlined />} type="primary" baseSize>
              Thêm
            </CButton>
          </div>
          <ConfigProvider renderEmpty={CEmpty}>{tableSlot ? tableSlot : <CTable />}</ConfigProvider>
        </div>
      ) : typeGroup === 'SearchForm' ? (
        <>
          <div className="grid grid-cols-3 gap-7">{children}</div>
          <div className="w-full">
            <div className="float-right">
              <CButton icon={<SearchOutlined />} type="primary" onClick={onClick} htmlType="submit">
                Tìm kiếm
              </CButton>
            </div>
          </div>
        </>
      ) : typeGroup === 'TableOnly' ? (
        <div className="w-full">
          <ConfigProvider renderEmpty={CEmpty}>{tableSlot ? tableSlot : <CTable />}</ConfigProvider>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-x-5 gap-y-3">{children}</div>
      )}
    </Card>
  )
}

export default InputGroup
