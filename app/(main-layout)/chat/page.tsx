import ChatIlustration from '@/components/ChatIlustration'
import PersonChatting from '@/components/ilustrations/PersonChatting'

const page = () => {
  return (
    <section className='w-full overflow-hidden bg-white dark:bg-dark-semiDark h-full p-3 sm:block hidden rounded-2xl'>
        <div className="w-full h-full flexCenter bg-light dark:bg-dark-dark rounded-2xl">
        <ChatIlustration size={506} />
        </div>
    </section>
  )
}

export default page
