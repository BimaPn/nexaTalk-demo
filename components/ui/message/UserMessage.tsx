import MessageOption from "@/components/MessageOption"
import Message from "./Message"
import { HiOutlineDotsVertical } from "react-icons/hi"

const UserMessage = ({
  id,
  message,
  createdAt,
  isCurrentUser=false,
  className,
  onDelete,
  onUpdate
}:{
  id: string,
  message: string,
  createdAt: string,
  isCurrentUser: boolean,
  className?: string,
  onDelete: () => void,
  onUpdate: () => void
}) => {
  return (
    <div className={`w-full flex group ${isCurrentUser ? "justify-end":"justify-start "} ${className}`}>
      <div className={`max-w-[90%] md:max-w-[40%] w-fit flex flex-col gap-1 ${isCurrentUser ? "items-start":"items-end"}`}>
        <div className={`w-full relative`}>
          {isCurrentUser && (
            <div className="absolute top-[2px] -left-5 block sm:hidden sm:group-hover:block">
              <MessageOption messageId={id} onUpdate={onUpdate} onDelete={() => onDelete()} />
            </div>    
          )}
          <Message 
          message={message}
          isCurrentUser={isCurrentUser}
          className="!w-full"
          />
        </div>
        <span className="text-[11px] text-semiDark dark:text-slate-400">{createdAt}</span>
      </div>
    </div>
  )
}

export default UserMessage

    // <div className={`w-full flex group ${isCurrentUser ? "justify-end":"justify-start "} ${className}`}>
    //   <div className={`max-w-[40%] w-fit flex flex-col gap-1 ${isCurrentUser ? "items-start":"items-end"}`}>
    //     <div className={`w-full relative`}>
    //       {isCurrentUser && (
    //         <div className="absolute top-0 -left-5 hidden group-hover:block">
    //           <MessageOption messageId={rest.id} />
    //         </div>    
    //       )}
    //       <Message message={message} isCurrentUser={isCurrentUser} className="!w-full"/>
    //     </div>
    //     <span className="text-[11px] text-semiDark dark:text-slate-400">{createdAt}</span>
    //   </div>
    //
    // </div>
