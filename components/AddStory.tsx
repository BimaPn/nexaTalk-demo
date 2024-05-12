"use client"
import { TbCameraPlus } from "react-icons/tb"
import Modal, { Body, Content, Footer, Header, ModalProvider, Trigger, modalContext } from "./ui/Modal"
import { useContext, useEffect, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import ReactPlayer from "react-player/lazy"
import Image from "next/image"
import TextAreaExpand from "./ui/form/TextAreaExpand"
import { IoSend } from "react-icons/io5"
import { dateToTime } from "@/lib/converter"
import { useStories } from "./providers/StoriesProvider"
import { authUser } from "@/contants/users"

type MediaPreview = {
  type:string,
  url:string
}

const AddStory = ({children, className}:{children: React.ReactNode, className?: string}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ mediaPreview, setMediaPreview ] = useState<Media | null>(null);

  const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile = inputRef.current!.files![0];
    if (!selectedFile) return;
    const blob = URL.createObjectURL(selectedFile);
    if(selectedFile.type.startsWith("video")) {
      setMediaPreview({ type:"video", src:blob })
      return;
    }
    setMediaPreview({type:"image", src: blob});
  }
  const openFile = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      inputRef.current?.click()
  }
  const cleaningStates = () => {
    setMediaPreview(null);
  }
  return (
    <Modal>
      <input
      ref={inputRef}
      type="file" 
      accept=".jpg, .jpeg, .png, video/mp4"
      onChange={onInputChange} 
      className="hidden"
      />
        <button onClick={openFile} className={className}>
          {children}
        </button>
      <FormContent media={mediaPreview} onFinished={() => cleaningStates()}/> 
    </Modal>
  )
}

const FormContent = ({media, onFinished}:{media: Media|null, onFinished:()=>void}) => {
  const { showModal, toggleModal } = useContext(modalContext) as ModalProvider;
  const { addStoryItem } = useStories()
  const [caption, setCaption] = useState<string>("");

  useEffect(() => {
    if(media) {
      toggleModal();
    }
  },[media]);
  
  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newStory: StoryViewProperties = {
      username: authUser.username,
      name: authUser.name,
      avatar: authUser.avatar,
      contents: [
        {
          media: media as Media,
          caption: caption, 
          createdAt: new Date().toLocaleString()
        }
      ],
      position: 0 
    }
    addStoryItem(newStory)
    toggleModal();
    onFinished();
  }
  return (showModal && media) && (
    <form onSubmit={onSubmit}>
      <Content width={480} className="relative overflow-hidden">
        <Header className="absolute top-0 left-0 right-0">
          <div className="px-2 py-2">
            <button type="button" onClick={() => toggleModal()} className="w-8 aspect-square bg-dark/25 flexCenter rounded-full">
              <IoMdClose className="text-[22px] text-white" />
            </button> 
          </div>
        </Header>
        <Body className="flexCenter h-full">
          {media.type == "video" ? (
           <ReactPlayer url={media.src} className="max-w-full max-h-full" controls/>
          ) : (
            <Image src={media.src} alt="image preview" width={500} height={500}className="w-auto max-h-full block"/>
          )} 
        </Body>
        <Footer className="absolute bottom-0 left-0 right-0 flexCenter gap-3 px-3 pb-5 pt-16">
          <div className="w-[90%] max-h-[64px] overflow-auto rounded-full bg-light py-2 px-4 border dark:border-0 dark:bg-dark-netral">
            <TextAreaExpand
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="text-[15px] "
            rows={1}
            placeholder="Type a caption" />
          </div>  
        <button type="submit" className="w-10 flexCenter aspect-square rounded-full bg-white dark:bg-dark-netral dark:border-0 border">
          <IoSend className="text-[18px] text-primary -mr-[3px]"/>
        </button>
        </Footer>
      </Content>  
    </form>
  )
}

export default AddStory
