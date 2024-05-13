interface ChatItem {
  username?:string
  avatar:string
  name:string
  message?:string | null
  media?: Media | null
  createdAt: string 
  unread?: number
  isOnline?:boolean
}

interface ChatList {
  chatlists: ChatItem[]
  setChatlists: Dispatch<SetStateAction<ChatItem[]>>
  addChatToList: (chat:ChatItem) => void
  clearUnreadCount: (targetId:string) => void
  searchChatList: (query: string) => ChatItem[]
  deleteChat: (username: string) => void
}  
