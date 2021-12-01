// import { Form, Input } from 'antd'
// import ViewWrapper from '@components/common/ViewWrapper'
// import InputGroup from '@components/Layout/InputGroup'
// import CInput from '@components/common/CInput'
// import CButton from '@components/common/CButton'

// const ViewAMSFlow = () => {
//   return (
//     <ViewWrapperapper
//       title="Tạo đơn đặt hàng"
//       subTitle="Tạo yêu cầu đặt hàng cho nhà cung cấp hoặc các bộ phận cung ứng nội bộ"
//     >
//       <Form
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         initialValues={{
//           SupplierUnit: 'ncc'
//         }}
//         form={form}
//         onValuesChange={handleValueChangeForm}
//       >
//         <InputGroup title="Thông tin chung">
//           <Form.Item name="POGoodsTypeId">
//             <CInput
//               label="Phân loại hàng hóa"
//               important
//               inputType="PlantsSelect"
//               placeholder="Chọn loại hàng hóa"
//               options={poGoodTypes}
//               isLoading={isLoading}
//             />
//           </Form.Item>
//           <Form.Item name="POVendorId">
//             <CInput inputType="RadioGroup" label="Chọn đơn vị cung cấp" options={radioData} />
//           </Form.Item>
//         </InputGroup>

//         <InputGroup title="Thông tin yêu cầu">
//           <Form.Item name="OrderSystemId2">
//             <CInput label="Hệ thống xử lý" defaultValue="AMS" disabled />
//           </Form.Item>
//           <Form.Item
//             name="FlowRequest"
//             rules={[
//               {
//                 required: true,
//                 message: 'Trường này là bắt buộc!'
//               }
//             ]}
//           >
//             <CInput
//               label="Luồng yêu cầu"
//               inputType="Select"
//               placeholder="Chọn luồng yêu cầu"
//               options={flowRequests}
//               isLoading={isLoading}
//               additionValueType="takeId"
//             />
//           </Form.Item>
//           <Form.Item
//             name="TypeRequest"
//             rules={[
//               {
//                 required: true,
//                 message: 'Trường này là bắt buộc!'
//               }
//             ]}
//           >
//             <CInput
//               label="Loại yêu cầu"
//               important
//               inputType="Select"
//               placeholder="Chọn loại yêu cầu"
//               options={categories}
//               isLoading={isLoading}
//               additionValueType="takeId"
//               // onChange={onChangeSelect}
//             />
//           </Form.Item>

//           <Form.Item
//             name="WarehouseReceived"
//             rules={[
//               {
//                 required: true,
//                 message: 'Trường này là bắt buộc!'
//               }
//             ]}
//           >
//             <CInput
//               label="Kho tiếp nhận"
//               important
//               inputType="Select"
//               placeholder="Chọn kho tiếp nhận"
//               options={stocksAMS}
//             />
//           </Form.Item>
//           <Form.Item
//             name="OrderTimeTo"
//             rules={[
//               {
//                 required: true,
//                 message: 'Trường này là bắt buộc!'
//               }
//             ]}
//           >
//             <CInput label="Ngày yêu cầu giao hàng" important inputType="DatePicker" />
//           </Form.Item>
//           <Form.Item
//             name="OrderTime"
//             rules={[
//               {
//                 required: true,
//                 message: 'Trường này là bắt buộc!'
//               }
//             ]}
//           >
//             <CInput label="Ngày đặt hàng" important inputType="DatePicker" />
//           </Form.Item>
//         </InputGroup>
//         <InputGroup
//           typeGroup="Table"
//           tableSlot={AMStable}
//           onClick={addAMSProduct}
//           title="Thông tin hàng hóa"
//         >
//           <CInput
//             inputType="Select"
//             placeholder="Tên hàng hóa"
//             options={productsAMS}
//             onChange={onChangeAMSProductsSelect}
//             additionValueType="takeId"
//             isLoading={isFetching}
//           />
//         </InputGroup>

//         <div className="float-right flex">
//           <CButton type="danger" onClick={handleClickReset}>
//             Nhập lại
//           </CButton>
//           <div className="mx-6">
//             <CButton type="secondary" onClick={handleTempSave}>
//               Lưu tạm
//             </CButton>
//           </div>
//           <CButton
//             type="primary"
//             loading={isLoading}
//             htmlType='submit'
//           >
//             Hoàn thành
//           </CButton>
//         </div>
//       </Form>
//     </ViewWrapperapper>
//   )
// }

// export default ViewAMSFlow
