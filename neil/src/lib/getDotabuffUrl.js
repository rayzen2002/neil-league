const { convertSteam64ToSteam32 } = require('./helpers/convertSteam64ToSteam32')
const { faceitToSteamId } = require('./helpers/faceitToSteamId')
const { findMatch } = require('./helpers/findMatch')
const { playersInTheMatch } = require('./helpers/playersInTheMatch')

require('dotenv').config()

async function getDotabuffUrl(matchId) {
  const playersId = await playersInTheMatch(matchId)
  const steamIds = await faceitToSteamId(playersId)
  const convertedSteamIds = convertSteam64ToSteam32(steamIds)
  await findMatch(convertedSteamIds)
}

module.exports = { getDotabuffUrl }
