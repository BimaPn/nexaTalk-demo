"use client"
import ProfileInfo from '@/components/menu/ProfileInfo'
import ChatSection from '@/components/chat/ChatSection'
import MessageProvider from '@/components/providers/MessageProvider'
import { users } from '@/contants/users'
import { useState } from 'react'
import { useUsers } from '@/components/providers/UsersProvider'

const page = ({params}:{params : {username:string}}) => {
  const { findUser } = useUsers()
  const [user, setUser] = useState(findUser(params.username))
  return user && (
  <div className="max-w-dvw w-dvw h-full flex z-0 gap-4">
    <ChatSection
    userTarget={user} 
    />
    <ProfileInfo userTarget={user} />
  </div>
  )
}

export default page
