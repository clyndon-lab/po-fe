import { ConfigProvider, Table } from 'antd'

import CEmpty from './CEmpty'

const CTable = ({
  columns,
  dataSource,
  onChange,
  rowSelection,
  loading,
  scroll,
  expandable,
  expandIconColumnIndex
}) => {
  return (
    <ConfigProvider renderEmpty={CEmpty}>
      <div className="config-provider">
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
          rowSelection={rowSelection}
          pagination={false}
          loading={loading}
          expandable={expandable}
          expandIconColumnIndex={expandIconColumnIndex}
          scroll={scroll ? { x: scroll } : false}
        />
      </div>
    </ConfigProvider>
  )
}

export default CTable
