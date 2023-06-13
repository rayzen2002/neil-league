const { convertSteam64ToSteam32 } = require('./helpers/convertSteam64ToSteam32')
const { faceitToSteamId } = require('./helpers/faceitToSteamId')
const { findMatch } = require('./helpers/findMatch')
const { playersInTheMatch } = require('./helpers/playersInTheMatch')

require('dotenv').config()

async function getDotabuffUrl(matchIds) {
  const urls = []

  for (const matchId of matchIds) {
    const playersId = await playersInTheMatch(matchId)
    const steamIds = await faceitToSteamId(playersId)
    const convertedSteamIds = convertSteam64ToSteam32(steamIds)
    const url = await findMatch(convertedSteamIds)
    urls.push(url)
  }

  return urls
}

module.exports = { getDotabuffUrl }
