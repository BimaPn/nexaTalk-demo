"use client"
import { readableDate } from "@/lib/converter"
import { useAuth } from "./providers/AuthProvider"
import RoundedImage from "./ui/RoundedImage"
import EditProfileModal from "./ui/EditProfileModal"
import { HiUser, HiUsers } from "react-icons/hi"
import { IoIosArrowForward } from "react-icons/io" 
import FriendList from "./FriendList"

const ProfileDetail = () => {
  const { auth } = useAuth()
  return (
    <section className="w-full bg-white dark:bg-dark-semiDark rounded-2xl h-full overflow-auto custom-scrollbar">
      <div className="aspect-[3/1] bg-semiLight dark:bg-dark-netral rounded-t-2xl rounded-b-lg relative mb-10 m-2">
        <div className="absolute -bottom-8 left-2">
          <RoundedImage
          src={auth.avatar}
          className="!w-20 border-[6px] border-white dark:border-dark-semiDark" 
          alt={auth.name}
          />
        </div>
      </div>
      <div className="bg-semiLight dark:bg-dark-dark px-4 pt-[10px] pb-3 rounded-xl mx-2">
        <div className="flexBetween border-b dark:border-slate-700 pb-3">
          <div className="w-[80%] flex flex-col">
            <span className="text-[17px] font-bold text-black`">{auth.name}</span>
            <span className="text-gray-500 dark:text-slate-400 text-xs">{auth.username}</span>
          </div>
          <EditProfileModal />
        </div>

        <div className="flex flex-col gap-[10px] mt-3">
          <div className="flex flex-col gap-[2px]">
            <span className="text-gray-500 dark:text-white text-xs font-medium">Bio</span>
            <p className="text-sm">{auth.bio}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 dark:text-white text-xs font-medium">Joined Since</span>
            <p className="text-sm">{readableDate(auth.joinedAt)}</p>
          </div>
        </div>
      </div>
      <Friends />
    </section>
  )
}

const Friends = () => {
  const { getUserFriendsPreview } = useAuth()
  const preview = getUserFriendsPreview()
  return (
    <FriendList className="w-full">
      <div className="bg-semiLight dark:bg-dark-dark px-4 py-3 rounded-xl mx-2 mt-3 flexBetween">
        <div className="flex items-center gap-2">
          <HiUsers className="text-xl" />
          <div className="flex items-center gap-1 text-sm -mb-1">
            <span className="font-medium">Friends</span>
            <span className="text-xs">({preview.count})</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
          {preview.avatars && preview.avatars.map((image) => (
          <RoundedImage src={image} alt={image} className="!w-7 -mr-4" key={image} />
          ))}
          </div>
          <div>
          <IoIosArrowForward className="text-[15px]" />
          </div>
        </div>
      </div>
    </FriendList>
  )
}

export default ProfileDetail
