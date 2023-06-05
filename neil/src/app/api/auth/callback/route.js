import { api } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function GET(request) {
  console.log(`oi`)
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  console.log(code)
  try {
    const registerResponse = await api.post('/register', {
      code,
    })

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
