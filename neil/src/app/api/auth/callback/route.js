/* eslint-disable camelcase */
import QueryString from 'qs'
import jwtDecode from 'jwt-decode'
import { NextResponse } from 'next/server'
import { api } from '@/lib/api'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'

export async function GET(request) {
  console.log(`oi`)
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
    Authorization: `Basic OTVlNGZhZjItZGIwZC00N2ZhLTkwNDMtM2EwN2Y5NTQ3Njg5OnlCdkpIelJFc3JWeTJub3NSSmxYTG1taGs1NThEMnZkdkdqem9BNVc=`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const tokenEndpoint = 'https://api.faceit.com/auth/v1/oauth/token'

  console.log(code)
  console.log(headers)
  console.log(base64Credentials)

  try {
    const tokenResponse = await api.post(tokenEndpoint, requestBody, {
      headers,
    })

    const { id_token } = tokenResponse.data
    const {
      guid,
      picture,
      email,
      birthdate,
      nickname,
      given_name,
      family_name,
    } = jwtDecode(id_token)

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

    return NextResponse.redirect(redirectUrl, {
      headers: { 'Set-Cookie': cookie },
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}
