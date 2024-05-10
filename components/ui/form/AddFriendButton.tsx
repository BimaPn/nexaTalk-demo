"use client"
import { useAuth } from "@/components/providers/AuthProvider";
import { FriendStatus, friendStatusContext } from "@/components/providers/FriendStatusProvider";
import { useContext, useEffect, useState } from "react"
import { FaUserPlus, FaUserClock, FaUserCheck, FaUserXmark } from "react-icons/fa6"

const AddFriendButton = ({ target, className }:{ target:string, className?:string }) => {
  const { checkIsFriend, requestFriend, removeFriend } = useAuth()
  const [status, setStatus] = useState(checkIsFriend(target))

  const sendRequest = async (e:React.MouseEvent<HTMLButtonElement>) => {
    if(!status) {
      setStatus("requested")
      requestFriend(target)
    }
    if(status === "requested" || status === "accepted") {
      removeFriend(target)
      setStatus(null)
    }
  }

  return (
    <button 
    onClick={sendRequest}
    className={`px-3 flexCenter gap-[6px] bg-white dark:bg-dark-netral py-[7px] rounded-lg dark:hover:bg-dark-semiDark ${className}`}>
      {!status && <FaUserPlus className="text-lg"/>}
      {status === "requested" && <FaUserClock className="text-lg"/>}
      {status === "accepted" && <FaUserCheck className="text-lg"/>}
      <span className="text-sm font-medium -mb-[2px]">
      {!status && "Request"}
      {status === "requested" && "Sended"}
      {status === "accepted" && "Unfriend"}
      </span>
    </button>
  )
}

export default AddFriendButton
