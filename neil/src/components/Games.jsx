/* eslint-disable camelcase */
// import { prisma } from '@/lib/prisma'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { Crown } from 'lucide-react'
import Image from 'next/image'
const { getDotabuffUrl } = require('@/lib/getDotabuffUrl')

export const Games = async () => {
  let games = []

  const matchIds = []
  // const page = 1
  const pageSize = 50

  // while (games.length < 50) {
  const res = await fetch(
    `https://open.faceit.com/data/v4/hubs/${process.env.NEXT_PUBLIC_HUB_ID}/matches?limit=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        Accept: 'application/json',
      },
      cache: 'force-cache',
    },
  )
  const response = await res.json()

  // if (response.items.length === 0) {
  //   break // No more games, exit the loop
  // }
  games = await response.items
  const finishedGames = games.filter((game) => game.status === 'FINISHED')
  finishedGames.forEach((game) => {
    matchIds.push(game.match_id)

    game.players = game.teams.faction1.roster
      .map((player) => player.player_id)
      .concat(game.teams.faction2.roster.map((player) => player.player_id))
  })
  const gamesForDatabase = finishedGames
  gamesForDatabase.forEach(async (game) => {
    if (game) {
      const gameDatabase = await prisma.games.findUnique({
        where: {
          id: game.match_id,
        },
      })
      if (!gameDatabase) {
        await prisma.games.create({
          data: {
            id: game.match_id,
            player_ids: game.players,
          },
        })
      }
    }
  })
  // games = [...games, ...response.items]
  // page++
  // }

  const idsTransformed = await getDotabuffUrl(matchIds)
  return (
    <div>
      <ul>
        {finishedGames && finishedGames.length > 0 ? (
          finishedGames.map(async (match, index) => {
            if (match.status === 'CANCELLED') {
              return null
            } else {
              // const matchId = await getDotabuffUrl(match.match_id)
              match.dotabuffId = idsTransformed[index] // Add dotabuffId property to the match object

              const gameToUpdate = await prisma.games.findUnique({
                where: {
                  id: match.match_id,
                },
              })
              if (gameToUpdate && match.dotabuffId === '') {
                await prisma.games.update({
                  where: {
                    id: String(match.match_id),
                  },
                  data: {
                    gameId: String(match.dotabuffId),
                  },
                })
              }

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
            }
          })
        ) : (
          <p>Error</p>
        )}
      </ul>
    </div>
  )
}
