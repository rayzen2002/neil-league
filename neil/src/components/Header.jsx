import { cookies } from 'next/headers'
import { Dices, Home } from 'lucide-react'
import Image from 'next/image'
import SignIn from './SignIn'
import Profile from './Profile'

export default function Header() {
  const isAuthenticated = cookies().has('token')
  return (
    <div className="a flex h-28 w-full  items-center justify-between gap-4 bg-blitz-100  font-alt font-bold">
      <div className="flex items-center gap-20">
        {/* Botao de Login */}
        {isAuthenticated ? <Profile /> : <SignIn />}
        {/* Botao de HOME */}
        <div className="border-12  flex h-12 w-48 items-center   rounded-full bg-blitz-400 delay-100 hover:bg-orange-500">
          <a href="/" className="flex items-center justify-center gap-4  ">
            <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
              <Home className="pointer-events-none" />
            </div>
            <p> HOME</p>
          </a>
        </div>
        <div className="border-12  flex h-12 w-48 items-center   rounded-full bg-blitz-400 delay-100 hover:bg-blitz-200">
          <a
            href={
              isAuthenticated
                ? '/profile'
                : 'https://accounts.faceit.com/accounts?response_type=code&client_id=95e4faf2-db0d-47fa-9043-3a07f9547689&redirect_popup=true'
            }
            className="flex items-center justify-center gap-4  "
          >
            <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-blitz-300">
              <Dices className="pointer-events-none" />
            </div>
            <p> Profile</p>
          </a>
        </div>
      </div>
      <div className="mr-12 flex  flex-col items-center p-12">
        <Image
          src="/neil.svg"
          width={36 * 4}
          height={38.0938}
          alt="Neil hat"
          className="text-orange-500"
        />
        <Image
          src="/logo.svg"
          width={32 * 4}
          height={75.25}
          className="  "
          alt="Neil"
        />
      </div>
    </div>
  )
}
