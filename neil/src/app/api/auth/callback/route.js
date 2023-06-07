/* eslint-disable camelcase */
import QueryString from 'qs'
import jwtDecode from 'jwt-decode'
import { NextResponse } from 'next/server'
import { api } from '@/lib/api'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'
import { fetchUpdatedPlayerData } from '@/lib/fetchUpdatedPlayer'
import { validateSessionToken } from '@/lib/validateSessionToken'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const credentials = `${clientId}:${clientSecret}`

  const base64Credentials = Buffer.from(credentials, 'utf-8').toString('base64')
  const requestBody = QueryString.stringify({
    grant_type: 'authorization_code',
    code,
  })

  const headers = {
    Authorization: `Basic ${base64Credentials}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const tokenEndpoint = 'https://api.faceit.com/auth/v1/oauth/token'

  try {
    const tokenResponse = await api.post(tokenEndpoint, requestBody, {
      headers,
    })

    let { id_token, refresh_token } = tokenResponse.data
    const {
      guid,
      picture,
      email,
      birthdate,
      nickname,
      given_name,
      family_name,
    } = jwtDecode(id_token)
    let player = await prisma.player.findUnique({
      where: {
        id: guid,
      },
    })

    if (player) {
      const refreshRequestBody = QueryString.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      })
      const refreshTokenResponse = await api.post(
        tokenEndpoint,
        refreshRequestBody,
        {
          headers,
        },
      )
      refresh_token = refreshTokenResponse.data.refresh_token
      const updatedPlayerData = await fetchUpdatedPlayerData(guid)
      if (updatedPlayerData) {
        player = await prisma.player.update({
          where: {
            id: guid,
          },
          data: {
            nickname: updatedPlayerData.updatedNickname,
            avatarUrl: updatedPlayerData.updatedPicture,
            email: updatedPlayerData.updatedEmail,
          },
        })
      }
    }

    if (!player) {
      player = await prisma.player.create({
        data: {
          id: guid,
          nickname,
          avatarUrl: picture,
          email,
          name: `${given_name} ${family_name}`,
          refresh_token,
        },
      })
    }
    const sessionToken = request.cookies.token
    const sessionData = await validateSessionToken(sessionToken)
    if (sessionData) {
      const tokenPayload = {
        guid,
        picture,
        email,
        birthdate,
        nickname,
        given_name,
        family_name,
      }
      const token = jwt.sign(tokenPayload, 'zxcvbn', {
        expiresIn: '30d',
      })

      const redirectUrl = 'https://neildota.vercel.app'
      const expirationDate = dayjs().add(1, 'month').toDate()
      const cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`
      console.log(tokenPayload)
      console.log(cookie)
      return NextResponse.redirect(redirectUrl, {
        headers: { 'Set-Cookie': cookie },
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'An error occurred' })
  }
}
