import { useEffect, useRef, forwardRef } from 'react'
import UserMessage from '../ui/message/UserMessage'
import MediaMessage from '../ui/message/MediaMessage'
import { readableDate } from '@/lib/converter'
import { authUser } from '@/contants/users'
import { compareDate, dateToTime, formatDate } from '@/helpers/time'
import useConfirm from '../ui/Confirm'
import { useMessages } from '../providers/MessageProvider'

const MessageContent = ({
    messages, targetUsername 
  }:{
    messages: UserMessage[],
    targetUsername:string
  }) => {
  const messagesContainer = useRef<HTMLDivElement>(null) 

  const [ConfirmDialog, confirm] = useConfirm({
    label: "Are you sure you want to delete this message ?"
  })
  const { deleteMessage } = useMessages()  

  const scrollToBottom = () => {
    if (messagesContainer.current) {
      const element = messagesContainer.current;
      element.scrollTop = element.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom()
  },[messages])

  const ondeleteMessage = async (messageId: string) => {
    const isTrue = await confirm() 
    if(isTrue) {
      deleteMessage(messageId)
    }
  }
  return (
  <div ref={messagesContainer} className='w-full h-full overflow-y-auto custom-scrollbar scroll-smooth transition-all'>
   <ul className="w-full h-fit overflow-y-auto flex flex-col gap-4 px-3 pt-4">
        {messages.map((message, index) => (
          <li key={index}>
           {index === 0 && (
              <TimeBadge time={formatDate(message.createdAt, true)} />
            )}
            {index > 0 && !compareDate(message.createdAt, messages[index-1].createdAt) && (
              <TimeBadge time={formatDate(message.createdAt, true)} />
            )}
            <div className={`w-full flex ${message.sender === authUser.username ? "justify-end":"justify-start"}`}>
              {message.message && (
                <UserMessage
                id={message.id}
                message={message.message}
                createdAt={dateToTime(new Date(message.createdAt))}
                isCurrentUser={message.sender === authUser.username}
                onDelete={() => ondeleteMessage(message.id)}
                />
              )}
              {message.media && (
                <MediaMessage 
                id={message.id}
                media={message.media}
                isCurrentUser={message.sender === authUser.username}
                createdAt={dateToTime(new Date(message.createdAt))}
                onDelete={() => ondeleteMessage(message.id)}
                />
              )}
            </div>
          </li>
        ))}
    </ul>
    <ConfirmDialog />
  </div>
  )
}

const TimeBadge = ({time}:{time:string}) => {
  return (
    <div className="flexCenter mb-1">
      <div className="bg-white dark:bg-dark-semiDark px-3 py-1 rounded-full text-xs">
        {time} 
      </div>
    </div>  
  )
}


export default MessageContent

