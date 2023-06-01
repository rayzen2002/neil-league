import { User } from 'lucide-react'

export const LeaderboardComponent = async () => {
  let leaderboards = [] // Declare and initialize the games variable

  try {
    const res = await fetch(
      `https://open.faceit.com/data/v4/leaderboards/hubs/${process.env.NEXT_PUBLIC_HUB_ID}/seasons/13`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          Accept: 'application/json',
        },
        next: {
          revalidate: 30,
        },
      },
    )
    leaderboards = await res.json()
  } catch (error) {
    console.error(`Erro causado: ${error}`)
  }
  return (
    <ul>
      <h1 className="mt-10 text-center text-5xl font-bold text-orange-500">
        Season 13
      </h1>
      {leaderboards && leaderboards.items && leaderboards.items.length > 0
        ? leaderboards.items.map((items) => {
            let winrate = 100 * items.win_rate
            if (!Number.isInteger(winrate)) {
              winrate = winrate.toFixed(2)
            }
            return (
              <div key={items.player.user_id}>
                <li className="m-auto  mt-4  flex w-2/4 flex-col items-center justify-center gap-y-2 rounded-xl border-4  bg-blitz-400 pb-6">
                  <div className=" flex items-center gap-4 pt-4 ">
                    <User
                      alt="avatar"
                      className="h-28 w-28 rounded-full border-4 border-orange-500 "
                    />

                    <p className="text-2xl">
                      Nickname :{' '}
                      <span className="font-bold text-orange-500">
                        {' '}
                        {items.player.nickname}{' '}
                      </span>
                    </p>
                  </div>
                  <p>Posicao : {items.position} º </p>
                  <p>Partidas Jogadas : {items.played}</p>
                  <p className="text-green-700">Ganhou : {items.won}</p>
                  <p style={{ color: 'red' }}>Perdeu : {items.lost}</p>
                  <p>Winrate : {`${winrate} %`}</p>
                </li>
              </div>
            )
          })
        : ''}
    </ul>
  )
}
