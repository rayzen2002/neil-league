import dayjs from 'dayjs'
import { Crown } from 'lucide-react'
import Image from 'next/image'
const { getDotabuffUrl } = require('@/lib/getDotabuffUrl')

export const Games = async () => {
  let games = []
  // const page = 1
  const pageSize = 50
  try {
    const res = await fetch(
      `https://open.faceit.com/data/v4/hubs/${process.env.NEXT_PUBLIC_HUB_ID}/matches?limit=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          Accept: 'application/json',
        },
      },
    )
    const response = await res.json()

    games = response.items

    console.log(games)
  } catch (error) {
    console.error(`Erro ao fazer requisicao : ${error}`)
  }

  // Perform API calls in parallel using Promise.all()
  const matchesWithDotabuffIds = await Promise.all(
    games.map(async (match) => {
      if (match.status === 'CANCELLED') {
        return null
      } else {
        const matchId = await getDotabuffUrl(match.match_id)
        match.dotabuffId = matchId // Add dotabuffId property to the match object
        return match
      }
    }),
  )

  return (
    <div>
      <ul>
        {matchesWithDotabuffIds && matchesWithDotabuffIds.length > 0 ? (
          matchesWithDotabuffIds.map((match) => {
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
                      {match.results && match.results.winner === 'faction1' && (
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
                      {match.results && match.results.winner === 'faction2' && (
                        <Crown style={{ color: 'red' }} />
                      )}
                      {teamB}
                    </span>
                  </div>
                </h1>

                <p>Link da Partida: </p>
                <div className="flex gap-4 ">
                  <a
                    href={`${match.faceit_url.replace(
                      /\{lang}/,
                      'en',
                    )}/scoreboard`}
                  >
                    <Image
                      src="/faceit.svg"
                      alt="faceit"
                      width={40}
                      height={40}
                    />
                  </a>
                  <a
                    href={`https://www.dotabuff.com/matches/${match.dotabuffId}`}
                  >
                    <Image
                      src="/dota.svg"
                      alt="dotabuff"
                      width={40}
                      height={40}
                    />
                  </a>
                </div>
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
          })
        ) : (
          <p>Error</p>
        )}
      </ul>
    </div>
  )
}
