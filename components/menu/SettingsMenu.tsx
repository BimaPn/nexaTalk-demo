import MenuLayout, {Navigation} from '@/layouts/MenuLayout'
import { useContext } from 'react'
import { MenuProvider, menuContext } from '../providers/MenuProvider'
import { RiPaintFill } from "react-icons/ri"
import LogoutButton from '../ui/form/LogoutButton'
import { IoLogOut } from "react-icons/io5"
import { RiUser3Fill } from "react-icons/ri"
import { IoIosArrowForward } from "react-icons/io" 

const SettingsMenu = () => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <MenuLayout className="overflow-hidden">
      <Navigation title="Settings" onClose={() => changeMenu("chatsMenu")} />
      <Settings className='mt-2' />
    </MenuLayout>
  )
}

const Settings = ({className}:{className?:string}) => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <div className={`w-full px-4 ${className}`}>
      <ul className="flex flex-col gap-1 bg-light dark:bg-dark-dark px-2 py-2 rounded-xl">
        <SettingItem 
        icon={<RiUser3Fill className="text-[18px]" />}
        label="Profile"
        menu="profileMenu"
        onClick={(menu) => changeMenu("profileMenu")}
        />
        <SettingItem 
        icon={<RiPaintFill className="text-[19px]" />}
        label="Appearance"
        menu="appearanceMenu"
        onClick={(menu) => changeMenu("appearanceMenu")}
        />
        <li className="flexBetween py-2 px-1 text-black hover:bg-semiLight dark:text-white dark:hover:bg-dark-semiDark rounded-xl group">
          <LogoutButton className="w-full flex items-center gap-[14px]">
            <div className="w-9 aspect-square flexCenter rounded-full bg-semiLight dark:bg-dark-netral dark:group-hover:bg-dark-netral group-hover:bg-white">
              <IoLogOut className="text-[19px] text-slate-600 dark:text-white -mr-[3px]" />
            </div>
            <div>
              <span className="text-[15px]">Logout</span>
            </div>
          </LogoutButton>
          <IoIosArrowForward />
        </li>
      </ul>
    </div>
  )
}

const SettingItem = ({icon, label, menu, onClick, className}:{icon:React.ReactNode,label:string,menu:string,onClick:(menu:string) => void,className?:string}) => {
  const buttonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(menu);
  }
  return (
    <li className={`flexBetween px-1 py-2 text-black dark:text-white hover:bg-semiLight dark:hover:bg-dark-semiDark rounded-xl ${className} group`}>
      <button onClick={buttonClick} className="w-full flex items-center gap-[14px]">
        <div 
        className="w-[36px] aspect-square text-slate-600 dark:text-white flexCenter rounded-full bg-semiLight dark:bg-dark-netral dark:group-hover:bg-dark-netral group-hover:bg-white">
          {icon}
        </div> 
        <div>
          <span className="text-[15px]">{label}</span>
        </div>
      </button> 
      <IoIosArrowForward />
    </li>
  )
}

export default SettingsMenu
