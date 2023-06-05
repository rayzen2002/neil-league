/* eslint-disable camelcase */
import QueryString from 'qs'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
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
    const registerResponse = await axios.post(
      'https://api.faceit.com/auth/v1/oauth/token',
      requestBody,
      { headers },
      {
        code,
      },
    )

    const { id_token } = registerResponse.data
    const playerData = jwtDecode(id_token)
    // const redirectUrl = new URL('/', request.url)
    // const cookieExpiresInSeconds = 30 * 24 * 60 * 60
    // return NextResponse.redirect(redirectUrl, {
    //   headers: {
    //     'Set-Cookie': `token=${token}; Path=/;max-age=${cookieExpiresInSeconds}`,
    //   },
    // })
    return playerData
  } catch (error) {
    return error.data
  }
}
