import { useEffect, useRef, forwardRef } from 'react'
import UserMessage from '../ui/message/UserMessage'
import MediaMessage from '../ui/message/MediaMessage'
import { readableDate } from '@/lib/converter'
import Typing from '../ui/Typing'
import { authUser } from '@/contants/users'
import { formatDate } from '@/helpers/time'

const MessageContent = ({
    messages, targetUsername 
  }:{
    messages: UserMessage[],
    targetUsername:string
  }) => {

  const messagesContainer = useRef<HTMLDivElement>(null) 

  const scrollToBottom = () => {
    if (messagesContainer.current) {
      const element = messagesContainer.current;
      element.scrollTop = element.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom()
  },[messages])
  // const messageContainer = useRef<HTMLDivElement | null>(null);
  // const checkScroll = () => {
  //   messageContainer!.current!.
  // }

  // useEffect(() => {
  //   messageContainer!.current!.scrollTop = messageContainer!.current!.scrollHeight;
  //
  // },[]);
  //
  return (
  <div ref={messagesContainer} className='w-full h-full overflow-y-auto custom-scrollbar scroll-smooth transition-all'>
   <ul className="w-full h-fit overflow-y-auto flex flex-col gap-4 px-3 pt-4">
        {messages.map((message, index) => (
          <li key={index}>
            <div className={`w-full flex ${message.sender === authUser.username ? "justify-end":"justify-start"}`}>
              {message.message && (
                <UserMessage
                message={message.message}
                createdAt={formatDate(message.createdAt)}
                isCurrentUser={message.sender === authUser.username}/>
              )}
              {message.media && (
                <MediaMessage 
                media={message.media}
                isCurrentUser={message.sender === authUser.username}
                createdAt={formatDate(message.createdAt)}
                />
              )}
            </div>
          </li>
        ))}
    </ul>
  </div>
  )
}

export default MessageContent

  // <div ref={messageContainer} className='w-full h-full overflow-y-auto custom-scrollbar scroll-smooth transition-all'>
  //  <ul  className="w-full h-fit overflow-y-auto flex flex-col gap-4 px-3 pt-4">
  //     {messages.map((msg,index) => {
  //       return (
  //       <MessageWrapper key={index} index={index} ref={ref}>
  //         {((index > 0 && msg.date !== messages[index-1].date) || index == 0)  && (
  //           <div className="w-full flexCenter my-5">
  //             <span className="bg-white dark:bg-dark-semiDark text-xs px-3 py-[6px] rounded-full">{readableDate(msg.date as string)}</span>
  //           </div>
  //         )}
  //         {"message" in msg ? (
  //           <div  className={`w-full flex ${msg.isCurrentUser ? "justify-end":"justify-start"}`}>
  //             <UserMessage
  //             id={msg.id}
  //             message={msg.message}
  //             createdAt={msg.createdAt}
  //             isCurrentUser={msg.isCurrentUser}/>
  //           </div>
  //         ) : (
  //           <div>
  //             <MediaMessage
  //             media={msg.media as string[]} 
  //             createdAt={msg.createdAt} 
  //             isCurrentUser={msg.isCurrentUser} />
  //           </div>
  //         )}
  //       </MessageWrapper>
  //       )
  //     })}
  //     {isTyping && (
  //       <Typing /> 
  //     )}
  //   </ul>
  // </div>
