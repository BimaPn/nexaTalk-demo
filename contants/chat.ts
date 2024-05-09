export const chatLists = [
  {
    username: "bimapn",
    avatar: "/images/users/bima_pn.jpg",
    name: "Bima PN",
    message: "Good bro, u man ?",
    createdAt: "2024-05-03T11:15:00",
    isOnline:true,
  }
]

export const messages: UserMessage[] = [
  {
  id: "1",
  createdAt: "2024-05-02T11:10:00",
  message : "Sup bro ?", 
  sender: "adonis",
  receiver: "bimapn" 
  },
  {
  id: "2",
  createdAt: "2024-05-03T11:10:00",
  message : "bro ?", 
  sender: "adonis",
  receiver: "bimapn" 
  },
  {
  id: "3",
  createdAt: new Date().toLocaleString(),
  message : "Good bro, u man ?", 
  sender: "bimapn",
  receiver: "adonis"
  },
]
