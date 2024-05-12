import MenuLayout, { Navigation } from "@/layouts/MenuLayout"
import { useContext, useEffect } from "react"
import { MenuProvider, menuContext } from "../providers/MenuProvider"
import RoundedImage from "../ui/RoundedImage"
import { TbCameraPlus } from "react-icons/tb"
import AddStory from "../AddStory"
import StoryViewer, { storyViewerContext } from "../StoryViewer"
import StoryListSkeleton from "../skeletons/StoryListSkeleton"
import { dateToTime } from "@/lib/converter"
import { useStories } from "../providers/StoriesProvider"

const StoriesMenu = () => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <MenuLayout>
      <Navigation title="Stories" onClose={() => changeMenu("chatsMenu")}>
        <div className="flex justify-end">
          <AddStory /> 
        </div>
      </Navigation>

      <StoryViewer onClose={() => console.log("haha")}> 
        <StoryItemLayout />
      </StoryViewer>
    </MenuLayout>
  )
}

const StoryItemLayout = () => {
  const { stories, userStory, updateUserStory, isContentLoaded, setIsContentLoaded } = useStories()
  const { setStoryViewProperties } = useContext(storyViewerContext) as StoryViewer;

  useEffect(() => {
    setIsContentLoaded(true)
  },[])

  const viewContent = async (storyView: StoryViewProperties) => {
    setStoryViewProperties(storyView);
  }
  // const updateStoryItem = (id: string, hasSeen: boolean) => {
  //   setStories((prevStories: StoryItem[]) => {
  //     return prevStories.map((story) => {
  //       if(story._id == id) {
  //         story.hasSeen = hasSeen;
  //       }
  //       return story;
  //     });
  //   });
  // }
  return (
      <div className="px-2 mb-2">
        {!isContentLoaded ? <StoryListSkeleton /> : (
          <StoryItem
          avatar={userStory.avatar}
          name={userStory.name}
          createdAt={userStory.createdAt}
          hasSeen={true}
          disableButton={userStory.createdAt === "No update"}/>
        )}
        <div className="mt-1">
          <span className="inline-block text-black dark:text-white text-sm font-medium mx-2">Friends</span>
          <ul className="flex flex-col gap-[2px]">
            {!isContentLoaded && <StoryListSkeleton count={4} />}
            {(isContentLoaded && stories.length != 0) && 
              stories.map((item, index) => (
                <li key={index}>
                  <StoryItem 
                  avatar={item.avatar}
                  name={item.name}
                  createdAt={dateToTime(item.contents[item.contents.length-1].createdAt)}
                  hasSeen={(item.contents.length - 1) === item.position}
                  onClick={() => viewContent(item)}
                  />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
  )
}

const StoryItem = ({avatar, name, createdAt, hasSeen=false,disableButton=false, onClick}:StoryItem & {disableButton?:boolean, onClick?:()=>void}) => {
  const buttonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(disableButton || !onClick) return;
    onClick()
  }

  return (
    <button onClick={buttonClick} className="w-full flex items-center gap-[10px] px-2 py-2 rounded-xl hover:bg-light dark:hover:bg-dark-netral cursor-pointer">
      <div className={`w-fit p-[2px] rounded-full border-2 ${!hasSeen ? "border-primary":"border-gray-300"}`}>
        <RoundedImage src={avatar} alt="heading" className="!w-[42px]" />
      </div>
      <div className="w-full text-start flex flex-col">
        <span className="text-black dark:text-white font-medium">{name}</span>
        <span className="text-[13px] text-gray-500 dark:text-slate-400">{createdAt}</span>
      </div>
    </button>
  )
}

export const StoriesMenuTrigger = ({children, className}:{children?:React.ReactNode, className?:string}) => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <button onClick={() => changeMenu("storiesMenu")} className={`relative group ${className}`}>
      {children}
      <span className="hidden group-hover:block absolute -bottom-7 -left-8 bg-white dark:bg-dark-netral rounded px-[6px] py-[2px] shadow text-[11px]">Stories</span>
    </button>
  )
}

export default StoriesMenu
