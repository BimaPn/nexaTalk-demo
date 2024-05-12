interface StoriesContext {
  stories: StoryViewProperties[],
  isContentLoaded: boolean,
  setIsContentLoaded: Dispatch<SetStateAction<boolean>>,
  updateLastSeen: (username: string, position: number) => void
  getUserStory: () => StoryViewProperties | null
  addStoryItem: (story:StoryViewProperties) => void
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
  media: Media,
  caption?: string
  createdAt: string
}
