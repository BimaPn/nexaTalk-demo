"use client"
import { users as initial } from "@/contants/users"
import { createContext, useContext, useState } from "react"

type UsersContext = {
  users: User[]
  findUser: (username: string) => User | null
}

const usersContext = createContext<UsersContext | null>(null)

const UsersProvider = ({children}:{children: React.ReactNode}) => {
  const [users, setUsers] = useState<User[]>(initial)
  
  const findUser = (username: string) => {
    const result = users.find((user) => user.username === username)
    if(!result) return null
    return result
  }
  return (
    <usersContext.Provider value={{ users, findUser }}>
    {children}
    </usersContext.Provider>
  )
}

export const useUsers = () => {
  return useContext(usersContext) as UsersContext
}
 
export default UsersProvider
