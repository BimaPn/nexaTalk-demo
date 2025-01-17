"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import RoundedImage from "./ui/RoundedImage"
import { IoIosArrowBack, IoIosArrowForward, IoIosPause } from "react-icons/io"
import Image from "next/image"
import { IoClose, IoPlay } from "react-icons/io5"
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
    setDuration(-1)
    setIspaused(true)
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
  const [current, setCurrent] = useState<number>(storyViewProperties.position === (storyViewProperties.contents.length-1) ? 0 : storyViewProperties.position);
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
      media={storyViewProperties.contents[current == -1 ? 0 : current].media}
      current={current}>
       <div className="text-white">
        <button 
        onClick={onPrev} 
        className="w-[20%] ss:w-10 h-[80dvh] ss:h-fit absolute left-0 ss:left-2 top-20 ss:top-auto aspect-square rounded-full ss:bg-black/25 flexCenter z-[10]">
          <IoIosArrowBack className="text-[22px] hidden ss:block" />
        </button>   
        <button
        ref={nextButtonRef} 
        onClick={onNext}
        className="w-[20%] ss:w-10 h-[80dvh] ss:h-fit absolute right-0 ss:right-2 top-20 ss:top-auto aspect-square rounded-full ss:bg-black/25 flexCenter z-[10]">
          <IoIosArrowForward className="text-[22px] hidden ss:block" />
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

        <div className="flex items-center"> 
          <StoryControl />
          <button onClick={() => onClose()} className="px-1 mx-3 ss:-mr-1 ss:-mt-1 aspect-square">
            <IoClose className="text-2xl text-white" />
          </button>
        </div>

      </div>
    </div>
  )
}

type ContentBodyT = {
  children: React.ReactNode, 
  media: Media,
  current: number,
  username: string
  }
const ContentBody = ({children, media, current, username}:ContentBodyT) => {
  const { setIspaused } = useContext(storyViewerContext) as StoryViewer;
  return (
    <div onClick={() => setIspaused((prev:boolean) => !prev)} className="max-w-[512px] h-full flexCenter">
      <Media media={media} current={current} username={username}/>
      {children}
    </div>
  )
}

const Media = ({media, current, username}:{media:Media,current:number,username:string}) => {
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
    {media.type === "video" && (
       <ReactPlayer
       url={media.src}
       className="max-w-full w-auto h-fit !z-[0]"
       playing={!ispaused}
       onDuration={videoLoaded}
       />
    )}
    {media.type === "image" && (
      <div className="max-w-full w-auto h-fit">
        <Image
        src={media.src}
        width={800} height={800}
        alt="media"
        onLoad={() => imageLoaded()} />
      </div>
    )}
    </>
  )
}

const StoryControl = () => {
  const { ispaused, setIspaused } = useContext(storyViewerContext) as StoryViewer;
  return ( 
  <button className="text-white -mr-[2px]" onClick={() => setIspaused((prev:boolean) => !prev)}> 
    {!ispaused && <IoIosPause className="text-[22px]" />}
    {ispaused && <IoPlay className="text-[21px]" />}
  </button>
  )
}
export default StoryViewer
