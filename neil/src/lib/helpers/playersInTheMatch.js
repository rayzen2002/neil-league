require('dotenv').config()
async function playersInTheMatch(matchId) {
  // console.log(matchId)
  // console.log(process.env.NEXT_PUBLIC_API_KEY)
  try {
    const res = await fetch(
      `https://open.faceit.com/data/v4/matches/${matchId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          Accept: 'application/json',
        },
      },
    )
    const match = await res.json()
    const playersInTheMatch = match.teams.faction1.roster
      .map((player) => {
        return player.player_id
      })
      .concat(
        match.teams.faction2.roster.map((player) => {
          return player.player_id
        }),
      )
    // console.log(playersInTheMatch)
    return playersInTheMatch
  } catch (error) {
    console.log(`Erro na requisicao de buscar partidas${error}`)
  }
}

playersInTheMatch('1-09b0b878-fc29-4c2f-82d5-96e2459f74df')

module.exports = { playersInTheMatch }
