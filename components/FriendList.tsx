"use client"
import { useContext } from "react"
import Modal, { Body, CloseButton, Content, Header, ModalProvider, Trigger, modalContext } from "./ui/Modal"
import { IoMdClose } from "react-icons/io"
import { useAuth } from "./providers/AuthProvider"
import { UserItem } from "./StartNewChat"

const FriendList = ({children, className}:{children: React.ReactNode, className?: string}) => {
  return (
    <Modal>
      <ModalContent className={className}> 
        {children}
      </ModalContent>
    </Modal>
  )
}

const ModalContent = ({children, className}:{children: React.ReactNode, className?: string}) => {
  const { showModal } = useContext(modalContext) as ModalProvider
  return (
    <> 
      <Trigger className={className}>
        {children}
      </Trigger>
      {showModal && (
        <Main />
      )}
    </> 
  )
}

const Main = () => {
  const { getAuthFriendList } = useAuth()
  return (
    <Content width={450}> 
      <Header> 
        <ModalHeader />
      </Header>
      <Body> 
        <div className="flex flex-col gap-2 px-2 py-1">
          {getAuthFriendList()?.map((user) => (
            <UserItem 
            key={user.username}
            username={user.username}
            name={user.name}
            avatar={user.avatar}
            bio={user.bio} 
            />
          ))}
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
      <span className="w-full block flexCenter font-medium">Friend List</span>
      <div></div>
    </div>
    )
}

export default FriendList
