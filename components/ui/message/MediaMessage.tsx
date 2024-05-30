"use client"
import MessageOption from "@/components/MessageOption"
import { MediaViewerProvider, mediaViewerContext } from "@/components/providers/MediaViewerProvider"
import { getVideoThumbnail } from "@/helpers"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { FaPlay } from "react-icons/fa6"

const MediaMessage = ({
  id,
  media,
  isCurrentUser,
  createdAt,
  onDelete
}:{
  id: string, 
  media:Media[],
  isCurrentUser:boolean,
  createdAt:string,
  onDelete: () => void
}) => {
  return (
    <div className={`w-full flex flex-col group ${isCurrentUser ? "items-end":"items-start"}`}>
      <div className={`w-[60%] sm:w-56 md:w-72 flex flex-col ${isCurrentUser ? "items-start" : "items-end"} gap-[6px]`}>
        <div className="w-full relative">
        {isCurrentUser && (
          <div className="absolute top-1 -left-5 block sm:hidden sm:group-hover:block">
            <MessageOption messageId={id} onDelete={() => onDelete()} />
          </div>    
        )}
        <MediaLayout media={media} />
        </div>
        <span className="text-[11px] text-semiDark dark:text-slate-400">{createdAt}</span>
      </div>
    </div>
  )
}

const MediaLayout = ({media}:{media:Media[]}) => {
  const { setMedia } = useContext(mediaViewerContext) as MediaViewerProvider;

  const showMediaViewer = (e:React.MouseEvent<HTMLButtonElement>,media:Media) => {
    e.preventDefault();
    setMedia(media);
  }
   return (
    <div className={`w-full flex
    ${media.length > 1 && "grid grid-rows-2 grid-flow-col gap-[6px] aspect-square"}`}
    >
      {media.map((content, index) => (
        <button
        key={index}
        className={
          `${(media.length === 2) && "row-span-2"}
           ${(media.length === 3 && index == 2) && "row-span-2"}
           relative overflow-hidden rounded-lg
          `}
        onClick={(e) => showMediaViewer(e, content)}
        >
          {content.type === "video" && (
            <VideoThumbnail single={media.length === 1} url={content.src} />
          )}
          {content.type === "image" && (
            <MediaView single={media.length === 1} url={content.src} />
          )}
        </button>
      ))}
    </div>  
  )
}

const MediaView = ({ single, url }:{ single:boolean, url:string }) => {
  return single ? (
    <Image 
    src={url}
    alt={url}
    width={400}
    height={400}
    loading="lazy"
    className="w-full"
    />
  ) : (
    <Image 
    src={url}
    alt={url}
    fill
    loading="lazy"
    className="object-cover"
    />
)
}

const VideoThumbnail = ({ url, single }:{ url:string, single:boolean }) => {
  const [ thumbnail, setThumbnail ] = useState("");

  useEffect(() => {
    getVideoThumbnail(url, setThumbnail);
  },[]);
  return thumbnail && (
    <>
      <MediaView single={single} url={thumbnail} />  
      <div className="w-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square bg-black/75 rounded-full flexCenter">
        <FaPlay className="text-xl text-white -mr-1" />
      </div>
    </>
  )
}





export default MediaMessage
