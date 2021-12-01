import '@assets/css/orders.css'

import ExpandIcon from '@assets/images/expand.png'
import CButton from '@components/common/CButton'
import CConfirmModal from '@components/common/CConfirmModal'
import CInput from '@components/common/CInput'
import CModal from '@components/common/CModal'
import { fetchRoleList } from '@store/thunks/account-management.thunk'
import { fetchLoginInfo } from '@store/thunks/combo.thunk'
import { delOneAccountType, getComboAccess, postAccountType, putOneAccountType } from '@store/thunks/setting.thunk'
import { Button, Checkbox, Col, Collapse, Form, Image, Row } from 'antd'
import { sortBy } from 'lodash'
import { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { Panel } = Collapse

const RoleForm = ({ visible, handleVisible, isEdit }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const btn = createRef()
  const { roles } = useSelector((state) => state['accountManagement'])
  const { comboAccess, isLoading, oneAccountType, isSuccess } = useSelector((state) => state['settings'])
  const { loginInfo } = useSelector((state) => state['combo'])

  const [listCombo, setListCombo] = useState([])
  const [listHead, setListHead] = useState([])
  const [statusAccount, setStatusAccount] = useState(1)
  const [typeAccount, setTypeAccount] = useState(1)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [originalCheckedList, setOriginalCheckedList] = useState([])

  const [listAddNew, setListAddNew] = useState([])
  const [listDelete, setListDelete] = useState([])

  const statusOptions = [
    { Code: 1, Name: 'Đang hoạt động' },
    { Code: 0, Name: 'Ngưng hoạt động' }
  ]

  const typeOptions = [
    { Code: 2, Name: 'Nhà cung cấp' },
    { Code: 1, Name: 'Nhà hàng' },
    { Code: 0, Name: 'Khác' }
  ]

  const onCheckAll = (id, value) => {
    setListCombo(
      listCombo.map((item) => {
        if (item.ParentId === id) {
          return {
            ...item,
            checked: value
          }
        }
        if (item.Id === id) {
          return {
            ...item,
            checked: value
          }
        }
        return item
      })
    )
  }
  const handleCheck = async (id, value, ob) => {
    const parent = listCombo.find((c) => c.Id === ob.ParentId)
    if (value) {
      setListCombo(
        listCombo.map((item) => {
          if (item.Id === id || item.Id === parent.Id) {
            item.checked = value
          }
          return item
        })
      )
    } else {
      const childChecked = listCombo.filter((c) => c.ParentId === parent.Id && c.checked)
      setListCombo(
        listCombo.map((item) => {
          if (item.Id === id || (item.Id === parent.Id && childChecked.length === 1)) {
            item.checked = value
          }
          return item
        })
      )
    }
  }

  const onPostAccountType = async (data) => {
    const listChecked = listCombo
      .filter((item) => item.checked)
      .map((i) => {
        return { FunctionId: i.Id }
      })

    if (!isEdit) {
      const index = roles.length + 1
      let codeGen = index + ''
      while (codeGen.length < 5) {
        codeGen = '0' + codeGen
      }
      const payload = {
        Code: data?.Code ? data?.Code : `AA${codeGen}`,
        Name: data.Name,
        Status: statusAccount,
        RoleType: typeAccount,
        ListAddNew: listChecked,
        CreateBy: loginInfo?.Users?.UserName
      }
      await dispatch(postAccountType(payload))
    } else {
      const payload = {
        ...oneAccountType,
        ...data,
        ListAddNew: [...new Set(listAddNew)],
        DetailsIdDelete: [...new Set(listDelete)],
        UpdateBy: loginInfo?.Users?.UserName
      }
      delete payload.Functions
      delete payload.ConcurrencyStamp
      delete payload.CreateBy
      delete payload.CreateDate
      delete payload.UpdateDate
      delete payload.NormalizedName

      await dispatch(putOneAccountType(payload))
    }
  }

  const onDeleteType = async () => {
    await dispatch(delOneAccountType(oneAccountType.Id))
    setConfirmDelete(false)
    handleVisible(false)
  }

  useEffect(() => {
    dispatch(getComboAccess())
    form.resetFields()
  }, [])

  useEffect(() => {
    const addNew = []
    const deleteOld = []
    for (const access of listCombo) {
      if (access.checked && !originalCheckedList.includes(access.Id)) {
        addNew.push({ FunctionId: access.Id, Id: 0 })
      }
      if (!access.checked && originalCheckedList.includes(access.Id)) {
        deleteOld.push({ Id: access.FunctionAppRoleId })
      }
    }
    setListAddNew(addNew)
    setListDelete(deleteOld)
  }, [listCombo])

  useEffect(() => {
    dispatch(fetchLoginInfo())
    dispatch(fetchRoleList())
    setListAddNew([])
    setListDelete([])
    if (!isEdit) {
      form.resetFields()
      setListCombo(
        comboAccess.map((item) => {
          return {
            ...item,
            checked: false
          }
        })
      )
      setListHead(
        sortBy(comboAccess, 'Id')?.reduce((res, item) => {
          if (item.ActionValue === 15) {
            if (item.ParentId === 0) {
              res = [item, ...res]
            } else {
              res = [...res, item]
            }
          }
          return res
        }, [])
      )
    }
    if (isEdit && oneAccountType) {
      console.log(oneAccountType)
      form.setFieldsValue(oneAccountType)
      setListHead(
        sortBy(oneAccountType?.Functions, 'Id')?.reduce((res, item) => {
          if (item.ActionValue === 15) {
            if (item.ParentId === 0) {
              res = [item, ...res]
            } else {
              res = [...res, item]
            }
          }
          return res
        }, [])
      )
      setOriginalCheckedList(
        oneAccountType?.Functions.reduce((res, i) => {
          if (i.FunctionAppRoleId > 0) {
            res.push(i.Id)
          }
          return res
        }, [])
      )
      console.log(
        oneAccountType?.Functions.map((item) => {
          return { ...item, checked: item?.FunctionAppRoleId > 0 }
        })
      )
      if (oneAccountType?.Functions.length > 0) {
        setListCombo(
          oneAccountType?.Functions?.map((item) => {
            return { ...item, checked: item?.FunctionAppRoleId > 0 }
          })
        )
      }
    }
  }, [comboAccess, visible, isEdit, oneAccountType])

  useEffect(() => {
    if (isSuccess === true) {
      form.resetFields()
      handleVisible(false)
    }
  }, [isSuccess])

  const Footer = (
    <div className="flex">
      {isEdit && (
        <div>
          <CButton type="danger" onClick={() => setConfirmDelete(true)}>
            Xóa
          </CButton>
        </div>
      )}
      <div className="justify-end flex w-full">
        <CButton type="secondary" onClick={() => handleVisible(false)}>
          Thoát
        </CButton>
        <CButton loading={isLoading} type="primary" onClick={() => btn.current.click()}>
          Lưu
        </CButton>
      </div>
    </div>
  )

  const Expand = ({ isActive }) => (
    <Image
      preview={false}
      src={ExpandIcon}
      className="pt-1"
      style={{ transform: !isActive && 'rotate(270deg)' }}
    ></Image>
  )

  return (
    <CModal
      w={850}
      footer={Footer}
      title={isEdit ? `Chi tiết nhóm quyền: ${oneAccountType?.Name}` : 'Thêm mới nhóm quyền'}
      visible={visible}
      handleVisible={() => handleVisible(!visible)}
    >
      <div className="pl-5">
        <Form onFinish={onPostAccountType} form={form}>
          <Row gutter="20">
            <Col span="12">
              <Form.Item
                name="Code"
                className="text-dark font-medium"
                rules={[{ pattern: /^[A-Za-z0-9]+$/, message: 'Vui lòng chỉ nhập kí tự chữ không dấu và số' }]}
              >
                <CInput label="Mã nhóm quyền" disabled={isEdit} />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                name="Name"
                className="text-dark font-medium"
                rules={[{ required: true, message: 'Vui lòng nhập tên nhóm quyền' }]}
              >
                <CInput label="Tên nhóm quyền" important />
              </Form.Item>
            </Col>
            <Col span="12" className="mt-3">
              <Form.Item name="Status" className="text-dark font-medium">
                <CInput
                  important
                  inputType="Select"
                  options={statusOptions}
                  label="Trạng thái"
                  defaultValue={1}
                  onChange={(e) => setStatusAccount(e)}
                  className="font-normal"
                />
              </Form.Item>
            </Col>
            <Col span="12" className="mt-3">
              <Form.Item name="RoleType" className="text-dark font-medium">
                <CInput
                  important
                  inputType="Select"
                  options={typeOptions}
                  label="Phân loại nhóm quyền"
                  defaultValue={0}
                  className="font-normal"
                  onChange={(e) => setTypeAccount(e)}
                />
              </Form.Item>
            </Col>
            <Form.Item className="hidden">
              <Button htmlType="submit" ref={btn}>
                add
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>

      <hr className="mt-4" />

      <div>
        <Collapse
          defaultActiveKey={listHead?.map((_, index) => index.toString())}
          ghost
          expandIconPosition="right"
          expandIcon={({ isActive }) => <Expand isActive={isActive} />}
        >
          {listHead?.map((item, index) => {
            return (
              <Panel
                className="mb-3"
                header={
                  <Checkbox
                    className="text-lg pr-2 font-medium text-gray-2"
                    key={index}
                    onChange={(e) => onCheckAll(item.Id, e.target.checked)}
                    checked={listCombo?.find((b) => b.Id === item.Id).checked}
                  >
                    {listCombo?.find((i) => i.Id === item.Id).FuctionName}
                  </Checkbox>
                }
                key={index}
              >
                <Row className="ml-6">
                  {listCombo
                    ?.filter((o) => o.ParentId === item.Id)
                    .map((i, idx) => (
                      <Col key={idx} span={8} className="pt-2">
                        <Checkbox
                          // defaultChecked={i.checked}
                          checked={listCombo?.find((b) => b.Id === i.Id).checked}
                          onChange={(e) => handleCheck(i.Id, e.target.checked, i)}
                          className="text-lg text-gray-2"
                          key={index}
                        >
                          {i.FuctionName}
                        </Checkbox>
                      </Col>
                    ))}
                </Row>
              </Panel>
            )
          })}
        </Collapse>
      </div>
      <CConfirmModal
        visible={confirmDelete}
        onOk={onDeleteType}
        handleVisible={() => setConfirmDelete(false)}
      ></CConfirmModal>
    </CModal>
  )
}

export default RoleForm
