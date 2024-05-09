import MenuLayout, { Navigation } from "@/layouts/MenuLayout"
import { useContext } from "react";
import { MenuProvider, menuContext } from "../providers/MenuProvider";
import { authUser } from "@/contants/users";
import EditProfileModal from "../ui/EditProfileModal";

const ProfileMenu = () => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <MenuLayout className="overflow-hidden">
      <Navigation title="Profile" onClose={() => changeMenu("settingsMenu")}> 
      <div className="flex items-center justify-end">
        <EditProfileModal userAuth={authUser} />
      </div>

      </Navigation>
    </MenuLayout>
  )
}

export default ProfileMenu
