import { api } from './api'
import { prisma } from './prisma'

export async function fetchUpdatedPlayerData(playerId) {
  const player = prisma.player.findUnique({
    where: {
      id: playerId,
    },
  })
  try {
    const response = await api.get(
      `https://api.faceit.com/players/${player.id}`,
    )
    const { nickname, avatarUrl, email, name } = response.data
    return {
      nickname,
      avatarUrl,
      email,
      name,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
