import { cookies } from 'next/headers'
import { Dices, Home } from 'lucide-react'
import Image from 'next/image'
import SignIn from './SignIn'
import Profile from './Profile'

export default function Header() {
  const isAuthenticated = cookies().has('token')
  return (
    <div className="flex w-full flex-col items-center justify-start bg-blitz-100 py-0 font-alt font-bold md:justify-between lg:flex-row">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-20">
        {/* Botao de Login */}
        {isAuthenticated ? <Profile /> : <SignIn />}
        <div className="flex items-center gap-4">
          {/* Botao de HOME */}
          <div className="border-12 flex items-center rounded-full bg-blitz-400 delay-100 hover:bg-orange-500 md:w-48">
            <a href="/" className="flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
                <Home className="pointer-events-none" />
              </div>
              <p className="text-3xl md:text-2xl lg:text-base"> HOME</p>
            </a>
          </div>
          <div className="border-12 flex items-center rounded-full bg-blitz-400 delay-100 hover:bg-blitz-200 md:w-48">
            <a
              href={
                isAuthenticated
                  ? '/profile'
                  : 'https://accounts.faceit.com/accounts?response_type=code&client_id=95e4faf2-db0d-47fa-9043-3a07f9547689&redirect_popup=true'
              }
              className="flex items-center justify-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blitz-300">
                <Dices className="pointer-events-none" />
              </div>
              <p className="text-3xl md:text-2xl lg:text-base"> Profile</p>
            </a>
          </div>
        </div>
      </div>
      <div className="mr-12 flex flex-col items-center ">
        <Image
          src="/neil.svg"
          width={200}
          height={200}
          alt="Neil hat"
          className="hidden text-orange-500 lg:block lg:h-[200] lg:w-[200]"
        />
        <Image
          src="/logo.svg"
          width={32 * 4}
          height={75.25}
          className="hidden lg:block lg:h-20 lg:w-64"
          alt="Neil"
        />
      </div>
    </div>
  )
}
