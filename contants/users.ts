export const authUser: User = {
  name: "Adonis",
  username: 'adonis',
  email: 'adonis@gmail.com',
  bio: 'I dont know',
  avatar: '/images/users/auth.jpg',
  isOnline: true ,
  joinedAt: "12-12-2022",
  friends: [
    {
      type: "accepted",
      username: "bimapn"
    },
    {
      type: "accepted",
      username: "clara"
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
    friends: [
      {
        type: "accepted",
        username: "adonis"
      },
    ]
  },
  {
    name: "Clara Ashley",
    username: 'clara',
    email: 'clara33@gmail.com',
    bio: 'I dont know too.',
    avatar: '/images/users/clara.jpg',
    isOnline: false,
    joinedAt: "12-12-2022",
    friends: [
      {
        type: "accepted",
        username: "adonis"
      },
    ]
  },
  {
    name: "John Henry",
    username: 'john_henry',
    email: 'john_henry@gmail.com',
    bio: 'I dont know too.',
    avatar: '/images/users/john.jpg',
    isOnline: false,
    joinedAt: "12-12-2022"
  },
]
