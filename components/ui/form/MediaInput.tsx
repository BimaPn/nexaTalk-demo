"use client"
import { createContext, useContext, useRef } from "react"
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const mediaInputContext = createContext<MediaInputContext | null>(null);

const MediaInput = ({children, value, className, onChange}:MediaInput) => {

  //
  // const renderMedia = async (mediaFiles: File[]) => {
  //   const media = await Promise.all(
  //     mediaFiles.map(async (file) => {
  //       if (file.type === "video/mp4") {
  //
  //       console.log(URL.createObjectURL(file))
  //         return new Promise<string>((resolve) => {
  //           getLocalVideoThumbnail(file, (url) => {
  //             resolve(url);
  //           });
  //         });
  //       }
  //
  //       return URL.createObjectURL(file);
  //     })
  //   );
  //
  //   setMediaPreviews(media);
  // };

  const removeMedia = (index:number) => {
    onChange(value.filter(content => value.indexOf(content) !== index));
  }

  return (
    <mediaInputContext.Provider value={{value, onChange, removeMedia}}>
      <div className={className}>
        {children}
      </div>
    </mediaInputContext.Provider>
  )
}

export const Trigger = ({children,className}:{children:React.ReactNode,className?:string}) => {
  const { value,onChange } = useContext(mediaInputContext) as MediaInputContext;
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const media = e.target.files;
    if(!media) return;

    const result = await Promise.all(
      Array.from(media).map(async (file) => {

        const data: Media = {
          type: "image",
          src: URL.createObjectURL(file)
        }

        if (file.type === "video/mp4") {
          data.type = "video" 
        }

        return data 
      })
    );

    onChange([...value,...result]);
  }
  return (
    <button className={className} type="button" onClick={() => inputRef.current!.click()}>
      <input 
      type="file"
      className="hidden"
      multiple
      accept=".jpg, .jpeg, .png, video/mp4"
      onChange={onInputChange}
      ref={inputRef}/>
      {children}
    </button>
  )
}

export const Previews = ({className}:{className?:string}) => {
  const { value, removeMedia } = useContext(mediaInputContext) as MediaInputContext;
  return (
  <div className={`min-w-full overflow-x-auto ${value.length !== 0 && "pt-2"}`}>
    <div className={`flex items-center gap-3 ${className}`}>
      {value.map((content, index) => (
        <MediaPreview
          key={index} 
          media={content} 
          onRemove={() => removeMedia(index)} 
          className="overflow-hidden"
        />
      ))}
    </div>
  </div>
  )
}

const MediaPreview = ({media, onRemove, className}:{media: Media, onRemove:()=>void, className?:string}) => {
  const mediaRemove = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onRemove();
  }
 return (
  <div className={`relative ${className}`}>
    {media.type === "image" ? (
      <div className="relative h-fit aspect-square w-[60px] sm:w-20 md:w-36">
        <Image
        src={media.src}
        alt={media.type}
        fill
        className="object-cover rounded-xl"
        /> 
      </div>
      ):(
      <div className="flexCenter w-[60px] sm:w-20 md:w-36 aspect-square overflow-hidden rounded-xl bg-black">
         <video className="w-full h-fit" controls autoPlay muted>
         <source src={media.src} />
         </video>

      </div>
      )}
 
    <div className="absolute -top-4 -right-4 p-2" >
      <button
      onClick={mediaRemove}
      className="text-xl px-1 aspect-square rounded-full bg-white dark:bg-dark-semiDark border dark:border-0" >
        <IoClose/>
      </button>
    </div>
  </div>

 )
}

export default MediaInput

