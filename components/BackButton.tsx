"use client"
import { useRouter } from 'next/navigation'
import { PiArrowLeft } from 'react-icons/pi'

const BackButton = ({ className }:{  className?:string }) => {
  const router = useRouter()
  return (
    <button onClick={router.back} className={className}>
      <PiArrowLeft className="text-[23px]" />
    </button>
  )
}

export default BackButton
