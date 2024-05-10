interface User {
  name: string
  username: string
  email: string
  bio: string
  avatar: string
  isOnline: boolean
  joinedAt: string
  friends?: Friend[]
}

type UserItem = {
  name:string
  username:string
  bio:string
  avatar:string
}

type Friend = {
  type: "accepted" | "requested" 
  username: string
}

type FriendPreview = {
  count: number
  avatars: string[] | null
}

type FriendStatus = null | "accepted" | "requested"

type ProfileEdit = {
  name:string,
  bio:string,
  avatar:string | null
}
