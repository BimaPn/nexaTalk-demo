"use client"
import { IoSend } from "react-icons/io5"
import { PiImageSquareFill } from "react-icons/pi"
import { GrEmoji} from "react-icons/gr"
import { ImAttachment } from "react-icons/im"
import { useEffect, useRef, useState } from "react"
import { MdOutlineKeyboardVoice } from "react-icons/md"
import TextAreaExpand from "../ui/form/TextAreaExpand"
import MediaInput, { Previews, Trigger } from "../ui/form/MediaInput"
import PickEmoji from "../PickEmoji"
import { authUser } from "@/contants/users"
import { useMessages } from "../providers/MessageProvider"

const ChatInput = ({targetUsername, className}:{targetUsername: string, className?:string}) => {
  const { addMessage } = useMessages()
  const [messageInput,setMessageInput] = useState<string>("");
  const [media,setMedia] = useState<Media[]>([]);
  const submitButton = useRef<HTMLButtonElement>(null);
  
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const newMessage: UserMessage = {
      id: `${Date.now()}-${Math.round(Math.random())}`,
      createdAt: new Date(),
      sender: authUser.username,
      receiver: targetUsername
    }
    if(media.length > 0) {
      addMessage({...newMessage, media})
      setMedia([])
    }
    if(messageInput.length > 0) {
      addMessage({...newMessage, message: messageInput})
      setMessageInput("")
    }
  }
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessageInput(e.target.value);
  }
  return (
    <div className={`w-full flexCenter px-2 sm:px-3 pb-3 bg-light dark:bg-dark-dark ${className}`}>

      <form className="w-full" onSubmit={handleSubmit} >
        <MediaInput
        value={media}
        onChange={(results) => setMedia(results)}
        className="flex justify-center items-end gap-[6px] sm:gap-3"
        >
          <Trigger className="min-w-[39px] aspect-square rounded-full bg-white dark:bg-dark-semiDark  flexCenter shadow group">
            <ImAttachment className="px-1 aspect-square text-dark dark:text-slate-400 dark:group-hover:text-white text-[26px]" />      
          </Trigger>

          <div className="w-full flex flex-col gap-3">
            <Previews />
            <div className="w-full flex items-center gap-2 bg-white dark:bg-dark-semiDark rounded-full px-3 py-[2px] shadow">
              <div className="group">
                <PickEmoji onEmojiClick={(emoji) => setMessageInput((prev) => prev + emoji)}/>
              </div>
              <div className="w-full max-h-[108px] overflow-auto py-[7px]">
                <TextAreaExpand 
                value={messageInput}
                onChange={onChange}
                handleSubmit={() => submitButton.current?.click()}
                className="text-[15px] placeholder:text-slate-500 dark:placeholder:text-slate-400"
                rows={1}
                placeholder="Type something..." />
              </div>
              {(messageInput.length !== 0 || media.length !== 0) && (
              <button type="submit" ref={submitButton}>
                <IoSend className="text-[19px] text-primary"/>
              </button>
              )}
            </div>
          </div>
          <div className="min-w-[39px] aspect-square rounded-full bg-white dark:bg-dark-semiDark flexCenter shadow group">
            <MdOutlineKeyboardVoice className="text-2xl text-dark dark:text-slate-400 dark:group-hover:text-white" />      
          </div>
        </MediaInput>
      </form> 
    </div>
  )
}

export default ChatInput
