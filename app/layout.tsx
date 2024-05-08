import "./css/globals.css"
import "./css/skeleton.css"
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import ThemeProvider from "@/components/providers/ThemeProvider"
import UsersProvider from "@/components/providers/UsersProvider"
import MessageProvider from "@/components/providers/MessageProvider"

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
          <UsersProvider>
            <MessageProvider>
              {children}
            </MessageProvider>
          </UsersProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
