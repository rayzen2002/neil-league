// import { prisma } from '@/lib/prisma'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'

export default async function Profile() {
  const playerCookie = cookies().get('token')
  // const player = prisma.player.findUnique({
  //   where: {},
  // })
  const playerData = jwtDecode(playerCookie)
  return <h1>{playerData}</h1>
}
