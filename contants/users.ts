export const authUser: User = {
  name: "Adonis",
  username: 'adonis',
  email: 'adonis@gmail.com',
  bio: 'I dont know',
  avatar: '/images/users/auth.jpg',
  isOnline: true ,
  joinedAt: "11-10-2024",
  friends: [
    {
      type: "accepted",
      username: "bimapn"
    },
    {
      type: "accepted",
      username: "clara"
    },
    {
      type: "accepted",
      username: "john_henry"
    },
  ]
}

export const users: User[] = [
  {
    name: "Bima PN",
    username: 'bimapn',
    email: 'bimaptr12@gmail.com',
    bio: 'I dont know too.',
    avatar: '/images/users/bima_pn.jpg',
    isOnline: true,
    joinedAt: "12-12-2022",
  },
  {
    name: "Clara Ashley",
    username: 'clara',
    email: 'clara33@gmail.com',
    bio: 'I dont know too.',
    avatar: '/images/users/clara.jpg',
    isOnline: false,
    joinedAt: "08-11-2023",
  },
  {
    name: "John Henry",
    username: 'john_henry',
    email: 'john_henry@gmail.com',
    bio: 'I dont know too.',
    avatar: '/images/users/john.jpg',
    isOnline: false,
    joinedAt: "12-10-2024",
  },
  {
    name: "Jacob Owens",
    username: 'jacob_owens',
    email: 'owens_99@gmail.com',
    bio: 'Capturing moments through my lens 📸 | Chasing light, one click at a time ✨',
    avatar: '/images/users/jacob_owens.jpg',
    isOnline: false,
    joinedAt: "11-11-2024",
  },
  {
    name: "Naura Monroe",
    username: 'nauramonroe',
    email: 'naura@gmail.com',
    bio: 'Passionate about creativity and self-expression through art ✨',
    avatar: '/images/users/naura_monroe.jpg',
    isOnline: false,
    joinedAt: "07-09-2024",
  },
]
