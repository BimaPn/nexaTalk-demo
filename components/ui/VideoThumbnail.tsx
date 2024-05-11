"use client"
import { getVideoThumbnail } from "@/helpers";
import { useEffect, useState } from "react";
import RoundedImage from "./RoundedImage";
import { FaPlay } from "react-icons/fa6";

export const VideoThumbnail = ({ url, className }:{ url:string, className?: string }) => {
  const [ thumbnail, setThumbnail ] = useState("");

  useEffect(() => {
    getVideoThumbnail(url, setThumbnail);
  },[]);
  return thumbnail && (
    <div className="w-full relative">
      <RoundedImage src={thumbnail} className={`!w-full !rounded-xl ${className}`} alt="video" />
      <div className="w-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square bg-black/75 rounded-full flexCenter">
        <FaPlay className="text-xl text-white -mr-1" />
      </div>
    </div>
  )
}

export default VideoThumbnail
