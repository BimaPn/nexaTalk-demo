interface Message {
  message : string
  sender: string
  receiver: string
  className ?:string
}

interface GeneralMessage {
  id : string
}
interface UserMessage extends Message, GeneralMessage {
  createdAt : Date 
}

interface GroupMessage extends Message,UserMessage {
  image : string;
  name : string;
}

interface MediaMessage extends GeneralMessage {
  media : string[]|File[],
  createdAt : string,
  isCurrentUser : boolean
}
