import "./css/globals.css"
import "./css/skeleton.css"
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import ThemeProvider from "@/components/providers/ThemeProvider"
import UsersProvider from "@/components/providers/UsersProvider"
import MessageProvider from "@/components/providers/MessageProvider"
import ChatListProvider from "@/components/providers/ChatListProvider"
import ProgressBarProvider from "@/components/providers/ProgressBarProvider"

const roboto = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'] }
  )

export const metadata: Metadata = {
  title: 'Chat App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProgressBarProvider>
            <UsersProvider>
              <ChatListProvider>
                <MessageProvider>
                  {children}
                </MessageProvider>
              </ChatListProvider>
            </UsersProvider>
          </ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
