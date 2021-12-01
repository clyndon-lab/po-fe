import { Image, Pagination, Select } from 'antd'

// import DoubleLeft from '../../assets/images/double-left.png'
// import DoubleRight from '../../assets/images/double-right.png'
import SingleLeft from '../../assets/images/single-left.png'
import SingleRight from '../../assets/images/single-right.png'

const { Option } = Select

const CPagination = ({ current, limit, total, handleChangeLimit, handleChangePage, className }) => {
  function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return (
        <div
          onClick={() => {
            if (current > 0) handleChangePage(current - 1)
          }}
          className="cursor-pointer"
        >
          <Image src={SingleLeft} preview={false}></Image>
        </div>
      )
    }
    if (type === 'next') {
      return (
        <div
          onClick={() => {
            let max = Math.ceil(total / limit)
            if (current < max) handleChangePage(current + 1)
          }}
          className="cursor-pointer"
        >
          <Image src={SingleRight} preview={false}></Image>
        </div>
      )
    }
    return originalElement
  }

  return (
    <div className={`${className} flex font-barlow justify-end mt-3 text-base`}>
      <p className="pt-[3px] mr-2">Hiển thị</p>
      <Select
        defaultValue={10}
        value={limit}
        style={{ width: 120 }}
        onChange={(e) => handleChangeLimit(e)}
        getPopupContainer={(trigger) => trigger.parentNode}
      >
        <Option value={5}>5 kết quả</Option>
        <Option value={10}>10 kết quả</Option>
        <Option value={50}>50 kết quả</Option>
        <Option value={100}>100 kết quả</Option>
      </Select>
      <Pagination
        className="custom-pagination"
        current={current}
        total={total}
        itemRender={itemRender}
        pageSize={limit}
        showSizeChanger={false}
        onChange={(e) => handleChangePage(e)}
      />
    </div>
  )
}

export default CPagination
