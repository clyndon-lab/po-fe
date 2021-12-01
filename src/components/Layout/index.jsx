import '@assets/css/index.css'

import Logo from '@assets/images/ggglogo.png'
import LogoCollapse from '@assets/images/ggglogo-collapse.png'
import { loginWithHeader } from '@store/thunks/auth.thunk'
import { Layout as AntDLayout, Spin } from 'antd'
import { useAuth } from 'oidc-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { useHistory } from 'react-router-dom'
import Menu from './Menu'
import SidebarFooter from './SidebarFooter'

const { Sider, Content } = AntDLayout

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  // const history = useHistory()
  const auth = useAuth()
  const { account } = useSelector((state) => state['auths'])

  useEffect(()=>{
    dispatch(loginWithHeader())
  },[auth.userData])

  return (
    <AntDLayout className="bg-mainbg max-w-[1920px] mx-auto ">
      <div className="hide-scrollbar overflow-y-auto h-full">
        <Sider
          breakpoint="xxl"
          onBreakpoint={(broken) => {
            console.log(1, broken)
            setCollapsed(broken)
          }}
          onCollapse={(collapsed) => {
            setCollapsed(collapsed)
          }}
          width={320}
          collapsed={collapsed}
          collapsedWidth="84"
          className="bg-white pl-1 pr-[1.5rem] py-[4.75rem] ml-1 h-screen overflow-auto hide-scrollbar"
        >
          <div
            // onClick={() => history.push('/')}
            className={!collapsed ? 'px-10 mb-10 cursor-pointer' : 'pl-4 cursor-pointer'}
            onClick={()=>setCollapsed(!collapsed)}
          >
            <img src={collapsed ? LogoCollapse : Logo} alt="logo" />
            {!collapsed && <p className="text-third text-xl font-medium tracking-tight">Purchase Order Portal</p>}
          </div>
          <Menu collapsed={collapsed} data={account} />
          {!collapsed && (
            <div className="flex w-full justify-center pl-6 mt-4">
              <SidebarFooter />
            </div>
          )}
        </Sider>
      </div>
      <AntDLayout>
        <Content className="px-[32px] py-9">{children ? children : <Spin />}</Content>
      </AntDLayout>
    </AntDLayout>
  )
}

export default Layout
