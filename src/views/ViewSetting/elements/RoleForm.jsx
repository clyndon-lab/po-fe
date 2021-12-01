import '@assets/css/orders.css'

import ExpandIcon from '@assets/images/expand.png'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CModal from '@components/common/CModal'
import { getComboAccess } from '@store/thunks/setting.thunk'
import { Checkbox, Col, Collapse, Image, Row } from 'antd'
import _ from 'lodash'
import { createRef, useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'

const { Panel } = Collapse

const CheckboxGroup = Checkbox.Group

const plainOptions = ['Thêm', 'Xem', 'Sửa', 'Xóa', 'Xác nhận đơn', 'Hủy đơn hàng', 'Copy']
const reports = ['Xem báo cáo']
const summary = ['Xem tổng quan']

const RoleForm = ({ visible, handleVisible }) => {
  const dispatch = useDispatch()

  const btn = createRef()
  const { comboAccess } = useSelector((state) => state['settings'])

  const [checkedListOrder, setCheckedListOrder] = useState('')
  const [checkedListReturn, setCheckedListReturn] = useState('')
  const [checkedListDelivery, setCheckedListDelivery] = useState('')
  const [checkedListGet, setCheckedListGet] = useState('')
  const [checkedListReport, setCheckedListReport] = useState('')
  const [checkedListSum, setCheckedListSum] = useState('')

  const [indeterminateOrder, setIndeterminateOrder] = useState(false)
  const [indeterminateReturn, setIndeterminateReturn] = useState(false)
  const [indeterminateDelivery, setIndeterminateDelivery] = useState(false)
  const [indeterminateGet, setIndeterminateGet] = useState(false)
  const [indeterminateReport, setIndeterminateReport] = useState(false)
  const [indeterminateSum, setIndeterminateSum] = useState(false)

  const [checkAllReturn, setCheckAllReturn] = useState(false)
  const [checkAllOrder, setCheckAllOrder] = useState(false)
  const [checkAllDelivery, setCheckAllDelivery] = useState(false)
  const [checkAllGet, setCheckAllGet] = useState(false)
  const [checkAllReport, setCheckAllReport] = useState(false)
  const [checkAllSum, setCheckAllSum] = useState(false)

  useEffect(()=>{
    dispatch(getComboAccess())
  },[])


  const onChange = (list, type) => {
    if (type === 'order') {
      setCheckedListOrder(list)
      setIndeterminateOrder(!!list.length && list.length < plainOptions.length)
      setCheckAllOrder(list.length === plainOptions.length)
    } else if (type === 'return') {
      setCheckedListReturn(list)
      setIndeterminateReturn(!!list.length && list.length < plainOptions.length)
      setCheckAllReturn(list.length === plainOptions.length)
    } else if (type === 'delivery') {
      setCheckedListDelivery(list)
      setIndeterminateDelivery(!!list.length && list.length < plainOptions.length)
      setCheckAllDelivery(list.length === plainOptions.length)
    } else if (type === 'get') {
      setCheckedListGet(list)
      setIndeterminateGet(!!list.length && list.length < plainOptions.length)
      setCheckAllGet(list.length === plainOptions.length)
    } else if (type === 'report') {
      setCheckedListReport(list)
      setIndeterminateReport(!!list.length && list.length < reports.length)
      setCheckAllReport(list.length === reports.length)
    } else if (type === 'sum') {
      setCheckedListSum(list)
      setIndeterminateSum(!!list.length && list.length < summary.length)
      setCheckAllSum(list.length === summary.length)
    }
  }

  const onCheckAllChange = (e, type) => {
    if (type === 'order') {
      setCheckedListOrder(e.target.checked ? plainOptions : [])
      setCheckAllOrder(e.target.checked)
      setIndeterminateOrder(false)
    } else if (type === 'delivery') {
      setCheckedListDelivery(e.target.checked ? plainOptions : [])
      setIndeterminateDelivery(false)
      setCheckAllDelivery(e.target.checked)
    } else if (type === 'return') {
      setCheckedListReturn(e.target.checked ? plainOptions : [])
      setIndeterminateReturn(false)
      setCheckAllReturn(e.target.checked)
    } else if (type === 'get') {
      setCheckedListGet(e.target.checked ? plainOptions : [])
      setIndeterminateGet(false)
      setCheckAllGet(e.target.checked)
    } else if (type === 'report') {
      setCheckedListReport(e.target.checked ? reports : [])
      setIndeterminateReport(false)
      setCheckAllReport(e.target.checked)
    } else if (type === 'sum') {
      setCheckedListSum(e.target.checked ? summary : [])
      setIndeterminateSum(false)
      setCheckAllSum(e.target.checked)
    }
  }

  console.log(comboAccess.filter(item=>item.ActionValue !== 15),comboAccess )
  console.log(_.groupBy(comboAccess,item=>item.ParentId))

  const Footer = (
    <div>
      <CButton type="secondary" onClick={() => handleVisible(false)}>
        Hủy
      </CButton>
      <CButton type="primary" onClick={() => btn.current.click()}>
        Thêm
      </CButton>
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
      title="Thêm mới loại tài khoản"
      visible={visible}
      handleVisible={() => handleVisible(!visible)}
    >
      <div className="pl-5">
        <Row gutter="12">
          <Col span="12">
            <CInput label="Mã loại tài khoản" important />
          </Col>
          <Col span="12">
            <CInput label="Tên loại tài khoản" important />
          </Col>
          <Col span="12" className="mt-3">
            <CInput label="Mã loại tài khoản" important />
          </Col>
        </Row>
      </div>

      <hr className="mt-4"/>

      <div>
        <Collapse
          defaultActiveKey={['1', '2', '3', '4','5','6']}
          ghost
          expandIconPosition="right"
          expandIcon={({ isActive }) => <Expand isActive={isActive} />}
        >
          <Panel
            header={
              <Checkbox
                indeterminate={indeterminateOrder}
                onChange={(e) => onCheckAllChange(e, 'order')}
                checked={checkAllOrder}
              >
                Quản lý đơn hàng
              </Checkbox>
            }
            key="1"
          >
            <CheckboxGroup value={checkedListOrder} onChange={(e) => onChange(e, 'order')}>
              <Row className="ml-12">
                {plainOptions.map((item, index) => {
                  return (
                    <Col key={index} span={8}>
                      <Checkbox className="pt-2" key={index} value={item}>
                        {item}
                      </Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </CheckboxGroup>
          </Panel>
          <Panel
            header={
              <Checkbox
                indeterminate={indeterminateReturn}
                onChange={(e) => onCheckAllChange(e, 'return')}
                checked={checkAllReturn}
              >
                Quản lý đơn hàng
              </Checkbox>
            }
            key="2"
          >
            <CheckboxGroup value={checkedListReturn} onChange={(e) => onChange(e, 'return')}>
              <Row className="ml-12">
                {plainOptions.map((item, index) => {
                  return (
                    <Col key={index} span={8}>
                      <Checkbox className="pt-2" key={index} value={item}>
                        {item}
                      </Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </CheckboxGroup>
          </Panel>
          <Panel
            header={
              <Checkbox
                indeterminate={indeterminateDelivery}
                onChange={(e) => onCheckAllChange(e, 'delivery')}
                checked={checkAllDelivery}
              >
                Quản lý giao hàng
              </Checkbox>
            }
            key="3"
          >
            <CheckboxGroup value={checkedListDelivery} onChange={(e) => onChange(e, 'delivery')}>
              <Row className="ml-12">
                {plainOptions.map((item, index) => {
                  return (
                    <Col key={index} span={8}>
                      <Checkbox className="pt-2" key={index} value={item}>
                        {item}
                      </Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </CheckboxGroup>
          </Panel>
          <Panel
            header={
              <Checkbox
                indeterminate={indeterminateGet}
                onChange={(e) => onCheckAllChange(e, 'get')}
                checked={checkAllGet}
              >
                Quản lý nhận hàng
              </Checkbox>
            }
            key="4"
          >
            <CheckboxGroup value={checkedListGet} onChange={(e) => onChange(e, 'get')}>
              <Row className="ml-12">
                {plainOptions.map((item, index) => {
                  return (
                    <Col key={index} span={8}>
                      <Checkbox className="pt-2" key={index} value={item}>
                        {item}
                      </Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </CheckboxGroup>
          </Panel>
          <Panel
            header={
              <Checkbox
                indeterminate={indeterminateReport}
                onChange={(e) => onCheckAllChange(e, 'report')}
                checked={checkAllReport}
              >
                Báo cáo
              </Checkbox>
            }
            key="5"
          >
            <CheckboxGroup value={checkedListReport} onChange={(e) => onChange(e, 'report')}>
              <Row className="ml-12">
                {reports.map((item, index) => {
                  return (
                    <Col key={index} span={12}>
                      <Checkbox className="pt-2 whitespace-nowrap" key={index} value={item}>
                        {item}
                      </Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </CheckboxGroup>
          </Panel>
          <Panel
            header={
              <Checkbox
                indeterminate={indeterminateSum}
                onChange={(e) => onCheckAllChange(e, 'get')}
                checked={checkAllSum}
              >
                Tổng quan
              </Checkbox>
            }
            key="6"
          >
            <CheckboxGroup value={checkedListSum} onChange={(e) => onChange(e, 'sum')}>
              <Row className="ml-12">
                {summary.map((item, index) => {
                  return (
                    <Col key={index} span={12}>
                      <Checkbox className="pt-2 whitespace-nowrap" key={index} value={item}>
                        {item}
                      </Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </CheckboxGroup>
          </Panel>
        </Collapse>
      </div>
      {/* <CConfirmModal
        visible={isShowConfirm}
        onOk={handleCreateAccount}
        handleVisible={() => setIsShowConfirm(!isShowConfirm)}
      ></CConfirmModal> */}
    </CModal>
  )
}

export default RoleForm
