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

type Friend = {
  type: "accepted" | "requested" 
  username: string
}

type ProfileEdit = {
  name:string,
  bio:string,
  avatar:string | null
}
