import ViewWrapper from '@components/common/ViewWrapper'
import SettingList from '@views/ViewSetting/elements/SettingList'

const ViewSetting = () => {
  
  return (
    <ViewWrapper
      title="Cấu hình"
    >
      <div className="mt-6">
        <SettingList />
      </div>
    </ViewWrapper>
  )
}

export default ViewSetting
