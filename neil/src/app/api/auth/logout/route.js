/* eslint-disable camelcase */
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const redirectURL = new URL('/', request.url)
    const cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`

    return NextResponse.redirect(redirectURL, {
      headers: { 'Set-Cookie': cookie },
    })
  } catch (error) {}
}
