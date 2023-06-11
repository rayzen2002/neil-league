const { convertSteam64ToSteam32 } = require('./helpers/convertSteam64ToSteam32')
const { faceitToSteamId } = require('./helpers/faceitToSteamId')
const { findMatch } = require('./helpers/findMatch')
const { playersInTheMatch } = require('./helpers/playersInTheMatch')

require('dotenv').config()
const cache = {}

async function getDotabuffUrl(matchId) {
  if (cache[matchId]) {
    // Return the cached result if available
    return cache[matchId]
  }

  const playersId = await getCachedPlayersId(matchId)
  const steamIds = await getCachedSteamIds(playersId)

  // If any intermediate result is not cached, retrieve and cache it
  if (!playersId) {
    const newPlayersId = await playersInTheMatch(matchId)
    cachePlayersId(matchId, newPlayersId)
  }
  if (!steamIds) {
    const newPlayersId = playersId || (await getCachedPlayersId(matchId))
    const newSteamIds = await faceitToSteamId(newPlayersId)
    cacheSteamIds(newPlayersId, newSteamIds)
  }

  const finalSteamIds = steamIds || (await getCachedSteamIds(playersId))
  const convertedSteamIds = convertSteam64ToSteam32(finalSteamIds)
  const url = await findMatch(convertedSteamIds)
  cache[matchId] = url

  return url
}

function getCachedPlayersId(matchId) {
  return cache[`${matchId}:playersId`]
}

function cachePlayersId(matchId, playersId) {
  cache[`${matchId}:playersId`] = playersId
}

function getCachedSteamIds(playersId) {
  return cache[`steamIds:${playersId}`]
}

function cacheSteamIds(playersId, steamIds) {
  cache[`steamIds:${playersId}`] = steamIds
}

module.exports = { getDotabuffUrl }
