import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const redirectUrl = 'https://neildota.vercel.app'
    const cookie = 'token=; Path=/; max-age=0;'

    return NextResponse.redirect(redirectUrl, {
      headers: { 'Set-Cookie': [cookie] },
    })
  } catch (error) {
    console.error('Error occurred during logout:', error)
    return NextResponse.error({ message: 'An error occurred during logout' })
  }
}
