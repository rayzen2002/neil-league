import fastify from 'fastify'
import 'dotenv/config'
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth.js'
import jwt from '@fastify/jwt'

const app = fastify()
app.register(authRoutes)
app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: 'zolomonnajkndjksdnkajd',
})
app.listen(() => {
  console.log('🚀 HTTP server running on https://neildota.vercel.app/')
})
