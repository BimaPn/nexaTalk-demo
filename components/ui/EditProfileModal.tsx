"use client"
import { BiSolidEdit } from "react-icons/bi"
import Modal, {Trigger, Content, Header, Body, Footer, CloseButton, modalContext, ModalProvider} from "./Modal"
import { useContext, useEffect, useState } from "react"
import PrimaryButton from "./form/PrimaryButton"
import { IoMdClose } from "react-icons/io"
import AvatarInput from "./form/AvatarInput"
import TextInput from "./form/TextInput"
import InputLabel from "./form/InputLabel"
import TextArea from "./form/TextArea"
import { useAuth } from "../providers/AuthProvider"
import { useAlert } from "../AlertMessage"
import useConfirm from "./Confirm"

const EditProfileModal = () => {
  return (
    <Modal>
      <Trigger 
      className="min-w-[34px] aspect-square flexCenter bg-blue-200 text-blue-600 dark:bg-dark-netral rounded-lg dark:text-white hover:text-black">
        <BiSolidEdit className="text-[19px]" />
      </Trigger> 
      <FormEditProfile/>
    </Modal>
  )
}

const FormEditProfile = () => {
  const { toggleModal } = useContext(modalContext) as ModalProvider;
  const { auth, updateAuth } = useAuth()
  const { setAlert } = useAlert()
  const [ConfirmDialog, confirm] = useConfirm({
    label: "Are you sure you want to quit ?"
  })
  const [ formData, setFormData ] = useState<ProfileEdit>({
    name:auth.name,
    bio:auth.bio,
    avatar:auth.avatar
  });
  const [ disabledButton, setDisabledButton ] = useState<boolean>(true);

  useEffect(() => {
    if(formData.name !== auth.name || formData.avatar !== null || formData.bio !== auth.bio) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  },[formData]);

  const formSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    updateAuth(formData)
    setAlert({
       success: true,
       message: "Profile Updated."
    }) 
    toggleModal()
    setFormData({name:auth.name,bio:auth.bio,avatar:null})
  }
  const closeForm = async () => {
    if(disabledButton) {
      toggleModal();
      return;
    }
    const isTrue = await confirm()
    if(isTrue) {
      setFormData({name:auth.name,bio:auth.bio,avatar:null});
      toggleModal();
    }
  }
  return (
    <form onSubmit={formSubmit}>
      <Content
      width={472} 
      onClose={() => closeForm()} className="overflow-hidden"
      >
        <Header>
          <ModalHeader onClose={() => closeForm()}/> 
        </Header>
        <Body>
          <div className="flex flex-col gap-4 mt-3 mb-7">
            <AvatarInput
            defaultAvatar={auth.avatar}
            onChange={(file) => setFormData({...formData,avatar:file})}
            />
          </div>

          <div className="px-5 flex flex-col gap-4">
            <div className="relative">
              <TextInput
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name:e.target.value})}
              required
              />
              <InputLabel forInput="name" value="Name" />
            </div>
            <div className="relative opacity-50">
              <TextInput
              id="username"
              value={auth.username}
              readOnly
              className="text-gray-500 focus:!outline-0"
              />
              <InputLabel forInput="username" value="username"/>
            </div>
            <div className="relative opacity-50">
              <TextInput
              id="email"
              value={auth.email}
              readOnly
              className="text-gray-500 focus:!outline-0"
              />
              <InputLabel forInput="email" value="Email"/>
            </div>
            <div className="relative">
              <TextArea 
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="!border-2"
              required
              />
              <InputLabel forInput="bio" value="Bio" textarea />
            </div>
          </div>
        </Body>
        <Footer className="px-4 pt-1 pb-4">
          <PrimaryButton disabled={disabledButton} type="submit" className="!w-fit !rounded-lg !text-sm">
            Edit 
          </PrimaryButton>
        </Footer>
      </Content>
      <ConfirmDialog />
    </form>
  )
}

const ModalHeader = ({onClose}:{onClose:()=>void}) => {
  return (
    <div className="grid grid-cols-3 px-2 py-[6px]">
      <div>
        <button type="button" onClick={() => onClose()} className="w-10 aspect-square flexCenter">
          <IoMdClose className="text-[22px]" />
        </button> 
      </div>
      <span className="w-full block flexCenter font-medium">Edit Profile</span>
      <div></div>
    </div>
    )
}

export default EditProfileModal
