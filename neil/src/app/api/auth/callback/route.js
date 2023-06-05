/* eslint-disable camelcase */
import QueryString from 'qs'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(request) {
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
    const tokenResponse = await axios.post(tokenEndpoint, requestBody, {
      headers,
    })

    const { id_token } = tokenResponse.data
    const playerData = jwtDecode(id_token)

    return NextResponse.json(playerData)
  } catch (error) {
    console.log(error)
    // return NextResponse.json(error)
  }
}
