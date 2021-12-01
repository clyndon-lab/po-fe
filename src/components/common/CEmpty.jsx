import EmptyTableImg from '@assets/images/empty-table.png'
import { Image } from 'antd'

const CEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <div>
      <Image preview={false} src={EmptyTableImg} alt="empty" className="mt-10 w-[190px]"></Image>
      <p className="text-center text-dark-neutral text-sm font-semibold pb-12">
        Không có dữ liệu
      </p>
    </div>
  </div>
)

export default CEmpty
