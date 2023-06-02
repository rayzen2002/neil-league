import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://neildota.vercel.app/api',
})
