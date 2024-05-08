"use client"
import MenuLayout from '@/layouts/MenuLayout'
import { usePathname } from "next/navigation"
import Search from '../ui/Search'
import ChatItem from "../ui/ChatItem"
import { useEffect, useContext, useState } from 'react'
import Link from 'next/link'
import { chatListContext } from '../providers/ChatListProvider'
import { SocketProvider, socketContext } from '../providers/SocketProvider'
import ChatMenuDropdown from '../ui/ChatMenuDropdown'
import { AiOutlineWechat } from "react-icons/ai"
import ChatMenuSkeleton from '../skeletons/ChatMenuSkeleton'
import { BiSolidMessageDetail } from "react-icons/bi"
import StoriesIcon from '../icons/StoriesIcon'
import { StoriesMenuTrigger } from './StoriesMenu'
import StartNewChat from '../StartNewChat'
import { chatLists } from '@/contants/chat'
import { authUser } from '@/contants/auth'

const ChatsMenu = ({className}:{className ?: string}) => {
  const pathname = usePathname();
  return (  
    <MenuLayout className={`pt-3 pb-5 relative px-2 ${pathname !== "/chat" && "hidden sm:block"}`}>
      <MenuNavbar avatar={authUser.avatar} className="sticky top-0 z-[1400] mb-3 mx-1"/> 
      <Search />
        {true ? (
          <ul className="flex flex-col gap-1 mt-4">
          {chatLists.map((chat:ChatItem) => (
            <Link key={chat.username} href={`/chat/${chat.username}`}>
              <ChatItem 
              name={chat.name}
              avatar={chat.avatar}
              createdAt={chat.createdAt}
              message={chat.message}
              unread={chat.unread}
              isOnline={chat.isOnline} />
            </Link>
          ))}
          </ul>
        ):(
          <ChatMenuSkeleton />
        )}
        <StartNewChat />
    </MenuLayout>
  )
}

const MenuNavbar = ({avatar, className}:{avatar:string, className?:string}) => {
  return (
    <div className={`flexBetween py-1 px-2 ${className}`}>
      <div className="flexCenter gap-[5px] text-black dark:text-white">
        <AiOutlineWechat className="text-3xl" />
        <h1 className="font-bold text-[21px]">UChat</h1>
      </div>
      <div className="flexCenter gap-[14px]">
          <StoriesIcon width={22} />
        <ChatMenuDropdown avatar={avatar} /> 
      </div>  

    </div>
  )
}


export default ChatsMenu;  
