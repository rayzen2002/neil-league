// import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export default async function Profile() {
  const playerCookie = cookies().get('token')
  // const player = prisma.player.findUnique({
  //   where: {},
  // })
  return <h1>{JSON.stringify(playerCookie)}</h1>
}
