import { SearchOutlined } from '@ant-design/icons'
import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Space, TimePicker } from 'antd'
import moment from 'moment'

import CDebounceSelect from '../common/CDebounceSelect'
// import format from 'date-fns/format'

const { Option } = Select
const { RangePicker } = DatePicker

const CInput = ({
  label,
  important,
  options,
  inputType,
  placeholder,
  onChange,
  defaultValue,
  disabled,
  align,
  direction,
  subTitle,
  isLoading,
  value,
  rows,
  full,
  type,
  checked,
  onFilter,
  max,
  min,
  additionValueType,
  allowClear,
  onClear,
  showSearch,
  onSearch,
  selectPlaceholder,
  showCompact,
  notShowTime,
  disabledDate,
  sortOptions,
  dataOptions,
  disabledData,
  modeSelect,
  fetchOptions,
  debounceTimeout,
  defaultOptions,
  name,
  mode,
  menuItemSelectedIcon,
  onDeselect,
  onSelect,
  error,
  compactFormName
}) => {
  return (
    <div className={`cInput ${direction === 'horizontal' ? 'text-center flex items-center inputHorizontal' : ''}`}>
      <label
        style={{ display: label == null && 'none' }}
        className={`font-barlow ${direction === 'horizontal' ? 'mr-4 w-[17%] text-right' : ''}`}
      >
        {label}
        {important ? <span className="ml-1 text-red-400 font-barlow">*</span> : <span></span>}
      </label>
      {inputType === 'RadioGroup' ? (
        <Radio.Group
          disabled={disabled}
          className="block font-barlow"
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          vertical
        >
          <Space direction={direction ? direction : 'horizontal'}>
            {options.map((item, index) => (
              <Radio key={index} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      ) : inputType === 'DatePicker' ? (
        <DatePicker
          disabled={disabled}
          showTime={!notShowTime}
          className="block rounded font-barlow"
          style={{ height: '38px' }}
          placeholder="dd/MM/yyyy - hh:mm"
          onChange={onChange}
          size="large"
          getPopupContainer={(trigger) => trigger.parentNode}
          disabledDate={disabledDate}
          format={notShowTime ? 'DD/MM/YYYY' : 'DD/MM/YYYY - HH:mm'}
          defaultValue={defaultValue}
        />
      ) : inputType === 'RangePicker' ? (
        <RangePicker
          size="large"
          style={{ width: '100%', height: '38px' }}
          className="rounded font-barlow"
          onChange={onChange}
          disabled={disabled}
          getPopupContainer={(trigger) => trigger.parentNode}
          placeholder={['Từ ngày', 'Đến ngày']}
        />
      ) : inputType === 'TimePicker' ? (
        <>
          <TimePicker
            disabled={disabled}
            className="block rounded font-barlow"
            placeholder={placeholder}
            onChange={onChange}
            value={moment(value, 'HH:mm')}
            size="large"
            getPopupContainer={(trigger) => trigger.parentNode}
            style={
              direction === 'horizontal'
                ? { textAlign: align, width: full ? '100%' : '30%' }
                : { textAlign: align, width: full && '100%' }
            }
          />
          {subTitle ? <span className="text-lg w-6/12 text-left ml-4 align-middle font-barlow">{subTitle}</span> : null}
        </>
      ) : inputType === 'Select' ? (
        <>
          <Select
            onChange={onChange}
            placeholder={placeholder}
            className="block font-barlow text-lg"
            defaultValue={defaultValue}
            disabled={disabled}
            loading={isLoading}
            value={value}
            allowClear={allowClear}
            onClear={onClear}
            getPopupContainer={(trigger) => trigger.parentNode}
            size="large"
            optionFilterProp="children"
            showSearch={true}
            onSearch={onSearch}
            mode={mode}
            menuItemSelectedIcon={menuItemSelectedIcon}
            onDeselect={onDeselect}
            onSelect={onSelect}
            style={
              direction === 'horizontal'
                ? { textAlign: align, width: full ? '100%' : '30%' }
                : { textAlign: align, width: full && '100%' }
            }
          >
            {options?.map(
              (
                {
                  Name,
                  LongName,
                  Code,
                  Id,
                  id,
                  name,
                  FullName,
                  MaterialName,
                  StatusName,
                  SupplierName,
                  CompanyCode,
                  SAPId,
                  // CompanyName
                },
                idx
              ) => (
                <Option
                  className="font-barlow text-lg"
                  value={additionValueType === 'takeId' ? Id ?? id ?? SAPId ?? CompanyCode : Code}
                  key={idx}
                >
                  {showCompact
                    ? `${Id ?? id ?? SAPId ?? CompanyCode} - ${
                      Name ?? LongName ?? FullName ?? MaterialName ?? name ?? StatusName ?? SupplierName
                    }`
                    : Name ?? LongName ?? FullName ?? MaterialName ?? name ?? StatusName ?? SupplierName}
                </Option>
              )
            )}
          </Select>
          {subTitle ? <span className="text-lg w-6/12 text-left ml-4 align-middle font-barlow">{subTitle}</span> : null}
        </>
      ) : inputType === 'Compact' ? (
        <Input.Group compact>
          <Select
            onChange={onFilter}
            placeholder={selectPlaceholder ?? 'Tất cả'}
            className="font-barlow cInput-compact-select"
            defaultValue={defaultValue ?? 'all'}
            disabled={disabled}
            style={{ width: '20%' }}
            // value="all"
            size="large"
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch={showSearch}
            optionFilterProp="children"
          >
            {options?.map((item, index) => (
              <Option value={item.Id ?? item.Code} key={index}>
                {item.Name}
              </Option>
            ))}
          </Select>
          <Input
            className="cInput-compact-input"
            size="large"
            style={{ width: '80%' }}
            onChange={onChange}
            placeholder={placeholder}
            prefix={<SearchOutlined />}
          />
        </Input.Group>
      ) : inputType === 'CompactSelect' ? (
        <Input.Group compact>
          <Select
            onChange={onFilter}
            placeholder={selectPlaceholder ?? 'Tất cả'}
            className="font-barlow cInput-compact-select"
            defaultValue={defaultValue}
            disabled={disabled}
            style={{ width: '20%' }}
            size="large"
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch={showSearch}
            optionFilterProp="children"
          >
            {sortOptions?.map((item, index) => (
              <Option value={item.Id ?? item.Code} key={index}>
                {item.Name}
              </Option>
            ))}
          </Select>
          <Form.Item name={compactFormName} className="cInput-compact-input" style={{ width: '80%' }}>
            <Select
              className="cInput-compact-input"
              size="large"
              // style={{ width: '80%' }}
              onChange={onChange}
              placeholder={placeholder}
              prefix={<SearchOutlined />}
              optionFilterProp="children"
              disabled={disabledData}
              value={value}
              mode={mode}
              onDeselect={onDeselect}
              onSelect={onSelect}
            >
              {dataOptions?.map(({ Id, MaterialName }, index) => (
                <Option value={Id} key={index}>
                  {MaterialName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Input.Group>
      ) : inputType === 'CheckBox' ? (
        <div className={direction === 'horizontal' ? `${'w-4/5 text-left'}` : ''}>
          <Checkbox onChange={onChange} checked={checked} value={value}></Checkbox>
        </div>
      ) : inputType === 'Multiline' ? (
        <Input.TextArea
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          className="rounded font-barlow text-lg "
          onChange={onChange}
          autoSize={{ minRows: 3, maxRows: rows ? rows : 4 }}
          style={direction === 'horizontal' && { textAlign: align }}
        />
      ) : inputType === 'PlantsSelect' ? (
        <Select
          onChange={onChange}
          placeholder={placeholder}
          className="block font-barlow text-lg"
          defaultValue={defaultValue}
          disabled={disabled}
          loading={isLoading}
          value={value}
          size="large"
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          {options?.map(({ Name, Id }, idx) => (
            <Option className="font-barlow text-lg" value={Id} key={idx}>
              {Name}
            </Option>
          ))}
        </Select>
      ) : inputType === 'Password' ? (
        <Input.Password
          disabled={disabled}
          placeholder={placeholder}
          className="rounded font-barlow text-xl "
          onChange={onChange}
          // style={direction === 'horizontal' && { textAlign: align }}
        />
      ) : inputType === 'Currency' ? (
        <InputNumber
          disabled={disabled}
          placeholder={placeholder}
          className={error ? 'rounded font-barlow text-xl w-full border-red-400' : 'rounded font-barlow text-xl w-full'}
          onChange={onChange}
          formatter={(value) => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
          // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          max={max}
          min={min}
          value={value}
        />
      ) : inputType === 'CDebounceSelect' ? (
        <CDebounceSelect
          mode={modeSelect}
          value={value}
          fetchOptions={fetchOptions}
          onChange={onChange}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          debounceTimeout={debounceTimeout}
          className="block font-barlow text-lg"
          size="large"
          showSearch={true}
          defaultOptions={defaultOptions}
          name={name}
          style={
            direction === 'horizontal'
              ? { textAlign: align, width: full ? '100%' : '30%' }
              : { textAlign: align, width: full && '100%' }
          }
        />
      ) : (
        <>
          <Input
            defaultValue={defaultValue}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            className="rounded font-barlow text-lg"
            onChange={onChange}
            type={type}
            style={
              direction === 'horizontal'
                ? { textAlign: align, width: full ? '100%' : '30%' }
                : { textAlign: align, width: full && '100%' }
            }
            max={max}
            min={min}
          />
          {subTitle ? <span className="text-lg w-6/12 text-left ml-4 align-middle font-barlow">{subTitle}</span> : null}
        </>
      )}
    </div>
  )
}

export default CInput
