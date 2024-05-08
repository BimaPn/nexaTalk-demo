"use client"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext } from "react"
import ChatHeader from "./ChatHeader"
import ChatBody from "./ChatBody"
import ChatSectionSkeleton from "../skeletons/ChatSectionSkeleton"

const ChatSection = ({userTarget}:{userTarget:User}) => {
  const { isOpen } = useContext(profileDetailContext) as ProfileDetail;
  return (
    <section className={`w-full h-full flex flex-col bg-white dark:bg-dark-semiDark rounded-none sm:rounded-2xl relative overflow-hidden ${isOpen && "hidden lg:block"}`}>
        <ChatHeader 
        username={userTarget.username} 
        avatar={userTarget.avatar} 
        name={userTarget.name}
        isOnline={userTarget.isOnline}
        />
        <ChatBody
        userTarget={userTarget}
        />
    </section>
  )
}

export default ChatSection
