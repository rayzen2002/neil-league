const { convertSteam64ToSteam32 } = require('./helpers/convertSteam64ToSteam32')
const { faceitToSteamId } = require('./helpers/faceitToSteamId')
const { findMatch } = require('./helpers/findMatch')
const { playersInTheMatch } = require('./helpers/playersInTheMatch')

require('dotenv').config()

async function getDotabuffUrl(matchId) {
  const playersId = await playersInTheMatch(matchId)
  console.log(playersId)
  const steamIds = await faceitToSteamId(playersId)
  const convertedSteamIds = convertSteam64ToSteam32(steamIds)
  const url = await findMatch(convertedSteamIds)
  return url
}

getDotabuffUrl('1-09b0b878-fc29-4c2f-82d5-96e2459f74df')
module.exports = { getDotabuffUrl }
