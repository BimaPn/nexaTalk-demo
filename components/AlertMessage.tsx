"use client"
import { createContext, useContext, useState } from "react"
import { IoIosCheckmarkCircle } from "react-icons/io"
import { IoCloseCircleSharp } from "react-icons/io5"
import { AnimatePresence, motion } from "framer-motion"

const alertMessageContext = createContext<AlertMessageProvider | null>(null)

type AlertMessageProvider = {
  message: AlertMessageProps | null
  setAlert: (message: AlertMessageProps) => void
}

type AlertMessageProps = {
  success: boolean,
  message: string
}

const AlertMessage = ({children}:{children:React.ReactNode}) => {
  const [message, setMessage] = useState<AlertMessageProps | null>(null)

  const setAlert = (message: AlertMessageProps) => {
    setMessage(message)
    const timeout = setTimeout(() => {
      setMessage(null)
    }, 2000)

    return () => {
      clearTimeout(timeout);
    };
  }
  return (
    <alertMessageContext.Provider value={{ message, setAlert }}>
    {children}

    <AnimatePresence>
      {message && <Overlay message={message} />}
    </AnimatePresence>
    </alertMessageContext.Provider>
  )
}

const Overlay = ({message}:{message:AlertMessageProps}) => {
  return (
    <motion.div 
    initial={{ y: 1000 }} 
    animate={{ y: 0 }}
    exit={{ y: 1000 }}
    transition={{ duration: .5 }}
    className={`fixed bottom-6 sm:bottom-8 right-0 left-0 flexCenter text-white`}>
      <div className={`px-4 py-1 flexCenter gap-[6px] rounded-full ${message.success ? 'bg-blue-400' : 'bg-red-400'}`}>
        {message.success ? (
          <IoIosCheckmarkCircle className="text-[22px]" />
        ) : (
          <IoCloseCircleSharp className="text-[22px]" />
        )}
        <span className="font-semibold">{message.message}</span>
      </div>

    </motion.div>  
  )
}

export const useAlert = () => {
  return useContext(alertMessageContext) as AlertMessageProvider
}

export default AlertMessage
