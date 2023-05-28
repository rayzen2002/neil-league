import { Home, User } from 'lucide-react'
import Image from 'next/image'
// Key: 4232E26F272E6133D6396BBB6973B86E
// https://steamcommunity.com/oauth/login?response_type=token&client_id=client_id_here&state=whatever_you_want
// https://accounts.faceit.com/error
export default function Header() {
  return (
    <div className="a flex h-28 w-full  items-center justify-between gap-4 bg-blitz-100  font-alt font-bold">
      <div className="flex items-center gap-20">
        {/* Botao de Login */}
        <a
          href={`https://cdn.faceit.com/widgets/sso/index.html?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_popup=true`}
          className="text-zinc-100 flex items-center gap-3 px-4 pt-5 text-left transition-colors "
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-400 ">
            <User className="h-12 w-12 text-gray-500 " />
          </div>
          <p className=" max-w-[120px] text-lg  leading-snug">
            <span className="underline">Faca login</span> usando a Faceit
          </p>
        </a>
        {/* Botao de HOME */}
        <div className="border-12  flex h-12 w-48 items-center   rounded-full bg-blitz-400 delay-100 hover:bg-orange-500">
          <a href="/" className="flex items-center justify-center gap-4  ">
            <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
              <Home className="pointer-events-none" />
            </div>
            <p> HOME</p>
          </a>
        </div>
      </div>
      <div className="mr-12 flex flex-col items-center">
        <Image
          src="/neil.svg"
          width={36 * 4}
          height={100}
          alt="Neil hat"
          className="text-orange-500"
        />
        <Image
          src="/logo.svg"
          width={32 * 4}
          height={80}
          className="  "
          alt="Neil"
        />
      </div>
    </div>
  )
}
