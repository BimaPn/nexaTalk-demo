"use client"
import { stories as initial } from "@/contants/story";
import { authUser } from "@/contants/users";
import { createContext, useContext, useState } from "react"

export const storiesContext = createContext<StoriesContext | null>(null);

const StoriesProvider = ({children}:{children:React.ReactNode}) => {
  const [stories, setStories] = useState<StoryViewProperties[]>(initial);

  const [isContentLoaded, setIsContentLoaded] = useState<boolean>(false);
  
  const addStoryItem = (story:StoryViewProperties) => {
      let index = 0
      const isExit = stories.find((item, i) => {
        index = i
        return item.username === story.username
      })
      if(!isExit) {
        setStories((prev) => [...prev, story])
        return;
      }
      const result = [...stories]
      result[index].contents.push(story.contents[0])
      setStories(result)
  }
  const getUserStory = () => {
    const result = stories.find((story) => story.username === authUser.username)
    if(!result) {
      return null
    }
    return result
  }

  const updateLastSeen = (username: string, position: number) => {
    setStories((prev) => {
      return prev.map((story) => {
        if(story.username === username && story.position < position) {
          story.position = position 
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
      updateLastSeen,
      getUserStory,
      addStoryItem
      }}>
    {children}
    </storiesContext.Provider>
  )
}

export const useStories = () => {
  return useContext(storiesContext) as StoriesContext
}

export default StoriesProvider 
