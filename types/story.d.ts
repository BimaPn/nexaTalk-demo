interface StoriesContext {
  stories: StoryViewProperties[],
  userStory: StoryItem,
  updateUserStory: (createdAt:string)=>void,
  isContentLoaded: boolean,
  setIsContentLoaded: Dispatch<SetStateAction<boolean>>,
}
interface StoryItem {
  avatar: string,
  name: string,
  createdAt: string,
  hasSeen: boolean
}
interface StoryViewer {
  setStoryViewProperties: Dispatch<SetStateAction<StoryViewProperties>>,
  ispaused: boolean,
  setIspaused: Dispatch<SetStateAction<boolean>>,
  duration: number,
  setDuration: Dispatch<SetStateAction<number>>,
}
interface StoryViewProperties {
  username: string,
  name: string,
  avatar: string,
  contents: StoryContent[],
  position: number
}
interface StoryContent {
  id: string
  media: string,
  caption?: string
  createdAt: string
}
