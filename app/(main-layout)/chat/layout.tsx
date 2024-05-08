import type { Metadata } from 'next'
import ChatListProvider from '@/components/providers/ChatListProvider'
import MainMenu from '@/components/menu/MainMenu'
import MenuProvider from '@/components/providers/MenuProvider'
import UserSessionProvider from '@/components/providers/UserSessionProvider'
import StoryListProvider from '@/components/providers/StoryListProvider'

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='flex sm:gap-4 h-screen p-0 overflow-hidden sm:px-4 sm:py-4'>
        <ChatListProvider>
          <MenuProvider>
            <StoryListProvider>
                <MainMenu/>
            </StoryListProvider>
          </MenuProvider>
          {children}
        </ChatListProvider>
    </section>
  )
}
