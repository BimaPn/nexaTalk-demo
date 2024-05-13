import { useEffect, useRef, forwardRef, useState } from 'react'
import UserMessage from '../ui/message/UserMessage'
import MediaMessage from '../ui/message/MediaMessage'
import { readableDate } from '@/lib/converter'
import { authUser } from '@/contants/users'
import { compareDate, dateToTime, formatDate } from '@/helpers/time'
import useConfirm from '../ui/Confirm'
import { useMessages } from '../providers/MessageProvider'
import { useChatLists } from '../providers/ChatListProvider'
import ChatInput from './ChatInput'
import Message from '../ui/message/Message'

const MessageContent = ({
    messages, target 
  }:{
    messages: UserMessage[],
    target: User 
  }) => {
  const messagesContainer = useRef<HTMLDivElement>(null) 
  const { addChatToList, clearUnreadCount } = useChatLists()
  const [ConfirmDialog, confirm] = useConfirm({
    label: "Are you sure you want to delete this message ?"
  })
  const { deleteMessage } = useMessages()  
  const [update, setUpdate] = useState<UserMessage | null>(null)

  const scrollToBottom = () => {
    if (messagesContainer.current) {
      const element = messagesContainer.current;
      element.scrollTop = element.scrollHeight;
    }
  };
  useEffect(() => {
    if(target.username === "jacob_owens") clearUnreadCount(target.username)
  },[])
  useEffect(() => {
    const lastMessage = messages[messages.length-1]
    addToChatList(lastMessage.media, lastMessage.message)
    scrollToBottom()
  },[messages])

  const addToChatList = (media?: Media[], message?: string) => {
    const newChatItem: ChatItem = {
      username: target.username,
      name: target.name,
      avatar: target.avatar,
      createdAt: new Date().toLocaleString(),
      media: media ? media[media.length-1] : null,
      message: message
    }
    addChatToList(newChatItem)
  }

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
                onUpdate={() => setUpdate(message)}
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
    {update && (
      <div className='absolute inset-0 bg-black/85 flex flex-col justify-end'>
        <div className='p-3'>
          <UpdateMessagePreview message={update} />
        </div>

        <ChatInput 
        target={target.username}
        defaultMessage={update}
        onSubmit={() => setUpdate(null)}
        />
      </div> 
    )}
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

const UpdateMessagePreview = ({message}:{message: UserMessage}) => {
  return (
    <div className={`w-full flex group justify-end`}>
      <div className={`max-w-[40%] w-fit flex flex-col gap-1 items-start`}>
        <div className={`w-full relative`}>
          <Message
          message={message.message as string}
          isCurrentUser={true}
          className="!w-full"
          />
        </div>
        <span className="text-[11px] text-semiDark dark:text-slate-400">{dateToTime(new Date(message.createdAt))}</span>
      </div>
    </div>
  )
}


export default MessageContent

