"use client"
import { createContext,useContext,useState } from "react"
import { chatLists } from '@/contants/chat'

const chatListContext = createContext<ChatList | null>(null);

const ChatListProvider = ({children}:{children:React.ReactNode}) => {
  const [chatlists, setChatlists] = useState<ChatItem[]>(chatLists);
  
  const addChatToList = (chat:ChatItem) => {
    let index = 0
    const item = chatlists.find((data, i) => {
      index = i
      return data.username === chat.username
    })
    if(!item) {
      setChatlists([chat, ...chatlists])
      return;
    }
    if(new Date(chat.createdAt) > new Date(chatlists[index].createdAt)) {
      const filtered = chatlists.filter((data) => data.username !== chat.username)
      setChatlists([chat, ...filtered])
      return;
    }

    const result = [...chatlists] 
    result[index] = chat
    setChatlists(result)
  } 
  
  const clearUnreadCount = (targetId:string) => {
    const temp = chatlists.map((item) => {
      if(item.username === targetId) item.unread = undefined;
      return item;
    });
    setChatlists(temp);
  }

  const deleteChat = (username: string) => {
    setChatlists((list) => {
      const filtered = list.filter((chat) => chat.username !== username)
      return filtered
    })
  }

  return (
  <chatListContext.Provider value={{
    chatlists,
    setChatlists,
    addChatToList,
    clearUnreadCount,
    deleteChat
    }}
    >
  {children}
  </chatListContext.Provider>
  )
}

export const useChatLists = () => {
  return useContext(chatListContext) as ChatList
}



export default ChatListProvider; 
