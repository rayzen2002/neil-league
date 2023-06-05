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
    <div>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-400 ">
        <Image
          src={picture}
          width={40}
          height={40}
          alt=""
          className="h-10 w-10 rounded-full"
        />
      </div>
      <p className=" max-w-[120px] text-lg  leading-snug">
        {nickname}
        <a href="" className="hover:text-red-400 block text-red-200">
          Quero sair
        </a>
      </p>
    </div>
  )
}
