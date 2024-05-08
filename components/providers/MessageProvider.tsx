"use client"
import { authUser } from "@/contants/users"
import { messages as initial } from "@/contants/chat"
import { useState, createContext, useContext } from "react"

type MessageProvider = {
  messages: (UserMessage|MediaMessage)[]
  getUserMessages: (username: string) => UserMessage[]
}

export const messageContext = createContext<MessageProvider | null>(null);

const MessageProvider = ({children}:{children:React.ReactNode}) => {
  const [messages,setMessages] = useState<UserMessage[]>(initial);
  
  const getUserMessages = (username: string) => {
    return messages.filter((message) =>  ((message.sender === username && message.receiver === authUser.username) ||
   (message.sender === authUser.username && message.receiver === username)))
  }

  return (
    <messageContext.Provider value={{ messages, getUserMessages }}>
    {children}
    </messageContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(messageContext) as MessageProvider
}

export default MessageProvider
