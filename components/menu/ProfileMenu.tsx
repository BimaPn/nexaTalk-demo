import MenuLayout, { Navigation } from "@/layouts/MenuLayout"
import { useContext } from "react";
import { MenuProvider, menuContext } from "../providers/MenuProvider";
import { authUser } from "@/contants/users";
import ProfileDetail from "../ProfileDetail";

const ProfileMenu = () => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <MenuLayout className="overflow-hidden">
      <Navigation title="Profile" onClose={() => changeMenu("settingsMenu")} /> 
      <ProfileDetail />
    </MenuLayout>
  )
}

export default ProfileMenu
