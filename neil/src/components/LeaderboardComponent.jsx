import { Flame, User } from 'lucide-react'

export const LeaderboardComponent = async (props) => {
  let geralEndPoint = null
  let page = 1
  const pageSize = 50
  let leaderboards = [] // Declare and initialize the games variable
  const { season } = props

  try {
    while (leaderboards.length < 500) {
      if (season === 'general') {
        geralEndPoint = `https://open.faceit.com/data/v4/leaderboards/hubs/${
          process.env.NEXT_PUBLIC_HUB_ID
        }/general?limit=${pageSize}&offset=${(page - 1) * pageSize}`
      }
      const endpoint = `https://open.faceit.com/data/v4/leaderboards/hubs/${
        process.env.NEXT_PUBLIC_HUB_ID
      }/seasons/${season}?limit=${pageSize}&offset=${(page - 1) * pageSize}`
      console.log(endpoint)
      const res = await fetch(geralEndPoint ?? endpoint, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          Accept: 'application/json',
        },
        next: {
          revalidate: 30,
        },
      })
      try {
        const response = await res.json()
        // Process the response and update the state or perform any necessary actions
        if (response.items.length === 0) {
          break // No more leaderboards, exit the loop
        }
        leaderboards = [...leaderboards, ...response.items]
        page++
      } catch (error) {
        console.error(`Error occurred: ${error}`)
        // Handle the error, display an error message, or take any other necessary actions
      }
    }
  } catch (error) {
    console.error(`Erro causado: ${error}`)
    return error
  }

  return (
    <ul>
      <h1 className="mt-10 text-center text-5xl font-bold text-orange-500">
        Season {season}
      </h1>
      {leaderboards && leaderboards.length > 0
        ? leaderboards.map((items) => {
            let winrate = 100 * items.win_rate
            if (!Number.isInteger(winrate)) {
              winrate = winrate.toFixed(2)
            }
            return (
              <div key={items.player.user_id}>
                <li className="m-auto  mt-4  flex w-2/4 flex-col items-start justify-center gap-y-2 rounded-xl border-4  bg-blitz-400 pb-6">
                  <div className=" mx-2 flex w-full items-center justify-start gap-12">
                    <p className="flex items-start justify-start text-start text-5xl ">
                      {items.position} º
                    </p>
                    <div className="flex items-center gap-1">
                      {items.player.avatar === '' ? (
                        <User
                          alt="avatar"
                          className="h-20 w-20 rounded-full border-4 border-orange-500 "
                        />
                      ) : (
                        <img
                          alt="avatar"
                          width={30}
                          height={30}
                          src={items.player.avatar}
                          className="h-20 w-20 rounded-full border-4 border-orange-500"
                        />
                      )}

                      <p className="text-2xl">
                        <span className="font-bold text-orange-500">
                          {items.player.nickname}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className=" mx-12 grid  w-full grid-cols-2 ">
                    <div>
                      <p>Partidas Jogadas : {items.played}</p>
                      <p className="text-green-700">Ganhou : {items.won}</p>
                      <p style={{ color: 'red' }}>Perdeu : {items.lost}</p>
                      <p>Winrate : {`${winrate} %`}</p>
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <p>Pontos: {items.points}</p>
                      <div className="flex gap-1">
                        Streak :{' '}
                        {items.current_streak < 4 ? (
                          <p>+ {items.current_streak}</p>
                        ) : (
                          <p className="flex gap-4">
                            + {items.current_streak}
                            <Flame className="text-red-200 " />
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            )
          })
        : ''}
    </ul>
  )
}
