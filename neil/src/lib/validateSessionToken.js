/* eslint-disable camelcase */
import { prisma } from './prisma'
import jwt from 'jsonwebtoken'

export async function validateSessionToken(sessionToken) {
  try {
    const secretKey = 'zxcvbn'
    const decodedToken = jwt.verify(sessionToken, secretKey)
    const {
      guid,
      picture,
      email,
      birthdate,
      nickname,
      given_name,
      family_name,
    } = decodedToken
    const player = await prisma.player.findUnique({
      where: {
        id: guid,
      },
    })
    if (player) {
      return {
        guid,
        picture,
        email,
        birthdate,
        nickname,
        given_name,
        family_name,
      }
    } else {
      throw new Error('Player not found or invalid player data')
    }
  } catch (error) {
    throw new Error('Invalid session token')
  }
}
