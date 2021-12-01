// import Chef from '@assets/images/chef.png'
// import { Button, Image } from 'antd'

const SidebarFooter = () => {
  return (
    <div className="font-barlow">
      {/* <div className="flex bg-yellow p-5 rounded-xl justify-between">
        <div>
          <p className="leading-5 font-medium tracking-wide" style={{ fontSize: 10 }}>
            Please, organize your <br /> menus through button <br /> bellow!
          </p>
          <Button className="bg-black-darkBlack text-white rounded-md border-0 h-9 w-28 mt-2 text-lg">
            +Add Menus
          </Button>
        </div>
        <Image className="mt-2" preview={false} src={Chef}></Image>
      </div> */}
      <div className="mt-16">
        <p className="font-bold font-barlow leading-5 text-gray-500">GGG Restaurant Admin Dashboard</p>
        <p className="font-barlow leading-5 text-gray-300">© 2021 All Rights Reserved</p>
      </div>
      <p className="mt-4 text-sm">
        Made with <span className="text-red-600">♥</span> by Golden Gate Group
      </p>
    </div>
  )
}

export default SidebarFooter
