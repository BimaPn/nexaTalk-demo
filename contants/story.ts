const today = new Date().toLocaleString()

export const stories = [
  {
    name: "Jacob Owens",
    username: 'jacob_owens',
    avatar: '/images/users/jacob_owens.jpg',
    contents: [
      {
        media: {
          type: "image",
          src: "/images/message/nature1.jpg"
        },
        caption: "Best work of mine",
        createdAt: today
      },
      {
        media: {
          type: "image",
          src: "/images/message/nature3.jpg"
        },
        caption: "Another one..",
        createdAt: today
      },
    ],
    position: 0
  },
  {
    name: "Bima PN",
    username: 'bimapn',
    avatar: '/images/users/bima_pn.jpg',
    contents: [
      {
        media: {
          type: "video",
          src: "/videos/drake.mp4"
        },
        caption: "anita max wynn 💅",
        createdAt: today
      },
      {
        media: {
          type: "image",
          src: "/images/cole.jpg"
        },
        caption: "he's the best 😏",
        createdAt: today
      },
    ],
    position: 0
  },
  {
    name: "Clara Ashley",
    username: 'clara',
    avatar: '/images/users/clara.jpg',
    contents: [
      {
        media: {
          type: "image",
          src: '/images/users/clara.jpg'
        },
        caption: "new profile picture 🥰",
        createdAt: today
      },
      {
        media: {
          type: "image",
          src: "/images/nature5.jpg"
        },
        caption: "I wanna go there fr 😭",
        createdAt: today
      },
    ],
    position: 0
  }
]

