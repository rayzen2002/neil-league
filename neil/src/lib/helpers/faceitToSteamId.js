require('dotenv').config()
async function faceitToSteamId(playersId) {
  const steamIds = []
  for (const playerId of playersId) {
    const res = await fetch(
      `https://open.faceit.com/data/v4/players/${playerId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          Accept: 'application/json',
        },
        cache: 'force-cache',
      },
    )
    const playerData = await res.json()
    steamIds.push(playerData.steam_id_64)
  }
  return steamIds
}

module.exports = { faceitToSteamId }
