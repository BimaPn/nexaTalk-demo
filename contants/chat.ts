export const chatLists = [
  {
    name: "Jacob Owens",
    username: 'jacob_owens',
    avatar: '/images/users/jacob_owens.jpg',
    createdAt: new Date().toLocaleString(),
    message: "Thanks",
    isOnline:true,
  },
  {
    name: "John Henry",
    username: 'john_henry',
    avatar: '/images/users/john.jpg',
    createdAt: "2024-05-02T10:15:04",
    message: "ok bro",
    isOnline:false,
  },
  {
    name: "Bima PN",
    username: 'bimapn',
    avatar: '/images/users/bima_pn.jpg',
    createdAt: "2024-04-29T14:01:04",
    message: "anita max wynn 💅",
    isOnline:false,
  },
  {
    name: "Naura Monroe",
    username: 'nauramonroe',
    avatar: '/images/users/naura_monroe.jpg',
    createdAt: "2024-04-25T21:31:04",
    message: "Hi",
    isOnline:false,
  },
]

export const messages: UserMessage[] = [
  {
  id: "1",
  createdAt: "2024-05-03T10:13:00",
  message: "Hey look",
  sender: "jacob_owens",
  receiver: "adonis"
  },
  {
  id: "2",
  createdAt: "2024-05-03T10:13:01",
  media: [
    {
      type: "image",
      src: "/images/message/nature1.jpg"
    },
    {
      type: "image",
      src: "/images/message/nature2.jpg"
    },
    {
      type: "image",
      src: "/images/message/nature3.jpg"
    },
  ],
  sender: "jacob_owens",
  receiver: "adonis"
  },
  {
  id: "3",
  createdAt: "2024-05-03T10:13:15",
  message: "It's very beautiful !",
  sender: "adonis",
  receiver: "jacob_owens"
  },
  {
  id: "4",
  createdAt: "2024-05-03T10:13:18",
  message: "I have another one",
  sender: "jacob_owens",
  receiver: "adonis"
  },
  {
  id: "5",
  createdAt: "2024-05-03T10:13:18",
  media: [
    {
      type: "image",
      src: "/images/message/nature4.jpg"
    }
  ],
  sender: "jacob_owens",
  receiver: "adonis"
  },
  {
  id: "6",
  createdAt: "2024-05-03T10:14:30",
  message: "Wow, keep it up bro.",
  sender: "adonis",
  receiver: "jacob_owens"
  },
  {
  id: "7",
  createdAt: new Date().toLocaleString(),
  message: "Thanks",
  sender: "jacob_owens",
  receiver: "adonis"
  },
  {
  id: "8",
  createdAt: "2024-05-02T10:14:30",
  message: "bro i think Alisa is falling love with u",
  sender: "adonis",
  receiver: "john_henry"
  },
  {
  id: "9",
  createdAt: "2024-05-02T10:14:33",
  media: [
    {
      type: "video",
      src: "/videos/reaction.mp4"
    }
  ],
  sender: "john_henry",
  receiver: "adonis"
  },
  {
  id: "10",
  createdAt: "2024-05-02T10:14:33",
  message: "Fr ?",
  sender: "john_henry",
  receiver: "adonis"
  },
  {
  id: "11",
  createdAt: "2024-05-02T10:14:33",
  message: "Fr bro, when I ask who is her crush she said it's u.",
  sender: "adonis",
  receiver: "john_henry"
  },
  {
  id: "12",
  createdAt: "2024-05-02T10:15:01",
  media: [
    {
      type: "video",
      src: "/videos/rizz.mp4"
    }
  ],
  sender: "john_henry",
  receiver: "adonis"
  },
  {
  id: "13",
  createdAt: "2024-05-02T10:15:02",
  message: "what a moment, I like her too tbh",
  sender: "john_henry",
  receiver: "adonis"
  },
  {
  id: "14",
  createdAt: "2024-05-02T10:15:04",
  message: "so go for it bro...",
  sender: "adonis",
  receiver: "john_henry"
  },
  {
  id: "15",
  createdAt: "2024-05-02T10:15:04",
  message: "ok bro",
  sender: "john_henry",
  receiver: "adonis"
  },
  {
  id: "16",
  createdAt: "2024-04-28T13:01:04",
  media: [
    {
      type: "video",
      src: "/videos/drake.mp4"
    }
  ],
  sender: "bimapn",
  receiver: "adonis"
  },
  {
  id: "17",
  createdAt: "2024-04-29T14:01:04",
  message: "what the....",
  sender: "adonis",
  receiver: "bimapn"
  },
  {
  id: "18",
  createdAt: "2024-04-29T14:01:04",
  message: "anita max wynn 💅",
  sender: "adonis",
  receiver: "bimapn"
  },
  {
  id: "19",
  createdAt: "2024-04-25T21:01:04",
  message: "Hi !",
  sender: 'nauramonroe',
  receiver: "adonis"
  },
  {
  id: "20",
  createdAt: "2024-04-25T21:31:04",
  message: "Hi",
  sender: "adonis",
  receiver: 'nauramonroe'
  },
]
