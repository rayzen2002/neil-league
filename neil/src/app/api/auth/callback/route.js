import { api } from '@/lib/api'
import { NextResponse } from 'next/server'
import QueryString from 'qs'

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
    Authorization: `Basic ${base64Credentials}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  console.log(code)
  try {
    const registerResponse = await api.post(
      '/register',
      requestBody,
      { headers },
      {
        code,
      },
    )

    const { token } = registerResponse.data

    const redirectUrl = new URL('/', request.url)
    const cookieExpiresInSeconds = 30 * 24 * 60 * 60
    return NextResponse.redirect(redirectUrl, {
      headers: {
        'Set-Cookie': `token=${token}; Path=/;max-age=${cookieExpiresInSeconds}`,
      },
    })
  } catch (error) {
    return error.data
  }
}
