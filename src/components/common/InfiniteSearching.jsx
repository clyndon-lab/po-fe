import CInput from '@components/common/CInput'
import { searchOptions } from '@static/supplier.static'
import { Checkbox, List } from 'antd'

const InfiniteSearching = ({
  listData,
  defaultSortOptions,
  loading,
  onChange,
  typeList,
  onSearch,
  placeholder,
  onFilter
}) => {
  return (
    <div>
      <CInput
        inputType="Compact"
        direction="vertical"
        options={searchOptions}
        defaultValue={defaultSortOptions ?? null}
        onChange={onSearch}
        onFilter={onFilter}
        placeholder={placeholder}
      />

      <div className="mt-4 text-sm">
        <List
          bordered
          loading={loading}
          dataSource={listData}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                className="mr-4"
                onChange={onChange}
                value={typeList === 'materials' ? item.MaterialCode : item.Id || item.PlantID}
                key={item.Id || item.PlantID || item.PlantId}
                defaultChecked={item.Checked}
              />
              {typeList !== 'suppliers'
                ? `${item.Id || item.Plant} - ${item.Name ?? item.LongName}`
                : typeList === 'materials'
                  ? `${item.MaterialCode} - ${item.LongName}`
                  : `${item.Id} - ${item.LongName}`}{' '}
            </List.Item>
          )}
          className="rounded-lg overflow-scroll h-72"
        />
      </div>
    </div>
  )
}

export default InfiniteSearching
