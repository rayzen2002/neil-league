require('dotenv').config()
async function findMatch(steam32ids) {
  const basePlayer = steam32ids.shift()
  const agroupedIds = steam32ids.map((id) => {
    return `included_account_id=${id}`
  })
  const playersId = agroupedIds.join('&')

  // const startTimestamp = await getDateOfTheMatch(matchId)
  const endpoint = `https://api.opendota.com/api/players/${basePlayer}/matches?api_key=&${playersId}&game_mode=2&lobby_type=1`

  const res = await fetch(endpoint)
  const match = await res.json()
  const opendotaId = match[0].match_id
  // console.log(opendotaId)
  return opendotaId
}

module.exports = { findMatch }
