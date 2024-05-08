"use client"
import RoundedImage from "../ui/RoundedImage"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { BsTelephone } from "react-icons/bs"
import { HiOutlineVideoCamera } from "react-icons/hi2"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext, useState } from "react"
import { UserAvatar } from "../ui/ChatItem"

type ChatHeaderT = {
  username:string,
  avatar:string,
  name:string,
  isOnline:boolean,
}

const ChatHeader = ({username,avatar,name,isOnline}:ChatHeaderT) => {
  const { setIsOpen } = useContext(profileDetailContext) as ProfileDetail;
  const openProfileInfo = (e:React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  }
  return (
    <div className="w-full py-2 sm:py-[9px]">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div onClick={openProfileInfo}>
            <UserAvatar
            avatar={avatar}
            alt={name}
            isOnline={isOnline}
            className="!w-10"/> 
          </div>
          <div className="flex flex-col leading-5">
            <span className="text-black text-[15px] sm:text-base dark:text-white">{name}</span>
            {/*<span className="w-full text-[13px] text-primary">Typing....</span>*/}
            {isOnline ? (
              <span className="text-[12px] text-netral dark:text-slate-400">Online</span>
            ) : null}
          </div>
        </div>
        <div className="w-9 aspect-square rounded-full flexCenter bg-light dark:bg-dark-netral text-dark dark:text-white">
          <HiOutlineDotsHorizontal className="text-[20px]" />
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
