import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default function Profile() {
  const token = cookies().get('token')?.value
  if (!token) {
    throw new Error('Nao autenticado')
  }
  const player = jwtDecode(token)
  const { nickname, picture } = player
  return (
    <div className="text-zinc-100 flex items-center gap-3 px-4 pt-5 text-left ">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-400 ">
        <Image
          src={picture || '/neilFaceit.jpg'}
          width={40}
          height={40}
          alt=""
          className="h-16 w-16 rounded-full"
        />
      </div>
      <p className=" max-w-[120px] text-xl  leading-snug md:text-lg ">
        {nickname}
        <a
          href="https://neildota.vercel.app/api/auth/logout"
          className="hover:text-red-400 block text-red-200"
        >
          Quero sair
        </a>
      </p>
    </div>
  )
}
