"use client"
import { stories as initial } from "@/contants/story";
import { authUser } from "@/contants/users";
import { createContext, useContext, useState } from "react"

export const storiesContext = createContext<StoriesContext | null>(null);

const StoriesProvider = ({children}:{children:React.ReactNode}) => {
  const [stories, setStories] = useState<StoryViewProperties[]>(initial);
  const [userStory, setUserStory] = useState<StoryItem>({
    avatar: authUser.avatar,
    name: "My story",
    createdAt: "No update",
    hasSeen: true 
  });
  const [isContentLoaded, setIsContentLoaded] = useState<boolean>(false);
  
  // const addStoryItem = (story:StoryItem) => {
  //   setStories((prev) => {
  //     const filtered = prev.filter((item) => item._id !== story._id);
  //     return [story, ...filtered];
  //   })
  // }
  const updateUserStory = (createdAt:string) => {
    setUserStory({...userStory, createdAt});
  }

  const updateLastSeen = (username: string, position: number) => {
    setStories((prev) => {
      return prev.map((story) => {
        if(story.username === username && story.position < position) {
          if(position === (story.contents.length - 1)) {
            story.position =  0 
          }else {
            story.position = position 
          }
        }
        return story
      })
    })

  }
  return (
    <storiesContext.Provider value={{
      stories,
      isContentLoaded,
      setIsContentLoaded,
      userStory, 
      updateUserStory,
      updateLastSeen
      }}>
    {children}
    </storiesContext.Provider>
  )
}

export const useStories = () => {
  return useContext(storiesContext) as StoriesContext
}

export default StoriesProvider 
