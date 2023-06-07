import { api } from './api'
import { prisma } from './prisma'

export async function fetchUpdatedPlayerData(playerId) {
  try {
    const player = prisma.player.findUnique({
      where: {
        id: playerId,
      },
    })
    if (player) {
      const response = await api.get(
        `https://api.faceit.com/players/${player.id}`,
      )
      const { nickname, avatarUrl, email, name } = response.data
      return {
        updatedNickname: nickname,
        updatedAvatarUrl: avatarUrl,
        updatedEmail: email,
        updatedName: name,
      }
    }
    return
  } catch (error) {
    console.log(error)
    return null
  }
}
