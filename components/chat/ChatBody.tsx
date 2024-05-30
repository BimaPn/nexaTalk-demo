"use client"
import { useMessages } from "../providers/MessageProvider"
import ChatInput from "./ChatInput"
import MessageContent from "./MessageContent"

type ChatBodyT = {
  userTarget:User,
}

const ChatBody = ({userTarget}:ChatBodyT) => { 
  const { getUserMessages } = useMessages()
  return (
    <div className="h-full sm:h-[91%] bg-semiLight dark:bg-dark-dark flex flex-col overflow-hidden rounded-t-2xl rounded-b-none sm:rounded-2xl m-0 sm:mx-3 relative">
      <MessageContent 
      messages={getUserMessages(userTarget.username)}
      target={userTarget}
      /> 
      <div className="w-full">
        <ChatInput 
        target={userTarget}
        />
      </div>
    </div>
  )
}

export default ChatBody


