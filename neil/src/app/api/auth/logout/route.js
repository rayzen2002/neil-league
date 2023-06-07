/* eslint-disable camelcase */
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const redirectUrl = 'https://neildota.vercel.app'
    const cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'

    return NextResponse.redirect(redirectUrl, {
      headers: { 'Set-Cookie': [cookie] },
    })
  } catch (error) {}
}
