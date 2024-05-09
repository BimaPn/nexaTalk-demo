import { useRouter } from "next/navigation"
import { ButtonHTMLAttributes } from "react"

const LogoutButton = ({className,children,...props}:ButtonHTMLAttributes<HTMLButtonElement> & {children:React.ReactNode,className?:string}) => {
  const router = useRouter()
  const logout = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
  }
  return (
     <button 
     className={`w-full ${className}`}
     onClick={logout}
      {...props}
      >{children}</button>
  )
}

export default LogoutButton


