import EmptyTableImg from '@assets/images/empty-table.png'
import ExpandIcon from '@assets/images/expand.png'
import Card from '@components/common/Card'
import CButton from '@components/common/CButton'
import CConfirmModal from '@components/common/CConfirmModal'
import CInput from '@components/common/CInput'
import ViewWrapper from '@components/common/ViewWrapper'
import { getSampleStuffSupplier, getSampleStuffType, postStuffUpdate } from '@store/thunks/setting.thunk'
import { Col, Collapse, Image, Row } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as XLSX from 'xlsx'

// const { Dragger } = Upload

const { Panel } = Collapse

const SettingSync = () => {
  const [defaultCategory, setDefaultCategory] = useState([
    {
      index: 1,
      id: 'usingStatus',
      title: 'Trạng thái sử dụng',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 2,
      id: 'showPrices',
      title: 'Hiển thị giá',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 3,
      id: 'showDiscount',
      title: 'Hiển thị khuyến mại',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 4,
      id: 'ableToOrder',
      title: 'Cho phép đặt hàng bù',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 5,
      id: 'attachable',
      title: 'Cho phép đính kèm tệp',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 6,
      id: 'showAllGoods',
      title: 'Hiển thị hết mặt hàng',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 7,
      id: 'showQty',
      title: 'Hiển thị SL giao = SL đặt',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 8,
      id: 'chooseDeliveryDate',
      title: 'Cho phép nhà cung cấp chọn ngày giao hàng',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 9,
      id: 'createSelfTicket',
      title: 'Cho phép tự tạo phiếu giao',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 10,
      id: 'availableEdit',
      title: 'Cho phép nhà hàng sửa ngày thực nhận',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 11,
      id: 'removerNewOrderAfter',
      title: 'Xóa đơn hàng tạo mới sau (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 12,
      id: 'removerRejectOrderAfter',
      title: 'Xóa đơn hàng bị từ chối sau (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 13,
      id: 'timeAvailableOrder',
      title: 'Thời gian nhà hàng được phép đặt hàng (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 14,
      id: 'timePrepare',
      title: 'Thời gian nhà hàng tạo trước đơn hàng (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 15,
      id: 'timeReturn',
      title: 'Thời gian nhà hàng được phép trả hàng (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 16,
      id: 'timeReturnOverMonth',
      title: 'Thời gian nhà hàng được phép trả hàng qua tháng (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 17,
      id: 'selectStillNotGet',
      title: 'Thời gian nhà hàng được phép tích chọn Chưa nhận hàng (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 18,
      id: 'timeRangeOrder',
      title: 'Thời gian bắt đầu và kết thúc đặt hàng (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 19,
      id: 'remainOrder',
      title: 'Thời gian nhà hàng xử lý đơn hàng tồn đọng',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 20,
      id: 'operatorForInvalid',
      title: 'Thời gian nhà hàng xử lý đơn hàng chưa hợp lệ (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 21,
      id: 'orderTime',
      title: 'Thời gian nhà hàng được đặt hàng bù (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 22,
      id: 'orderOverMonth',
      title: 'Thời gian nhà hàng được đặt bù đơn hàng qua tháng (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 23,
      id: 'deliveryByGet',
      title: 'Tỷ lệ giao/ nhận cho phép',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 24,
      id: 'supplierConfirmTime',
      title: 'Thời gian nhà cung cấp phải xác nhận đơn hàng (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 25,
      id: 'supplierCreateTime',
      title: 'Thời gian nhà cung cấp phải tạo phiếu giao hàng (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    },
    {
      index: 26,
      id: 'supplierDeliveryTime',
      title: 'Thời gian nhà cung cấp phải giao hàng (đơn vị nhập: giờ)',
      file: null,
      type: 1,
      show: true
    }
  ])

  // const { stuffTypes } = useSelector((state) => state['settings'])
  const [isShowConfirm, setIsShowConfirm] = useState(false)

  const [resultSearch, setResultSearch] = useState(defaultCategory)
  const [listStuffType] = useState([
    {
      Code: 1,
      Name: 'Theo nhóm hàng'
    },
    {
      Code: 2,
      Name: 'Theo nhà cung cấp'
    }
  ])

  const [selectedId, setSelectedId] = useState('')

  const dispatch = useDispatch()

  const onUpload = (e, item) => {
    e.preventDefault()

    var files = e.target.files[0],
      f = files
    var reader = new FileReader()
    reader.onload = function (e) {
      var data = e.target.result
      let readedData = XLSX.read(data, { type: 'binary', cellDates: true, cellNF: false, cellText: false })
      const wsname = readedData.SheetNames[0]
      const ws = readedData.Sheets[wsname]

      var range = XLSX.utils.decode_range(ws['!ref'])
      range.s.r = 2 // <-- zero-indexed, so setting to 1 will skip row 0
      ws['!ref'] = XLSX.utils.encode_range(range)
      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { dateNF: 'YYYY-MM-DD', skipRows: 2 })

      console.log(dataParse)
      if (item.index <= 10) {
        if (item.type === 1) {
          const newArr = defaultCategory.map((o) => {
            if (o.index === item.index) {
              return {
                ...o,
                file: dataParse.map((o) => {
                  return {
                    Code: o['Mã nhóm hàng *'],
                    Name: o['Tên nhóm hàng'],
                    Status: o['Trạng thái *']
                  }
                })
              }
            } else {
              return { ...o }
            }
          })
          setDefaultCategory(newArr)
          setResultSearch(newArr)
        } else if (item.type === 2) {
          const newArr = defaultCategory.map((o) => {
            if (o.index === item.index) {
              return {
                ...o,
                file: dataParse.map((o) => {
                  return {
                    Code: o['Nhà cung cấp *'],
                    Name: o['Tên nhà cung cấp'],
                    Time: o['Trạng thái *']
                  }
                })
              }
            } else {
              return { ...o }
            }
          })
          setDefaultCategory(newArr)
          setResultSearch(newArr)
        }
      } else if (item.index > 10 && item.index !== 18) {
        if (item.type === 1) {
          const newArr = defaultCategory.map((o) => {
            if (o.index === item.index) {
              return {
                ...o,
                file: dataParse.map((o) => {
                  return {
                    Code: o['Mã nhóm hàng *'],
                    Name: o['Tên nhóm hàng'],
                    Status: o['Thời gian *']
                  }
                })
              }
            } else {
              return { ...o }
            }
          })
          setDefaultCategory(newArr)
          setResultSearch(newArr)
        } else if (item.type === 2) {
          const newArr = defaultCategory.map((o) => {
            if (o.index === item.index) {
              return {
                ...o,
                file: dataParse.map((o) => {
                  return {
                    Code: o['Nhà cung cấp *'],
                    Name: o['Tên nhà cung cấp'],
                    Time: o['Thời gian *']
                  }
                })
              }
            } else {
              return { ...o }
            }
          })
          setDefaultCategory(newArr)
          setResultSearch(newArr)
        }
      } else if (item.index === 18) {
        if (item.type === 1) {
          const newArr = defaultCategory.map((o) => {
            if (o.index === item.index) {
              return {
                ...o,
                file: dataParse.map((o) => {
                  return {
                    Code: o['Mã nhóm hàng *'],
                    Name: o['Tên nhóm hàng'],
                    StartTime: o['Giờ bắt đầu nhập hàng *'],
                    EndTime: o['Giờ kết thúc nhập hàng *']
                  }
                })
              }
            } else {
              return { ...o }
            }
          })
          setDefaultCategory(newArr)
          setResultSearch(newArr)
        } else if (item.type === 2) {
          const newArr = defaultCategory.map((o) => {
            if (o.index === item.index) {
              return {
                ...o,
                file: dataParse.map((o) => {
                  return {
                    Code: o['Nhà cung cấp *'],
                    Name: o['Tên nhà cung cấp'],
                    StartTime: o['Giờ bắt đầu nhập hàng *'],
                    EndTime: o['Giờ kết thúc nhập hàng *']
                  }
                })
              }
            } else {
              return { ...o }
            }
          })
          setDefaultCategory(newArr)
          setResultSearch(newArr)
        }
      }
    }
    reader.readAsBinaryString(f)
  }

  const getSample = async (id, type) => {
    if (type === 'supplier') {
      await dispatch(getSampleStuffSupplier(id))
    } else {
      await dispatch(getSampleStuffType(id))
    }
  }

  const Expand = ({ isActive }) => (
    <Image
      preview={false}
      src={ExpandIcon}
      className="pt-2"
      style={{ transform: !isActive && 'rotate(270deg)' }}
    ></Image>
  )

  const handleSearchItem = (e) => {
    if (e == '') setResultSearch(defaultCategory)
    else
      setResultSearch(
        defaultCategory.map((item) =>
          item.title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .includes(
              e
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
            )
            ? { ...item, show: true }
            : { ...item, show: false }
        )
      )
  }

  const handleUpdate = () => {
    const id = selectedId

    const payload = defaultCategory.find((item) => item.index === selectedId)

    console.log(payload, id)

    dispatch(postStuffUpdate(payload, id))

    setIsShowConfirm(false)
  }

  const handleChooseType = (val, index) => {
    const newArr = defaultCategory.map((item) => {
      if (item.index === index) {
        return {
          ...item,
          type: val.value
        }
      } else return item
    })
    setDefaultCategory(newArr)
    setResultSearch(newArr)
  }

  const onSaveConfig = (id) => {
    setSelectedId(id)
    setIsShowConfirm(true)
  }

  return (
    <ViewWrapper title="Cấu hình nhóm hàng và nhà cung cấp">
      <Card px={10} py={25}>
        <div className="w-1/2 ml-5">
          <CInput placeholder="Tìm kiếm cấu hình" onChange={(e) => handleSearchItem(e.target.value)}></CInput>
        </div>
        <Collapse
          defaultActiveKey={defaultCategory.map((_, index) => {
            return index
          })}
          ghost
          expandIconPosition="right"
          expandIcon={({ isActive }) => <Expand isActive={isActive} />}
          className="mt-3 ml-2"
        >
          {resultSearch.map((item, index) => {
            return (
              <Panel
                className={!item.show && 'hidden'}
                header={
                  <p className="font-bold text-lg mr-4">
                    {item.index}. {item.title}
                  </p>
                }
                key={index}
              >
                <Row gutter="20" className="mt-5">
                  <Col span="4">
                    <p className="text-right text-lg font-semibold self-center">Phạm vi áp dụng: </p>
                  </Col>
                  <Col span="8">
                    <CInput
                      // defaultValue={1}
                      inputType="Select"
                      placeholder="Chọn phạm vi áp dụng"
                      options={listStuffType}
                      onChange={(_, value) => {
                        handleChooseType(value, item.index)
                      }}
                      defaultValue={1}
                    />
                  </Col>
                </Row>
                <Row gutter="20" className="mt-3 text-lg">
                  <Col span="4">
                    <p className="text-right text-lg text-red">Chú ý: </p>
                  </Col>
                  <Col span="20">
                    <p>
                      Tải xuống mẫu file nhập:{' '}
                      <a className="text-blue-icon" onClick={() => getSample(item.index, 'type')}>
                        tại đây
                      </a>
                    </p>
                  </Col>
                </Row>
                <Row gutter="20" className="mt-2 text-lg">
                  <Col span="4"></Col>
                  <Col span="20">
                    <p>
                      Với mỗi phạm vi áp dụng sẽ có mẫu file nhập tương ứng. Vui lòng tải lại mẫu file và điền đầy đủ
                      thông tin trước khi nhập
                    </p>
                  </Col>
                  <Col span="4"></Col>
                  <Col span="20">
                    <p className="mt-3">
                      Tải xuống cấu hình:
                      <a className="text-blue-icon" onClick={() => getSample(item.index, 'supplier')}>
                        tại đây
                      </a>
                    </p>
                  </Col>
                  <Col span="4"></Col>
                  <Col span="8" className="mt-3">
                    <CInput
                      type="file"
                      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      onChange={(e) => {
                        onUpload(e, item)
                      }}
                      placeholder=""
                    >
                      <p className="ant-upload-hint">Kéo thả file vào đây hoặc tải lên từ thiết bị</p>
                    </CInput>
                  </Col>
                </Row>
                <div className="text-right">
                  {item.file === null ? (
                    <CButton type="primary">Nhập file</CButton>
                  ) : (
                    <CButton onClick={() => onSaveConfig(item.index)} type="primary">
                      Lưu
                    </CButton>
                  )}
                </div>
              </Panel>
            )
          })}

          {resultSearch.every((item) => item.show === false) && (
            <div style={{ textAlign: 'center' }}>
              <div>
                <Image preview={false} src={EmptyTableImg} alt="empty" className="mt-10 w-[190px]"></Image>
                <p className="text-center text-dark-neutral text-sm font-semibold pb-2">Không tìm thấy cấu hình</p>
              </div>
            </div>
          )}
        </Collapse>
      </Card>
      <CConfirmModal
        description="Xác nhận thay đổi"
        visible={isShowConfirm}
        handleVisible={() => setIsShowConfirm(false)}
        onOk={handleUpdate}
      ></CConfirmModal>
    </ViewWrapper>
  )
}

export default SettingSync
