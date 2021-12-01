import '@assets/css/orders.css'

import { SearchOutlined } from '@ant-design/icons'
import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CInput from '@components/common/CInput'
import CPagination from '@components/common/CPagination'
import CTable from '@components/common/CTable'
import CTag from '@components/common/CTag'
import { fetchRoleActiveList, getAccountList, getOne } from '@store/thunks/account-management.thunk'
import { Button, Col, Form, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import AccountDetail from './AccountDetail'

const AccountList = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [query, setQuery] = useState({ skip: page, take: limit })
  const [roleList, setRoleList] = useState([])
  const { accountList, totalAccount, isLoading, rolesActive, account, finished } = useSelector(
    (state) => state['accountManagement']
  )
  const [isShowAccount, setIsShowAccount] = useState(false)
  const [form] = Form.useForm()

  const onShowDetail = async (id) => {
    await dispatch(getOne(id))
    history.push(`/user?id=${id}`)
  }

  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'UserName',
      key: 'UserName',
      width: '180px',
      render: (text, record) => (
        <p className="text-yellow underline cursor-pointer hover:text-blue-500" onClick={() => onShowDetail(record.Id)}>
          {text}
        </p>
      )
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      width: '250px',
      key: 'Email'
    },
    {
      title: 'Họ tên',
      dataIndex: 'FullName',
      width: '360px',
      key: 'FullName'
    },
    {
      title: 'Điện thoại',
      dataIndex: 'PhoneNumber',
      width: '100px',
      key: 'PhoneNumber',
      render: (text) => <p>{text || ''}</p>
    },
    {
      title: () => <p className="whitespace-nowrap">Loại tài khoản</p>,
      dataIndex: 'AppRoleId',
      width: '180px',
      key: 'AppRoleId',
      render: (text) => <p>{roleList?.find((item) => item?.Code === text)?.Name}</p>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'StatusName',
      key: 'StatusName',
      render: (text, record) => <CTag type={record.Status === 0 ? 'error' : 'draft'} title={text} />
    }
  ]

  const statusOptions = [
    {
      Name: 'Tất cả ',
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

  const onChangeLimit = (e) => {
    setLimit(e)
    setPage(1)
    setQuery({ ...query, skip: 0, take: e })
  }

  const onChangePage = (e) => {
    setPage(e)
    setQuery({ ...query, skip: limit * (e - 1), take: limit })
  }

  const onFilter = (e) => {
    setPage(1)
    setQuery({ ...query, ...e, skip: 0 })
  }

  const fetchData = async (query) => {
    await dispatch(getAccountList(query))
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  useEffect(() => {
    if (finished === true) {
      setPage(1)
      form.resetFields()
    }
  }, [finished])

  useEffect(() => {
    if (account !== null && history.location.search !== '') setIsShowAccount(true)
  }, [account])

  useEffect(() => {
    fetchData(query)
  }, [query])

  useEffect(() => {
    setRoleList([
      { Code: -1, Name: 'Tất cả' },
      ...rolesActive?.map((item) => {
        return {
          Name: item?.Name,
          Code: item?.Id
        }
      })
    ])
  }, [rolesActive])

  useEffect(() => {
    if (!isShowAccount) dispatch(fetchRoleActiveList({ take: -1, roleStatus: 1 }))
  }, [isShowAccount])

  useEffect(() => {
    if (history.location.search && history.location.search !== '') {
      dispatch(getOne(history.location.search.replace('?id=', '').trim()))
    }
  }, [history])

  return (
    <>
      <div className="mt-6">
        <Card>
          <CardHeader title="Thông tin tìm kiếm"></CardHeader>
          <Form onFinish={(e) => onFilter(e)} form={form}>
            <Row gutter={20} className="px-9 pb-11">
              <Col span={8}>
                <Form.Item name="username">
                  <CInput label="Tên đăng nhập" inputType="" placeholder="Nhập tên tài khoản đăng nhập" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="fullName">
                  <CInput label="Họ tên" placeholder="Nhập tên" inputType="" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="status">
                  <CInput label="Trạng thái" placeholder="Chọn trạng thái" inputType="Select" options={statusOptions} />
                </Form.Item>
              </Col>
              <Col span={8} className="mt-7">
                <Form.Item name="email">
                  <CInput label="Email" placeholder="Nhập Email" />
                </Form.Item>
              </Col>
              <Col span={8} className="mt-7">
                <Form.Item name="phoneNumber">
                  <CInput label="Số điện thoại" placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={8} className="mt-7">
                <Form.Item name="appRoleId">
                  <CInput
                    label="Nhóm quyền"
                    placeholder="Chọn nhóm quyền"
                    inputType="Select"
                    options={roleList?.length > 0 ? roleList : []}
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
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader title="Danh sách tài khoản"></CardHeader>
          <div className="pb-9 px-9 order-table">
            <CTable
              rowSelection={{
                ...rowSelection
              }}
              loading={isLoading}
              columns={columns}
              dataSource={accountList}
            />
            <CPagination
              className="mt-5"
              current={page}
              limit={limit}
              total={totalAccount}
              handleChangeLimit={(e) => onChangeLimit(e)}
              handleChangePage={(e) => onChangePage(e)}
            ></CPagination>
          </div>
        </Card>
      </div>
      {isShowAccount && (
        <AccountDetail
          visible={isShowAccount}
          handleVisible={() => {
            history.push('/user')
            setIsShowAccount(!isShowAccount)
          }}
        ></AccountDetail>
      )}
    </>
  )
}

export default AccountList
