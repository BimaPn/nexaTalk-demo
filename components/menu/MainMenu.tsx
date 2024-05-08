"use client"
import { useContext, useEffect } from "react"
import { MenuProvider as MenuProviderType, menuContext } from "../providers/MenuProvider"
import ChatsMenu from "./ChatsMenu";
import SettingsMenu from "./SettingsMenu";
import { SocketProvider, socketContext } from "../providers/SocketProvider";
import AppearanceMenu from "./AppearanceMenu";
import { authUser } from "@/contants/auth";

const MainMenu = () => {
  const { currentMenu } = useContext(menuContext) as MenuProviderType;
  return (
    <section>
     {currentMenu === "chatsMenu" && <ChatsMenu />} 
     {currentMenu === "settingsMenu" && <SettingsMenu />} 
     {currentMenu === "appearanceMenu" && <AppearanceMenu />} 
    </section>
  )
}

export default MainMenu



     // {currentMenu === "storiesMenu" && <StoriesMenu />} 