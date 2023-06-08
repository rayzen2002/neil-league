async function playersInTheMatch(matchId) {
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
    return playersInTheMatch
  } catch (error) {
    console.log(error)
  }
}

module.exports = playersInTheMatch
