// import { api } from '@/lib/api'

export async function GET(request) {
  console.log(`oi`)
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  console.log(code)
  // const code = searchParams.get('code')

  // const registerResponse = await api.post('/register', {
  //   code,
  // })

  // const { token } = registerResponse.data
  // console.log(token)
}
