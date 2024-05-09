"use client"
import { createContext,useContext,useState } from "react"
import { chatLists } from '@/contants/chat'

const chatListContext = createContext<ChatList | null>(null);

const ChatListProvider = ({children}:{children:React.ReactNode}) => {
  const [chatlists, setChatlists] = useState<ChatItem[]>(chatLists);
  
  const addChatToList = (chat:ChatItem) => {
    setChatlists((prev:ChatItem[]) => {
      const newChatlists = chatlists.filter(item => {
        return item.username !== chat.username;
      });
      return [chat,...newChatlists]
    });
  } 
  
  const clearUnreadCount = (targetId:string) => {
    setChatlists((prev:ChatItem[]) => {
      return prev.map((item) => {
        if(item.username === targetId) item.unread = undefined;
        return item;
      });
    });
  }

  return (
  <chatListContext.Provider value={{chatlists,setChatlists,addChatToList,clearUnreadCount}}>
  {children}
  </chatListContext.Provider>
  )
}

export const useChatLists = () => {
  return useContext(chatListContext) as ChatList
}



export default ChatListProvider; 
