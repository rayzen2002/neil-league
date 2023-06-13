async function getDateOfTheMatch(matchId) {
  const res = await fetch(
    `https://open.faceit.com/data/v4/matches/${matchId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        Accept: 'application/json',
      },
      cache: 'force-cache',
    },
  )
  const match = await res.json()
  const date = match.started_at
  return date
}

module.exports = { getDateOfTheMatch }
