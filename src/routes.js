import loadable from '@loadable/component'

const routes = [
  {
    path: '/',
    key: 'home',
    exact: true,
    component: loadable(() => import('@views/ViewHome'))
  },
  {
    path: '/report',
    key: 'report',
    exact: true,
    component: loadable(() => import('@views/ViewReport'))
  },
  {
    path: '/supplier-review',
    key: 'supplierreview',
    exact: true,
    component: loadable(() => import('@views/ViewComplaint'))
  },
  {
    path: '/supplier-review/create-complaint',
    key: 'createsupplierreview',
    exact: true,
    component: loadable(() => import('@views/ViewComplaint/elements/ViewCreateComplaint'))
  },
  {
    path: '/supplier-review/detail/:id',
    key: 'detailsupplierreview',
    exact: true,
    component: loadable(() => import('@views/ViewComplaint/elements/ViewDetailComplaint'))
  },
  {
    path: '/orders',
    key: 'order',
    exact: true,
    component: loadable(() => import('@views/ViewOrder/index')),
  },
  {
    path: '/orders-ck',
    key: 'order',
    exact: true,
    component: loadable(() => import('@views/ViewOrder/OrderListCK')),
  },
  {
    path: '/orders/detail/:id',
    key: 'orderdetail',
    exact: true,
    component: loadable(() => import('@views/ViewOrder/elements/OrderDetail')),
  },
  {
    path: '/orders/detail-ck/:id',
    key: 'orderdetail',
    exact: true,
    component: loadable(() => import('@views/ViewOrder/elements/DetailCK')),
  },
  {
    path: '/orders/update-ck/:id',
    key: 'orderdetail',
    exact: true,
    component: loadable(() => import('@views/ViewOrder/elements/UpdateCK')),
  },
  {
    path: '/orders/delivery/:id',
    key: 'orderdelivery',
    exact: true,
    component: loadable(() => import('@views/ViewOrder/elements/Delivery')),
  },
  {
    path: '/delivery',
    key: 'delivery',
    exact: true,
    component: loadable(() => import('@views/ViewDelivery')),
  },
  {
    path: '/delivery/:id',
    key: 'deliveryDetail',
    exact: true,
    component: loadable(() => import('@views/ViewDelivery/elements/Delivery')),
  },
  {
    path: '/create-order',
    key: 'create_order',
    exact: true,
    component: loadable(() => import('@views/ViewCreateOrder'))
  },
  {
    path: '/create-order-ck',
    key: 'create_order',
    exact: true,
    component: loadable(() => import('@views/ViewCreateOrder/ViewCreateOrderCK'))
  },
  {
    path: '/receipt',
    key: 'receipt',
    exact: true,
    component: loadable(() => import('@views/ViewReceipt')),
  },
  {
    path: '/receipt/detail/:id',
    key: 'receiptdetail',
    exact: true,
    component: loadable(() => import('@views/ViewReceipt/elements/ReceiptDetail')),
  },
  {
    path: '/user',
    key: 'user',
    exact: true,
    component: loadable(() => import('@views/ViewAccount')),
  },
  {
    path: '/setting',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting')),
  },
  {
    path: '/setting/category',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingSync')),
  },
  {
    path: '/setting/department-norm',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/DepartmentNorm')),
  },
  {
    path: '/setting/supplier',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingSupplier')),
  },
  {
    path: '/setting/parameter',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingSystemArgument')),
  },
  {
    path: '/setting/account',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingAccount')),
  },
  {
    path: '/setting/restaurant',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingRestaurant')),
  },
  {
    path: '/setting/notification',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingNotification')),
  },
  {
    path: '/setting/receiver',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingReceiver')),
  },
  {
    path: '/setting/commodity',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingCommoditySupplier')),
  },
  {
    path: '/setting/classify',
    key: 'setting',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingClassify')),
  },
  {
    path: '/setting/process',
    key: 'process',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingSystem')),
  },
  {
    path: '/setting/stufftype',
    key: 'stufftype',
    exact: true,
    component: loadable(() => import('@views/ViewSetting/elements/SettingStufftype')),
  },
]

export default routes
