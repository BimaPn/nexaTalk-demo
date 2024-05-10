"use client"
import { authUser, users } from "@/contants/users"
import { createContext, useContext, useState } from "react"

type AuthContext = {
  auth: User
  updateAuth: (data: ProfileEdit) => void
  getAuthFriendList: () => UserItem[] | null
  getUserFriendsPreview: () => FriendPreview 
}

const authContext = createContext<AuthContext | null>(null)

const AuthProvider = ({children}:{children: React.ReactNode}) => {
  const [auth, setAuth] = useState(authUser)

  const updateAuth = (data: ProfileEdit) => {
    if(!data.avatar || !data.name || !data.bio){
      return
    }
    setAuth((user) => {
      user.avatar = data.avatar as string
      user.name = data.name
      user.bio = data.bio
      return user
    })
  }
    
  const getUserFriendsPreview = () => {
    if(!auth.friends || auth.friends.length < 1) {
      return {
        count: 0,
        avatars: null
      }
    }

    const avatars = auth.friends.filter((friend) => friend.type === "accepted").slice(0, 4).map((friend) => {
      const user = users.find((user) => user.username === friend.username) as UserItem
      return user.avatar
    })
    return {
      count: auth.friends.length,
      avatars
    }
  }
  const getAuthFriendList = () => {
    if(!auth.friends) {
      return null;
    }
    return auth.friends.filter((friend) => friend.type === "accepted").map((friend) => {
      const user = users.find((user) => user.username === friend.username) as UserItem
      return {
        name: user?.name,
        username: user?.username,
        avatar: user?.avatar,
        bio: user?.bio
      }
    })
  }
  return (
    <authContext.Provider value={{ auth, updateAuth, getAuthFriendList, getUserFriendsPreview }}> 
    {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext) as AuthContext
}

export default AuthProvider
