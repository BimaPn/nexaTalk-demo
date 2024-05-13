import { formatDate } from "@/helpers/time"
import RoundedImage from "./RoundedImage"
import { MdOutlineInsertPhoto } from "react-icons/md"
import { MdOutlineVideocam } from "react-icons/md"

const ChatItem = ({username, name, avatar, message, media, unread, isOnline, createdAt}:ChatItem) => {
  return (
    <div className="w-full flex items-center justify-between gap-[9px] py-2 px-3 rounded-xl hover:bg-light dark:hover:bg-dark-netral relative z-0">
      <UserAvatar avatar={avatar} alt={name} isOnline={isOnline} className="!min-w-[44px]" />
      <div className="w-[95%] flex flex-col items-center overflow-hidden">
        <div className="w-full flex items-center justify-between">
          <span className="text-black dark:text-white">{name}</span>
          <span className="text-[11.5px] text-semiDark dark:text-slate-400">{formatDate(createdAt)}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className={`w-[85%] text-[15px] text-semiDark dark:text-slate-400 line-clamp-1  ${unread ? "font-bold":"font-normal"}`}>
            {message ?? null}
            {(media && media.type === "image") && (
              <div className="flex items-center gap-1">
                <MdOutlineInsertPhoto className="text-[17px]" />
                <div className="-mb-[2px]">
                  <span>Image</span>
                </div>
              </div>

            )}
            {(media && media.type === "video") && (
              <div className="flex items-center gap-1">
                <MdOutlineVideocam className="text-[20px]"/>
                <div className="">
                  <span>Video</span>
                </div>
              </div>
            )}
          </span>
          {unread && (
            <div className={`px-1 aspect-square font-medium bg-primary text-white rounded-full text-xs`}></div>
          )}
        </div>
      </div>
      
    </div>
  )
}

export const UserAvatar = ({avatar,alt,isOnline,className}:{avatar:string,alt:string,isOnline?: boolean,className?:string}) => {
  return(
  <div className="relative z-0">
    <RoundedImage src={avatar} className={className} alt={alt} />
    {isOnline && (
      <span className="absolute bottom-[2%] right-[2%] w-[11px] aspect-square bg-yellow-400 rounded-full border border-white"></span>
    )}
  </div>
  )
}

export default ChatItem
