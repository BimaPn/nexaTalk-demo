"use client"
import RoundedImage from "../ui/RoundedImage"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { BsTelephone } from "react-icons/bs"
import { HiOutlineVideoCamera } from "react-icons/hi2"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext, useState } from "react"
import { UserAvatar } from "../ui/ChatItem"
import Dropdown from "../ui/Dropdown"
import { IoMdTrash } from "react-icons/io"
import { useMessages } from "../providers/MessageProvider"
import useConfirm from "../ui/Confirm"
import { useChatLists } from "../providers/ChatListProvider"
import { useRouter } from "next-nprogress-bar"
import BackButton from "../BackButton"

type ChatHeaderT = {
  username:string,
  avatar:string,
  name:string,
  isOnline:boolean,
}

const ChatHeader = ({username,avatar,name,isOnline}:ChatHeaderT) => {
  const { setIsOpen } = useContext(profileDetailContext) as ProfileDetail;
  const { deleteAllUserMessages } = useMessages()
  const { deleteChat } = useChatLists()
  const router = useRouter()
  const [ConfirmDialog, confirm] = useConfirm({
    label: "Are you sure you want to delete all the messages ?"
  })

  const deleteAll = async () => {
    const isTrue = await confirm() 
    if(isTrue) {
      router.push('/chat')
      deleteAllUserMessages(username)
      deleteChat(username)
    }
  }
  const openProfileInfo = (e:React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  }
  return (
    <div className="w-full py-2 sm:py-[9px]">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <BackButton className="block sm:hidden" />
          <div className="flex items-center gap-3">
            <div onClick={openProfileInfo}>
              <UserAvatar
              avatar={avatar}
              alt={name}
              isOnline={isOnline}
              className="!w-10"/> 
            </div>
            <div className="flex flex-col leading-5">
              <span onClick={openProfileInfo} className="text-black text-[15px] sm:text-base dark:text-white cursor-pointer">{name}</span>
              {isOnline ? (
                <span className="text-[12px] text-netral dark:text-slate-400">Online</span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="relative z-[2]">
          <ChatSettings username={username} onDelete={deleteAll} /> 
        </div>
      </div>
      <ConfirmDialog />
    </div>
  )
}

const ChatSettings = ({username, onDelete}:{username: string, onDelete:() => void}) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className="w-9 aspect-square rounded-full flexCenter bg-light dark:bg-dark-netral text-dark dark:text-white">
          <HiOutlineDotsHorizontal className="text-[20px]" />
        </div>
      </Dropdown.Trigger> 
      <Dropdown.Content  className="right-0 w-28 text-black dark:text-white">
       <div className="bg-white dark:bg-dark-netral flex flex-col shadow rounded-lg py-1 px-1 font-medium text-[13px]">
          <button onClick={() => onDelete()} className="w-full flex items-center gap-[2px] px-1 py-1 hover:bg-light dark:hover:bg-dark-semiLight rounded-lg cursor-pointer">
            <IoMdTrash className="text-[19px]" />
            <span className="font-medium">Delete all</span>
          </button>
       </div>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default ChatHeader
