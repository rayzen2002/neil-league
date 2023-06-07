import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export async function validateSessionToken(sessionToken) {
  try {
    const secretKey = 'zxcvbn'
    const decodedToken = jwt.verify(sessionToken, secretKey)

    const player = await prisma.player.findUnique({
      where: {
        id: decodedToken.guid,
      },
    })

    if (!player) {
      return null
    }

    return true
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
