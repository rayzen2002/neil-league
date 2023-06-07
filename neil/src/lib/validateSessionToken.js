import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export async function validateSessionToken(sessionToken) {
  try {
    const secretKey = 'zxcvbn'
    const decodedToken = jwt.verify(sessionToken, secretKey)

    const { guid } = decodedToken
    const player = await prisma.player.findUnique({
      where: {
        id: guid,
      },
    })

    if (!player) {
      throw new Error('Player not found')
    }

    const { picture, email, birthdate, nickname, name } = decodedToken

    return {
      guid,
      picture,
      email,
      birthdate,
      nickname,
      name,
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Session token has expired')
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid session token')
    } else {
      throw new Error('An error occurred while validating the session token')
    }
  }
}
