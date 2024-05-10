import AlertMessage from '@/components/AlertMessage'
import MainLayout from '@/layouts/MainLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <MainLayout>
      <AlertMessage> 
        {children}
      </AlertMessage>
  </MainLayout>
  )
}
