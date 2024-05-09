interface User {
  name: string
  username: string
  email: string
  bio: string
  avatar: string
  isOnline: boolean
  joinedAt: string
}

type ProfileEdit = {
  name:string,
  bio:string,
  avatar:string | null
}
