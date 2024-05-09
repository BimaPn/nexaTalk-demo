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
import { authUser } from '@/contants/users'
import { useChatLists } from '../providers/ChatListProvider'

const ChatsMenu = ({className}:{className ?: string}) => {
  const pathname = usePathname();
  const { searchChatList } = useChatLists()
  const [list, setList] = useState(searchChatList(""))
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  },[])

  const onSearch = (query: string) => {
    setList(searchChatList(query))
  }
  return (  
    <MenuLayout className={`pt-3 pb-5 relative px-2 ${pathname !== "/chat" && "hidden sm:block"}`}>
      <MenuNavbar avatar={authUser.avatar} className="sticky top-0 z-[1400] mb-3 mx-1"/> 
      <Search onSearch={onSearch} />
        {true ? (
          <ul className="flex flex-col gap-1 mt-4">
          {list.map((chat:ChatItem) => (
            <Link key={chat.username} href={`/chat/${chat.username}`}>
              <ChatItem 
              chatItem={chat} 
              />
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
