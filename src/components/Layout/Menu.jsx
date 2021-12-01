import {
  AlignLeftOutlined,
  BarChartOutlined,
  CoffeeOutlined,
  EditOutlined,
  FileOutlined,
  FormOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingFilled,
  TeamOutlined
} from '@ant-design/icons'
import CConfirmModal from '@components/common/CConfirmModal'
import { Menu as AntDMenu } from 'antd'
// import R from "ramda"
import { useAuth } from 'oidc-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Menu = ({ data, collapsed }) => {
  console.log(data)
  const menuItems = [
    {
      key: 'home',
      path: '/',
      text: 'Trang chủ',
      icon: <HomeOutlined className="text-main-black" style={{ fontSize: 15 }} />
    },
    {
      key: 'create_order',
      path: '/create-order',
      text: 'Tạo đơn đặt hàng',
      icon: <EditOutlined className="text-main-black" style={{ fontSize: 15 }} />
    },
    {
      key: 'order_list',
      path: '/orders',
      text: 'Danh sách đơn hàng',
      icon: <AlignLeftOutlined className="text-main-black" style={{ fontSize: 15 }} />
    },
    {
      key: 'delivery',
      path: '/delivery',
      text: data?.Users.TypeAccount === 2 ? 'Danh sách phiếu giao hàng' : 'Danh sách phiếu nhận hàng',
      icon: <FileOutlined className="text-main-black" style={{ fontSize: 15 }} />
    },
    {
      key: 'merchandise_return_list',
      path: '/merchandise-return',
      text: 'Danh sách phiếu trả hàng',
      icon: <TeamOutlined className="text-main-black" style={{ fontSize: 15 }} />
    },
    {
      key: 'report',
      path: '/report',
      text: 'Báo cáo',
      icon: <BarChartOutlined className="text-main-black" style={{ fontSize: 15 }} />
    },
    {
      key: 'order_forecast',
      path: '/order-forecast',
      text: 'Dự báo đặt hàng',
      icon: <CoffeeOutlined className="text-main-black" style={{ fontSize: 15 }} />
    },
    {
      key: 'supprlier_review',
      path: '/supplier-review',
      text: 'Đánh giá nhà cung cấp',
      icon: <FormOutlined className="text-main-black" style={{ fontSize: 15 }} />
    },
    {
      key: 'user',
      path: '/user',
      text: 'Quản lý người dùng',
      icon: <TeamOutlined className="text-main-black" style={{ fontSize: 15 }} />
    },
    {
      key: 'setting',
      path: '/setting',
      text: 'Cấu hình',
      icon: <SettingFilled className="text-main-black" style={{ fontSize: 15 }} />
    },
    {
      key: 'logout',
      path: '/logout',
      text: 'Đăng xuất',
      icon: <LogoutOutlined className="text-main-black" style={{ fontSize: 15 }} />
    }
  ]
  const location = useLocation()
  const auth = useAuth()
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(getCurrentPathKey())
  const [isShowConfirm, setIsShowConfirm] = useState(false)

  useEffect(() => {
    setDefaultSelectedKeys(getCurrentPathKey())
  }, [location.pathname])

  // const diff = (menuItem) => menuItem.path !== "/";

  // const pathComponents = R.split('/');

  function getCurrentPathKey() {
    return (
      menuItems.filter((i) => i.path !== '/' && location.pathname.split('/')[1] === i.path.replace('/', '').trim())[0]
        ?.key || 'home'
    )
  }

  const getMenuItemClasses = (item) =>
    location.pathname.includes(item.path) && item.path.length > 1
      ? 'ant-menu-selected text-lg tracking-tight'
      : 'text-lg tracking-tight'

  return (
    <>
      <AntDMenu defaultSelectedKeys={[defaultSelectedKeys]} mode="inline" className="border-r-0 pl-[13px]">
        {menuItems.map((item) => {
          if (item.key !== 'logout')
            return (
              <AntDMenu.Item
                style={{ height: '54px !important' }}
                className={getMenuItemClasses(item)}
                key={item.key}
                icon={item.icon}
              >
                <Link to={item.path} className="text-lg font-barlow">
                  {item.text}
                </Link>
              </AntDMenu.Item>
            )
          else
            return (
              <div
                onClick={() => setIsShowConfirm(true)}
                // className={getMenuItemClasses(item)}
                key={'logout'}
                className={
                  collapsed
                    ? 'flex items-center h-[54px] logout-btn cursor-pointer'
                    : 'flex items-center h-[54px] logout-btn-exp cursor-pointer'
                }
              >
                <LogoutOutlined style={{ fontSize: '15px' }} className="md:pl-0"></LogoutOutlined>
                {!collapsed && <p className="text-lg ml-[25px] font-barlow">{item.text}</p>}
                {/* {!collapsed && <p className="text-lg ml-[25px] font-barlow">{item.text}</p>} */}
              </div>
            )
        })}
      </AntDMenu>
      <CConfirmModal
        handleVisible={() => setIsShowConfirm(false)}
        visible={isShowConfirm}
        onOk={() => auth.signOutRedirect()}
        description="Bạn có chắc chắn muốn đăng xuất?"
      ></CConfirmModal>
    </>
  )
}

export default Menu
