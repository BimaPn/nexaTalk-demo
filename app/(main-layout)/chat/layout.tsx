import type { Metadata } from 'next'
import MainMenu from '@/components/menu/MainMenu'
import MenuProvider from '@/components/providers/MenuProvider'
import StoriesProvider from '@/components/providers/StoriesProvider'

export const metadata: Metadata = {
  title: 'NexaTalk',
  description: 'NexaTalk Application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='flex sm:gap-4 h-screen p-0 overflow-hidden sm:px-4 sm:py-4'>
      <MenuProvider>
          <StoriesProvider>
            <MainMenu/>
          </StoriesProvider>
      </MenuProvider>
      {children}
    </section>
  )
}
