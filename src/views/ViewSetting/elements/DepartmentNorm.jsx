import '@assets/css/orders.css'

import Card from '@components/common/Card'
import CardHeader from '@components/common/CardHeader'
import CButton from '@components/common/CButton'
import CInput from '@components/common/CInput'
import CTable from '@components/common/CTable'
import ViewWrapper from '@components/common/ViewWrapper'

const DepartmentNorm = () => {
  // const [defaultCategory, setDefaultCategory] = useState('1')
  // const [defaultVaiable, setDefaultVaiable] = useState('1')

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      align: 'center',
      key: 'name',
      width: '50px'
    },
    {
      title: 'Mã bộ phận',
      dataIndex: 'code',
      width: '100px',
      key: 'code'
    },
    {
      title: 'Tên bộ phận',
      dataIndex: 'name',
      width: '600px',
      key: 'name'
    },
    {
      title: 'Số nhân viên',
      dataIndex: 'staffs',
      width: '220px',
      key: 'staffs',
      align:'right',
      render: (text)=><CInput align="right" defaultValue={text}></CInput>
    },
    {
      title: 'Định mức/người',
      dataIndex: 'perone',
      width: '220px',
      align:'right',
      key: 'perone',
      render: (text)=><CInput align="right" defaultValue={text}></CInput>
    },
    {
      title: 'Hạn mức đặt hàng',
      dataIndex: 'limit',
      width: '240px',
      align:'right',
      key: 'limit',
      render: (text)=><CInput align="right" defaultValue={text}></CInput>
    }
  ]

  const data = [
    {
      key: '1',
      code: '01123246454648',
      name: 'Bộ phận BD- Corp',
      staffs: '5',
      perone: '50000',
      limit: '250000'
    },
    {
      key: '2',
      code: '01123246454648',
      name: 'Bộ phận BD- Corp',
      staffs: '5',
      perone: '50000',
      limit: '250000'
    },
    {
      key: '3',
      code: '01123246454648',
      name: 'Bộ phận BD- Corp',
      staffs: '5',
      perone: '50000',
      limit: '250000'
    },
    {
      key: '4',
      code: '01123246454648',
      name: 'Bộ phận BD- Corp',
      staffs: '5',
      perone: '50000',
      limit: '250000'
    },
    {
      key: '5',
      code: '01123246454648',
      name: '	Bộ phận BD- Corp',
      staffs: '5',
      perone: '50000',
      limit: '250000'
    },
    {
      key: '6',
      code: '01123246454648',
      name: 'Bộ phận BD- Corp',
      staffs: '5',
      perone: '50000',
      limit: '250000'
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  // const onChangeCategory = (e) =>{
  //   setDefaultCategory(e.target.value)
  // }

  // const onChangeVariable = (e) =>{
  //   setDefaultVaiable(e.target.value)
  // }

  return (
    <ViewWrapper title="Cấu hình">
      <Card>
        <CardHeader title="Thông tin danh mục đồng bộ"></CardHeader>
        <div className="pl-9 pr-9 pb-9 order-table">
          <CTable
            pagination={false}
            rowSelection={{
              ...rowSelection
            }}
            columns={columns}
            dataSource={data}
          />
          <div className="text-right mt-6">
            <CButton h={32} type="primary">
              Lưu
            </CButton>
          </div>
        </div>
      </Card>
    </ViewWrapper>
  )
}

export default DepartmentNorm
