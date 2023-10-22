import { Figtree } from 'next/font/google'

import getSongsByUserId from '@/actions/get-songs-by-user-id'
import getActiveProductsWithPrices from '@/actions/get-active-products-with-prices'
import Sidebar from '@/components/sidebar'
import ToasterProvider from '@/providers/toaster-provider'
import UserProvider from '@/providers/user-provider'
import ModalProvider from '@/providers/modal-provider'
import SupabaseProvider from '@/providers/supabase-provider'
import Player from '@/components/player'

import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Spotify Clone',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
