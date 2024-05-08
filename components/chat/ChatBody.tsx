"use client"
import { useMessages } from "../providers/MessageProvider"
import ChatInput from "./ChatInput"
import MessageContent from "./MessageContent"

type ChatBodyT = {
  userTarget:User,
}

const ChatBody = ({userTarget}:ChatBodyT) => { 
  const { getUserMessages } = useMessages()

  const sendMessage = (message:UserMessage) => {
    // socket.emit("message",{message,to:userTarget.id});
    // addMessage(message);
    //
    // let newChat:ChatItem = {
    //   username:userTarget.username,
    //   avatar:userTarget.avatar,
    //   name:userTarget.name,
    //   createdAt:message.createdAt,
    //   message:"message" in message ? message.message : "images",
    //   isOnline:false,
    // }    
    //   
    // addChatToList(newChat); 
  }
  // const onTyping = (isTyping:boolean) => {
  //   socket.emit("typing",userTarget.id, isTyping);
  // }
  return (
    <div className="h-full sm:h-[91%] bg-light dark:bg-dark-dark flex flex-col overflow-hidden rounded-t-2xl rounded-b-none sm:rounded-2xl m-0 sm:mx-3 relative">
      <MessageContent 
      messages={getUserMessages(userTarget.username)}
      targetUsername={userTarget.username}
      /> 
      <div className="w-full">
        <ChatInput 
        setMessage={sendMessage}
        />
      </div>
    </div>
  )
}

export default ChatBody

    // <div className="h-full sm:h-[91%] bg-light dark:bg-dark-dark flex flex-col overflow-hidden rounded-t-2xl rounded-b-none sm:rounded-2xl m-0 sm:mx-3 relative">
    //   <FriendRequest socket={socket} target={userTarget.id as string} />
    //   <MessageContent 
    //   messages={messages}
    //   newMessages={(messages) => addMessages(messages)}
    //   isTyping={isTyping}
    //   targetUsername={userTarget.username}
    //   /> 
    //   <div className="w-full">
    //     <ChatInput onTyping={(isTyping) => onTyping(isTyping)} targetId={userTarget.id as string} setMessage={sendMessage} />
    //   </div>
    // </div>


