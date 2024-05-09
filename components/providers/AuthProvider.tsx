"use client"
import { authUser } from "@/contants/users"
import { createContext, useContext, useState } from "react"

type AuthContext = {
  auth: User
  updateAuth: (data: ProfileEdit) => void
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
  return (
    <authContext.Provider value={{ auth, updateAuth }}> 
    {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext) as AuthContext
}

export default AuthProvider
