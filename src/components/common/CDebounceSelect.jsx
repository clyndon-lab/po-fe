import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import { useEffect,useMemo, useRef, useState } from 'react'

const { Option } = Select

const CDebounceSelect = ({ fetchOptions, debounceTimeout, defaultOptions, ...props }) => {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])
  const fetchRef = useRef(0)

  useEffect(() => {
    if (defaultOptions) {
      setOptions(defaultOptions)
    }
  }, [defaultOptions])
  useEffect(() => {
  }, [options])

  const debounceFetcher = useMemo(() => {
    const loadOptions = async (valueSearch) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)
      await fetchOptions(valueSearch).then((data) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }
        setOptions(data.DataSource)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])
  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      showSearch={true}
    >
      {options?.map((item, index) => (
        <Option value={item?.Id ?? item?.Code} key={index}>
          {item?.Name || item?.LongName || item?.sortName}
        </Option>
      ))}
    </Select>
  )
}
export default CDebounceSelect
