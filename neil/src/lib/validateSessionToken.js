/* eslint-disable camelcase */
import { prisma } from './prisma'
import jwt from 'jsonwebtoken'

export async function validateSessionToken(sessionToken) {
  try {
    const secretKey = 'zxcvbn' // Replace with your actual secret key
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
      throw new Error('Invalid player data')
    }
  } catch (error) {
    throw new Error('Invalid session token')
  }
}
