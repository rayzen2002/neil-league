/* eslint-disable camelcase */
import QueryString from 'qs'
import jwtDecode from 'jwt-decode'
import { NextResponse } from 'next/server'
import { api } from '@/lib/api'

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
  const redirectTo = request.cookies.get('redirectTo')?.value

  // const requestHeaders = {
  //   Authorization: `Basic ${base64Credentials}`,
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // }
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
    const playerData = jwtDecode(id_token)
    const redirectURL = redirectTo ?? new URL('/', request.url)
    const token = playerData.jwt.sign(
      {
        name: id_token.name,
        avatarUrl: id_token.avatarUrl,
      },
      {
        sub: id_token.id,
        expiresIn: '30 days',
      },
    )
    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `token=${token}; Path=/; max-age=2592000;`,
      },
    })
  } catch (error) {
    console.log(error)
    // return NextResponse.json(error)
  }
}
