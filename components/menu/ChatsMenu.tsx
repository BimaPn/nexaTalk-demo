"use client"
import MenuLayout from '@/layouts/MenuLayout'
import { usePathname } from "next/navigation"
import Search from '../ui/Search'
import ChatItem from "../ui/ChatItem"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ChatMenuDropdown from '../ui/ChatMenuDropdown'
import { AiOutlineWechat } from "react-icons/ai"
import ChatMenuSkeleton from '../skeletons/ChatMenuSkeleton'
import { BiSolidMessageDetail } from "react-icons/bi"
import StoriesIcon from '../icons/StoriesIcon'
import StartNewChat from '../StartNewChat'
import { useChatLists } from '../providers/ChatListProvider'
import { useAuth } from '../providers/AuthProvider'
import { StoriesMenuTrigger } from './StoriesMenu'

const ChatsMenu = ({className}:{className ?: string}) => {
  const pathname = usePathname();
  const { auth } = useAuth()
  const { chatlists, searchChatList } = useChatLists()
  const [loaded, setLoaded] = useState(false)
  const [search, setSearch] = useState("")
  useEffect(() => {
    setLoaded(true)
  },[])

  const onSearch = (query: string) => {
    setSearch(query)
  }
  return (  
    <MenuLayout className={`pt-3 pb-5 relative z-[0] px-2 ${pathname !== "/chat" && "hidden sm:block"}`}>
      <MenuNavbar avatar={auth.avatar} className="sticky top-0 z-[1400] mb-3 mx-1"/> 
      <Search onSearch={onSearch} />
        {loaded ? (
          <ul className="flex flex-col gap-1 mt-4">
          {chatlists.map((chat) => {
            const regex = new RegExp(search, 'i'); 
            return regex.test(chat.name)  && (
            <Link key={chat.username} href={`/chat/${chat.username}`}>
              <ChatItem 
              name={chat.name}
              username={chat.username as string}
              avatar={chat.avatar}
              message={chat.message ?? null}
              media={chat.media ?? null}
              unread={chat.unread}
              isOnline={chat.isOnline}
              createdAt={chat.createdAt}
              />
            </Link>
          )
          })}
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
        <StoriesMenuTrigger> 
          <StoriesIcon width={22} />
        </StoriesMenuTrigger>
        <ChatMenuDropdown avatar={avatar} /> 
      </div>  

    </div>
  )
}


export default ChatsMenu;  
