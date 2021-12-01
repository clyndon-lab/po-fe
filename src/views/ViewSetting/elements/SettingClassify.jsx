import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CConfirmModal from '@components/common/CConfirmModal'
import CInput from '@components/common/CInput'
import CModal from '@components/common/CModal'
import CTable from '@components/common/CTable'
import ViewWrapper from '@components/common/ViewWrapper'
import {
  // delSAPType,
  getOneSAPMaterialTypes,
  getSAPClassify,
  getSAPMaterialTypes,
  postSaveSAPType
} from '@store/thunks/setting.thunk'
import { Col, Form, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SettingSync = () => {
  const dispatch = useDispatch()
  // const [defaultCategory, setDefaultCategory] = useState('1')
  // const [defaultVaiable, setDefaultVaiable] = useState('1')
  const { sapMaterialTypes, sapMaterialType, isLoading, sapClassify } = useSelector((state) => state['settings'])
  const [sapMatTypes, setSapMatTypes] = useState([])
  const [sapClassifies, setSapClassifies] = useState([])
  const [visible, setVisible] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  // const [showConfirmDel, setShowConfirmDel] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form] = Form.useForm()

  const onOpenTypes = (id) => {
    dispatch(getOneSAPMaterialTypes(id))
    setVisible(true)
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'Index',
      align: 'center',
      key: 'Index',
      width: '40px'
    },
    {
      title: 'Mã loại NVL (Materrial type)',
      dataIndex: 'Code',
      width: '280px',
      key: 'Code',
      render: (text, record) => (
        <p className="text-blue-icon cursor-pointer" onClick={() => onOpenTypes(record.Id)}>
          {text}
        </p>
      )
    },
    {
      title: 'Tên loại NVL (Material Description)',
      dataIndex: 'Description',
      width: '310px',
      key: 'Description'
    },
    {
      title: 'Phân loại hàng hóa',
      dataIndex: 'POGoodsTypesName',
      key: 'POGoodsTypesName'
      // render: () => <CTag type={'draft'} />
    }
  ]

  const onSaveSAP = () => {
    const data = {
      Id: sapMaterialType?.Id,
      Code: sapMaterialType?.Code,
      Description: sapMaterialType?.Description,
      GoodsTypeId: selected,
      Type: sapClassifies.find((item) => item.Code === selected)
    }
    dispatch(postSaveSAPType(data))
    // setShowConfirm(false)
    setVisible(false)
  }

  // const onDelSAP = () => {
  //   dispatch(delSAPType(sapMaterialType.Id))
  //   setShowConfirmDel(false)
  //   setVisible(false)
  // }

  useEffect(() => {
    dispatch(getSAPMaterialTypes({ take: 10, skip: 1 }))
    dispatch(getSAPClassify())
  }, [])

  useEffect(() => {
    setSapMatTypes(
      sapMaterialTypes.map((item, index) => {
        return {
          ...item,
          Index: index + 1
        }
      })
    )
  }, [sapMaterialTypes])

  useEffect(() => {
    setSapClassifies(
      sapClassify.map((item) => {
        return {
          Name: item.Name,
          Code: item.Id
        }
      })
    )
  }, [sapClassify])

  useEffect(() => {
    form.setFieldsValue(sapMaterialType)
    setSelected(sapMaterialType?.GoodsTypeId)
  }, [sapMaterialType])

  const Footer = (
    <div className="flex">
      {/* <div>
        <CButton type="danger" onClick={() => setShowConfirmDel(true)}>
          Xóa
        </CButton>
      </div> */}
      <div className="justify-end flex w-full">
        <CButton type="secondary" onClick={() => setShowConfirm(true)}>
          Thoát
        </CButton>
        <CButton type="primary" onClick={() => onSaveSAP()}>
          Lưu
        </CButton>
      </div>
    </div>
  )

  return (
    <ViewWrapper title="Cấu hình phân loại hàng hóa">
      <Card>
        <CardHeader title="Danh sách phân loại hàng hóa"></CardHeader>
        <div className="pl-9 pr-9 pb-9">
          <CTable
            pagination={false}
            // rowSelection={{
            //   ...rowSelection
            // }}
            columns={columns}
            dataSource={sapMatTypes}
            loading={isLoading}
          />
        </div>
      </Card>
      <CModal
        title={`Điều chỉnh cấu hình: ${sapMaterialType?.Code}`}
        visible={visible}
        handleVisible={() => setVisible(false)}
        w={900}
        footer={Footer}
      >
        <Form form={form}>
          <Row gutter={20} className="text-lg">
            <Col span={7} className="text-right font-medium ml-6 ">
              <p>Mã loại hàng hóa:</p>
            </Col>
            <Col span={15}>
              <p>{sapMaterialType?.Code}</p>
            </Col>
            <Col span={7} className="text-right font-medium ml-6 mt-7">
              <p>Tên loại hàng hóa:</p>
            </Col>
            <Col span={15} className="mt-7">
              <p>{sapMaterialType?.Description}</p>
            </Col>
            <Col span={7} className="text-right font-medium ml-6 mt-7">
              <p>Phân loại hàng hóa:</p>
            </Col>
            <Col span={15} className="mt-7">
              <Form.Item name="GoodsTypeId">
                <CInput inputType="Select" options={sapClassifies} onChange={(e) => setSelected(e)} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </CModal>
      <CConfirmModal
        visible={showConfirm}
        handleVisible={() => setShowConfirm(false)}
        onOk={() => {
          setShowConfirm(false)
          setVisible(false)
        }}
      />
    </ViewWrapper>
  )
}

export default SettingSync
