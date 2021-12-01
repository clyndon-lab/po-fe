import '@assets/css/orders.css'

import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CPagination from '@components/common/CPagination'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import ViewWrapper from '@components/common/ViewWrapper'
import { getAccountType, getOneAccountType } from '@store/thunks/setting.thunk'
import { formatBaseDate, saveFile } from '@utils/core.utils'
import { Button, Col, Form, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import _ from "lodash"
import RoleForm from './RoleFormTest'

const SettingAccount = () => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isEdit, setIsEdit] = useState(false)
  const [query, setQuery] = useState({ skip: page, take: limit })
  const [form] = Form.useForm()

  const { accountType, totalAccountType, isLoading } = useSelector((state) => state['settings'])

  const statusOptions = [
    {
      Name: 'Tất cả',
      Code: -1
    },
    {
      Name: 'Đang hoạt động',
      Code: 1
    },
    {
      Name: 'Ngưng hoạt động',
      Code: 0
    }
  ]

  const typeOptions = [
    { Code: '0,1,2', Name: 'Tất cả' },
    { Code: 2, Name: 'Nhà cung cấp' },
    { Code: 1, Name: 'Nhà hàng' },
    { Code: 0, Name: 'Khác' }
  ]

  const onGetOne = async (id) => {
    await dispatch(getOneAccountType(id))
    setIsEdit(true)
    setVisible(true)
  }

  const columns = [
    {
      title: <p className="whitespace-nowrap">Mã nhóm quyền</p>,
      dataIndex: 'Code',
      key: 'Id',
      width: '10%',
      render: (text, record) => (
        <a className="text-blue-icon" onClick={() => onGetOne(record.Id)}>
          {text}
        </a>
      )
    },
    {
      title: 'Tên nhóm quyền',
      dataIndex: 'Name',
      key: 'Name',
      width: '55%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      width: '35%',
      render: (text) => (
        <CTag title={text === 1 ? 'Đang hoạt động' : 'Ngưng hoạt động'} type={text === 1 ? 'draft' : 'error'}></CTag>
      )
    }
  ]

  const onFilter = (e) => {
    setPage(1)
    setQuery({ ...query, ...e, skip: 0 })
  }

  const fetchData = async (query) => {
    await dispatch(getAccountType(query))
  }

  const onChangeLimit = (e) => {
    setLimit(e)
    setPage(1)
    setQuery({ ...query, skip: 0, take: e })
  }

  const onChangePage = (e) => {
    setPage(e)
    setQuery({ ...query, skip: limit * (e - 1), take: limit })
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    }
  }

  const onSaveList = () => {
    const objectToMap = accountType.map((item) => {
      return {
        ['STT']: item.RowNum,
        ['Mã nhóm quyền']: item.Code,
        ['Tên nhóm quyền']: item.Name,
        ['Trạng thái']: item.Status === 0 ? 'Ngưng hoạt động' : 'Đang hoạt động',
        ['Phân loại nhóm quyền']: typeOptions.find((i) => i.Code === item.RoleType).Name,
        ['Chi tiết']: item.Description || '',
        ['Ngày tạo']: formatBaseDate(item.CreateDate) || '',
        ['Người tạo']: item.CreateBy || '',
        ['Ngày chỉnh sửa']: formatBaseDate(item.UpdateDate) || '',
        ['Người chỉnh sửa']: item.UpdateBy || ''
      }
    })
    const fileName = 'AccountType.xlsx'
    saveFile(objectToMap, fileName)
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData(query)
    }, 100)
  }, [query, visible])

  const ToolBar = (
    <div className="flex">
      <CButton h={32} icon={<DownloadOutlined />} onClick={() => onSaveList()}>
        Xuất Excel
      </CButton>
      <div className="ml-6">
        <CButton
          h={32}
          onClick={() => {
            setIsEdit(false)
            setVisible(true)
          }}
        >
          Thêm mới
        </CButton>
      </div>
    </div>
  )

  return (
    <ViewWrapper title="Danh sách nhóm quyền" toolBar={ToolBar}>
      <Card>
        <CardHeader title="Thông tin tìm kiếm"></CardHeader>
        <Form onFinish={(e) => onFilter(e)} form={form}>
          <Row gutter={10} className="px-9 pb-11">
            <Col span={8}>
              <Form.Item name="code">
                <CInput label="Mã nhóm quyền" inputType="" placeholder="Nhập mã nhóm quyền" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name">
                <CInput label="Tên nhóm quyền" placeholder="Nhập tên nhóm quyền" inputType="" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="roleStatus">
                <CInput label="Trạng thái" placeholder="Chọn trạng thái" inputType="Select" options={statusOptions} />
              </Form.Item>
            </Col>
            <Col span={8} className="py-5">
              <Form.Item name="roleType">
                <CInput
                  label="Phân loại nhóm quyền"
                  placeholder="Chọn phân loại nhóm quyền"
                  inputType="Select"
                  options={typeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={24} className="mt-7 text-right self-center">
              {/* <CButton type="primary">
                  <SearchOutlined />
                  Tìm kiếm
                </CButton> */}
              <Button className="po-btn primary-btn h-[52px]" htmlType="submit">
                <SearchOutlined /> Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <div className="mt-6">
        <Card>
          <CardHeader title="Danh sách nhóm quyền"></CardHeader>
          <div className="pl-9 pr-9 pb-9 order-table">
            <CTable
              rowSelection={{
                ...rowSelection
              }}
              pagination={false}
              columns={columns}
              dataSource={accountType}
              loading={isLoading}
            />
            <CPagination
              current={page}
              limit={limit}
              total={totalAccountType}
              handleChangeLimit={(e) => onChangeLimit(e)}
              handleChangePage={(e) => onChangePage(e)}
            ></CPagination>
          </div>
        </Card>
      </div>
      <RoleForm visible={visible} handleVisible={() => setVisible(false)} isEdit={isEdit}></RoleForm>
    </ViewWrapper>
  )
}

export default SettingAccount
