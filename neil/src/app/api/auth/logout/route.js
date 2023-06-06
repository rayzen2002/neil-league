/* eslint-disable camelcase */
import QueryString from 'qs'
import jwtDecode from 'jwt-decode'
import { NextResponse } from 'next/server'
import { api } from '@/lib/api'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  try {
    const redirectUrl = 'https://neildota.vercel.app'
    const cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`

    let player = await prisma.player.findUnique({
      where: {
        id: guid,
      },
    })
    if (!player) {
      player = await prisma.player.create({
        data: {
          id: guid,
          nickname,
          avatarUrl: picture,
          email,
          name: `${given_name} ${family_name}`,
        },
      })
      return NextResponse.redirect(redirectUrl, {
        headers: { 'Set-Cookie': cookie },
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}
