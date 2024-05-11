"use client"
import { useContext } from "react"
import Modal, { Body, CloseButton, Content, Header, ModalProvider, Trigger, modalContext } from "./ui/Modal"
import { IoMdClose } from "react-icons/io"
import { useMessages } from "./providers/MessageProvider"
import RoundedImage from "./ui/RoundedImage"
import { MediaViewerProvider, mediaViewerContext } from "./providers/MediaViewerProvider"
import VideoThumbnail from "./ui/VideoThumbnail"

const MediaDetail = ({children, username, className}:{children: React.ReactNode, username: string, className?: string}) => {
  return (
    <Modal>
      <ModalContent username={username} className={className}> 
        {children}
      </ModalContent>
    </Modal>
  )
}

const ModalContent = ({children, username, className}:{children: React.ReactNode, username: string, className?: string}) => {
  const { showModal } = useContext(modalContext) as ModalProvider
  return (
    <> 
      <Trigger className={className}>
        {children}
      </Trigger>
      {showModal && (
        <Main username={username} />
      )}
    </> 
  )
}

const Main = ({username}:{username: string}) => {
  const { getUserMedia } = useMessages()
  const { setMedia } = useContext(mediaViewerContext) as MediaViewerProvider;

  const showMediaViewer = (e:React.MouseEvent<HTMLButtonElement>,media:Media) => {
    e.preventDefault();
    setMedia(media);
  }
  return (
    <Content width={450}> 
      <Header> 
        <ModalHeader />
      </Header>
      <Body> 
        <div className="w-full grid grid-cols-4 gap-2 px-4">
          {getUserMedia(username).map((message) => {
            return message.media!.map((media, index) => (
              <button
              key={index}
              className={`w-full relative overflow-hidden rounded-lg`}
              onClick={(e) => showMediaViewer(e, media)}
              >
                {media.type === "video" && (
                  <VideoThumbnail url={media.src} />
                )}
                {media.type === "image" && (
                  <RoundedImage 
                  src={media.src}
                  className={`!w-full !rounded-xl`}
                  alt="video"
                  />
                )}
              </button>
            ))
          })}
        </div> 
      </Body>
    </Content>
  )
}

const ModalHeader = () => {
  return (
    <div className="grid grid-cols-3 px-4 py-4">
      <div>
        <CloseButton className="w-10 aspect-square flexCenter">
          <IoMdClose className="text-[22px]" />
        </CloseButton> 
      </div>
      <span className="w-full block flexCenter font-medium">Media</span>
      <div></div>
    </div>
    )
}

export default MediaDetail