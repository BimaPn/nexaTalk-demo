"use client"
import { authUser } from "@/contants/users"
import { messages as initial } from "@/contants/chat"
import { useState, createContext, useContext } from "react"

type MessageProvider = {
  messages: UserMessage[]
  getUserMessages: (username: string) => UserMessage[]
  addMessage: (message: UserMessage) => void
  deleteMessage: (messageId: string) => void
  updateMessage: (message: UserMessage) => void
  deleteAllUserMessages: (username: string) => void
  getUserMedia: (username: string) => UserMessage[] 
  getUserMediaPreview: (username: string) => MediaPreview | null
}

export const messageContext = createContext<MessageProvider | null>(null);

const MessageProvider = ({children}:{children:React.ReactNode}) => {
  const [messages,setMessages] = useState<UserMessage[]>(initial);
  
  const getUserMessages = (username: string) => {
    return messages.filter((message) =>  ((message.sender === username && message.receiver === authUser.username) ||
   (message.sender === authUser.username && message.receiver === username)))
  }
  const addMessage = (message: UserMessage) => {
    setMessages((prev) => [...prev, message])
  }
  const updateMessage = (message: UserMessage) => {
    const result = messages.map((msg) => {
      if(msg.id === message.id) {
        msg = message
      }
      return msg
    })
    setMessages(result)
  }
  const deleteMessage = (messageId: string) => {
    setMessages((prev) => {
      const filtered = prev.filter((msg) => msg.id !== messageId)
      return filtered
    })
  }
  const deleteAllUserMessages = (username: string) => {
    setMessages((prev) => {
      return prev.filter((message) =>  !(((message.sender === username && message.receiver === authUser.username) ||
     (message.sender === authUser.username && message.receiver === username))))
    })
  }

  const getUserMediaPreview = (username: string) => {
    const media = messages.filter((message) =>  (((message.sender === username && message.receiver === authUser.username) ||
    (message.sender === authUser.username && message.receiver === username))) && message.media)

    if(media.length > 0) {
      const result: Media[] = [] 
      let stopLoop = false

      media.forEach((item) => {
        if(stopLoop) {
          return;
        }
        item.media!.forEach((media) => {
          if(result.length >= 4) {
            stopLoop = true
            return
          }
          result.push(media)
        })
      })

      return {
        count: media.length,
        media: result 
      }
    }
    return null
  }

  const getUserMedia = (username: string) => {
    return messages.filter((message) =>  (((message.sender === username && message.receiver === authUser.username) ||
   (message.sender === authUser.username && message.receiver === username))) && message.media)
  }

  return (
    <messageContext.Provider value={{ 
      messages,
      getUserMessages,
      addMessage,
      updateMessage,
      deleteMessage,
      deleteAllUserMessages,
      getUserMedia,
      getUserMediaPreview
    }}
    >
    {children}
    </messageContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(messageContext) as MessageProvider
}

export default MessageProvider
