/* eslint-disable camelcase */
import axios from 'axios'
import qs from 'qs'
import jwt_decode from 'jwt-decode'
import { prisma } from '../lib/prisma.js'

export async function authRoutes(app) {
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const credentials = `${clientId}:${clientSecret}`

  const base64Credentials = Buffer.from(credentials, 'utf-8').toString('base64')
  const tokenEndpoint = 'https://api.faceit.com/auth/v1/oauth/token'

  app.post('/register', async (request) => {
    const { code } = request.body
    const requestBody = qs.stringify({
      grant_type: 'authorization_code',
      code,
    })

    const headers = {
      Authorization: `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    try {
      const tokenResponse = await axios.post(tokenEndpoint, requestBody, {
        headers,
      })
      const { id_token } = tokenResponse.data
      const playerData = jwt_decode(id_token)
      let player = await prisma.player.findUnique({
        where: {
          id: playerData.guid,
        },
      })
      if (!player) {
        player = await prisma.player.create({
          data: {
            id: playerData.guid,
            nickname: playerData.nickname,
            avatarUrl: playerData.picture,
            email: playerData.email,
            name: `${playerData.given_name} ${playerData.family_name}`,
          },
        })
        const token = app.jwt.sign(
          {
            nickname: player.nickname,
            avatarUrl: player.avatarUrl,
            email: player.email,
            name: player.name,
          },
          {
            sub: player.id,
            expiresIn: '30 days',
          },
        )
        return token
      }
    } catch (error) {
      console.log(error.message)
      return {
        error,
      }
    }
  })
  console.log(base64Credentials)
}
