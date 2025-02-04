import type { Metadata } from 'next'
import './globals.css'
import MyMsalProvider from '@/msal/MyMsalProvider'
import {SignOutButton} from '@/components/SignOutButton'
import UserAvatar from '@/components/UserAvatar'
import { MsalConfigProvider } from '@/msal/MsalConfigProvider'


export const metadata: Metadata = {
  title: 'MSAL with Next.Js App Router',
  description: 'Created by Mazen Alsenih (https://mazensenih.com | mazen.el.senih@gmail.com)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={` bg-gray-100 flex flex-col p-4`}>
        <MsalConfigProvider>
          <MyMsalProvider>
            <main>
              <div className="w-full text-center">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">You are logged in</h1>
                <div className="m-4"><UserAvatar showInfo={true} /></div>
                <SignOutButton />
              </div>
              {children}
            </main>
          </MyMsalProvider>
        </MsalConfigProvider>
      </body>
    </html>
  )
}
