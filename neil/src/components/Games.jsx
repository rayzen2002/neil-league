import dayjs from 'dayjs'
import { Crown } from 'lucide-react'

export const Games = async () => {
  let games = []
  let page = 1
  const pageSize = 100
  try {
    while (games.length < 500) {
      const res = await fetch(
        `https://open.faceit.com/data/v4/hubs/${
          process.env.NEXT_PUBLIC_HUB_ID
        }/matches?limit=${pageSize}&offset=${(page - 1) * pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            Accept: 'application/json',
          },
        },
      )
      const response = await res.json()
      if (response.items.length === 0) {
        break // No more players, exit the loop
      }
      games = [...games, ...response.items]
      page++
    }
  } catch (error) {
    console.error(`Erro ao fazer requisicao : ${error}`)
  }

  return (
    <div>
      <ul>
        {games && games.length > 0 ? (
          games.map((match) => {
            if (match.status === 'CANCELLED') {
              return null
            } else {
              const gameStartedAt = dayjs(1000 * match.started_at).format(
                'DD/MM/YYYY HH:mm',
              )
              const teamA = match.teams.faction1.name.replace(/^team_/, '')
              const teamB = match.teams.faction2.name.replace(/^team_/, '')
              return (
                <li
                  key={match.id}
                  className="m-auto mt-4 flex w-2/4 flex-col items-center justify-center gap-y-2 rounded-xl border-4 bg-blitz-400 pb-6"
                >
                  <h1 className="flex gap-6 pt-8 text-3xl font-bold">
                    <div className="flex items-end gap-6">
                      <span
                        className={
                          match.results && match.results.winner === 'faction1'
                            ? 'flex flex-col items-center justify-center'
                            : ''
                        }
                      >
                        {match.results &&
                          match.results.winner === 'faction1' && (
                            <Crown style={{ color: 'red' }} />
                          )}
                        {teamA}
                      </span>
                      <span className="">Vs</span>
                      <span
                        className={
                          match.results && match.results.winner === 'faction2'
                            ? 'flex flex-col items-center justify-center'
                            : ''
                        }
                      >
                        {match.results &&
                          match.results.winner === 'faction2' && (
                            <Crown style={{ color: 'red' }} />
                          )}
                        {teamB}
                      </span>
                    </div>
                  </h1>

                  <p>
                    Link da Partida:{' '}
                    <a
                      href={`${match.faceit_url.replace(
                        /\{lang}/,
                        'en',
                      )}/scoreboard`}
                    >
                      Faceit ID
                    </a>
                  </p>
                  <p>Data da partida : {gameStartedAt}</p>
                  <p>
                    Duracao do game :{' '}
                    {dayjs(1000 * match.finished_at).diff(
                      dayjs(1000 * match.started_at),
                      'm',
                    )}{' '}
                    minutos
                  </p>
                </li>
              )
            }
          })
        ) : (
          <p>Error</p>
        )}
      </ul>
    </div>
  )
}
