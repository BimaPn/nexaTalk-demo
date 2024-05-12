"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import RoundedImage from "./ui/RoundedImage"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import Image from "next/image"
import { IoClose } from "react-icons/io5"
import ReactPlayer from "react-player/lazy"
import { TimeoutSlider } from "@/helpers"
import ProgressBar from "./ProgressBar"
import LoadingSpinner from "./ui/LoadingSpinner"
import { dateToTime } from "@/lib/converter"
import ExpandedText from "./ExpandedText"
import { useStories } from "./providers/StoriesProvider"

export const storyViewerContext = createContext<StoryViewer|null>(null);

const StoryViewer = ({children, onClose}:{children:React.ReactNode, onClose:(userId:string, hasSeen:boolean) => void}) => {
  const [storyViewProperties, setStoryViewProperties] = useState<StoryViewProperties|null>(null);
  const [ispaused, setIspaused] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(-1);

  const closeViewer = () => {
    setStoryViewProperties(null);
  }
  return (
    <storyViewerContext.Provider value={{ setStoryViewProperties, ispaused, setIspaused, duration, setDuration }}>
      {children}
      {storyViewProperties && (
        <Contents 
        storyViewProperties={storyViewProperties} 
        onClose={closeViewer}/>
      )}
    </storyViewerContext.Provider>
  )
}

const Contents = ({onClose, storyViewProperties}:{onClose:()=>void, storyViewProperties:StoryViewProperties}) => {
  const { ispaused, setIspaused, duration, setDuration } = useContext(storyViewerContext) as StoryViewer;
  const [current, setCurrent] = useState<number>(storyViewProperties.position);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [Timer, setTimer] = useState<TimeoutSlider | null>(null);

  useEffect(()=>{
    if(current >= storyViewProperties.contents.length) {
      clearTimer();
      onClose();
      return;
    }
    if(!Timer && duration != -1) {
      setTimer(new TimeoutSlider(() => {
        clearTimer();
        nextButtonRef.current?.click();
      },duration*1000));  
    }
    if(Timer) {
      if(!ispaused) {
        Timer.start();
      }else {
        Timer.pause();
      } 
    }
    },[duration, current, ispaused, Timer]);

  useEffect(() => {
    if(duration == -1) {
      setIspaused(true);
    }else {
      setIspaused(false);
    }
  },[duration]);

  const clearTimer = () => {
    if(!Timer) return;
    setDuration(-1);
    Timer.clear();
    setTimer(null);
  }
  const onNext = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if(current < storyViewProperties.contents.length-1) {
      clearTimer();
      setCurrent((prev)=>current+1);
    }else {
      onClose();
    }
  }
  const onPrev = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if(current > 0) {
      clearTimer();
      setCurrent((prev)=>current-1);
    }else {
      onClose();
    }
  }
  const closePage = () => {
    clearTimer();
    onClose();
  }
  return (
    <div className="fixed inset-0 flex flex-col items-center bg-black z-[6000]">
      <ContentHeader 
      length={storyViewProperties.contents.length}
      current={current}
      avatar={storyViewProperties.avatar}
      name={storyViewProperties.name}
      createdAt={storyViewProperties.contents[current == -1 ? 0 : current].createdAt}
      ispaused={ispaused}
      duration={duration}
      onClose={() => closePage()}
      />
      <ContentBody
      username={storyViewProperties.username}
      mediaUrl={storyViewProperties.contents[current == -1 ? 0 : current].media}
      current={current}>
       <div className="hidden ss:block text-white">
        <button 
        onClick={onPrev} 
        className="w-10 absolute left-2 aspect-square rounded-full bg-black/25 flexCenter">
          <IoIosArrowBack className="text-[22px]" />
        </button>   
        <button
        ref={nextButtonRef} 
        onClick={onNext}
        className="w-10 absolute right-2 aspect-square rounded-full bg-black/25 flexCenter">
          <IoIosArrowForward className="text-[22px]" />
        </button>   
       </div>
      </ContentBody> 
      
      <ContentFooter caption={storyViewProperties.contents[current == -1 ? 0 : current].caption} />
    </div>
  )
}

const ContentFooter = ({caption}:{caption?:string}) => {
  return caption && (
  <div className="absolute bottom-0  min-h-[12%] max-h-[40%] bg-black/50 w-[512px] mt-2 ss:mt-4 z-[1] flex justify-center py-2 overflow-y-auto">
    <ExpandedText text={caption} maxLength={130} className="text-center !text-white" />
  </div> 
  )
}

type ContentHeaderT = {
  length: number,
  current: number,
  avatar: string,
  name: string,
  createdAt: string,
  ispaused: boolean,
  duration: number,
  onClose: ()=>void
}
const ContentHeader = ({length, current, avatar, name, createdAt, ispaused, duration, onClose}:ContentHeaderT) => {
  return (
    <div className="absolute top-0 w-full ss:w-[512px] mt-2 ss:mt-4 z-[1]"> 
      <div className="w-full flexCenter gap-2 px-3 ss:px-0">
        {Array.from({ length }).map((_, index) => (
          <div key={index} className={`h-[3px] ${(index <= current-1) ? "bg-primary":"bg-slate-300"}`} style={{ flexBasis:`${100/length}%` }}>
            {(index == current && duration != -1 ) && (
            <ProgressBar duration={duration} ispaused={ispaused ? "true":"false"} className="bg-primary" />
            )}
          </div>
        ))}
      </div>
      <div className="flexBetween gap-2 px-3 ss:px-0 py-3">
        <div className="flex items-center gap-[10px]">
          <RoundedImage src={avatar} alt="heading" className="!w-[44px]" />
          <div className="flex flex-col text-white">
            <span className="font-medium">{name}</span>
            <span className="text-[13px]">{dateToTime(createdAt)}</span>
          </div>
        </div>
        <button onClick={() => onClose()} className="px-1 mx-3 ss:-mr-1 ss:-mt-1 aspect-square">
          <IoClose className="text-2xl text-white" />
        </button>
      </div>
    </div>
  )
}

type ContentBodyT = {
  children: React.ReactNode, 
  mediaUrl: string,
  current: number,
  username: string
  }
const ContentBody = ({children, mediaUrl, current, username}:ContentBodyT) => {
  return (
    <div className="max-w-[512px] h-full flexCenter relative z-[0]">
      <Media mediaUrl={mediaUrl} current={current} username={username}/>
      {children}
    </div>
  )
}

const Media = ({mediaUrl, current, username}:{mediaUrl:string,current:number,username:string}) => {
  const {ispaused, setIspaused, duration, setDuration} = useContext(storyViewerContext) as StoryViewer;
  const { updateLastSeen } = useStories()
  const updateSeenStory = async () => {
    updateLastSeen(username, current) 
  }
  const videoLoaded = async (durr:number) => {
    await updateSeenStory();
    const duration = Math.floor(durr);
    if(duration > 30) {
      setDuration(30);
    }else {
      setDuration(duration);
    }
  }
  const imageLoaded = async () => {
    await updateSeenStory()
    setDuration(3);
  }
  return (
    <>
    {ispaused && (
      <div className="absolute">
        <LoadingSpinner className="!w-12 !h-12" />
      </div>
    )}
    {mediaUrl.includes(".mp4") ? (
       <ReactPlayer
       url={mediaUrl}
       className="max-w-full w-auto h-fit"
       playing={!ispaused}
       onDuration={videoLoaded}
       />
    ) : (
      <div className="max-w-full w-auto h-fit">
        <Image
        src={mediaUrl}
        width={800} height={800}
        alt="media"
        onLoad={() => imageLoaded()} />
      </div>
    )}
    </>
  )
}
export default StoryViewer
