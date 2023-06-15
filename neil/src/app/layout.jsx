import Header from '@/components/Header'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { Crown, Gamepad2, Skull, Swords } from 'lucide-react'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NEIL',
  description: 'Neil Inhouse League',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-blitz-100 font-sans text-gray-100`}
      >
        <main className="bg-zinc-900 ">
          <Header />
          <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-8">
            {/* Sidebar */}
            <div className="col-span-1 flex  flex-col  items-center bg-blitz-100 ">
              <div className="text-2lg  flex w-full flex-row flex-wrap items-start justify-between gap-3 px-2 py-4 font-alt lg:flex-col  lg:py-16  lg:text-xl">
                <div className="mx-0 flex gap-1 text-base hover:bg-orange-500 lg:w-full  lg:text-lg xl:mx-4 xl:gap-6">
                  <Gamepad2 />
                  <a href="/jogos" className=" ">
                    Jogos
                  </a>
                </div>
                <div className="mx-0 flex gap-1 text-base hover:bg-orange-500 lg:w-full  lg:text-lg xl:mx-4 xl:gap-6">
                  <Crown />
                  <a href="/leaderboards" className=" ">
                    Leaderboard
                  </a>
                </div>
                <div className="mx-0 flex gap-1 text-base hover:bg-orange-500 lg:w-full  lg:text-lg xl:mx-4 xl:gap-6">
                  <Skull />
                  <a href="/jogadores" className=" ">
                    Jogadores
                  </a>
                </div>
                <div className="mx-0 flex gap-1 text-base hover:bg-orange-500 lg:w-full  lg:text-lg xl:mx-4 xl:gap-6">
                  <Swords />
                  <a href="/arena" className=" ">
                    Arena
                  </a>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="col-span-7 mr-0 rounded-2xl bg-blitz-200 px-2 sm:mr-6 sm:px-4 md:px-8 lg:px-16">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
