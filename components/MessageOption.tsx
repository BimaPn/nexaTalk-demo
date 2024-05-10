import { HiOutlineDotsVertical } from "react-icons/hi"
import Dropdown from "./ui/Dropdown"
import { IoMdTrash } from "react-icons/io"

const MessageOption = ({messageId, onDelete}:{messageId:string, onDelete: () => void}) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <HiOutlineDotsVertical />
      </Dropdown.Trigger> 
      <Dropdown.Content  className="right-4 !-top-3 w-28 text-black dark:text-white z-[5000]">
       <div className="bg-white dark:bg-dark-netral flex flex-col shadow rounded-lg py-1 px-1 font-medium text-[13px]">
          <button onClick={() => onDelete()} className="w-full flex items-center gap-[2px] px-1 py-1 hover:bg-light dark:hover:bg-dark-semiLight rounded-lg cursor-pointer">
            <IoMdTrash className="text-[19px]" />
            <span className="font-medium">Delete</span>
          </button>
       </div>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default MessageOption
