function convertSteam64ToSteam32(steam64ids) {
  const steam32Identifier = BigInt('76561197960265728')
  const steam32ids = steam64ids.map((steam64) => {
    const steam64BigInt = BigInt(steam64)
    const steam32BigInt = steam64BigInt - steam32Identifier
    return steam32BigInt.toString()
  })
  return steam32ids
}
module.exports = { convertSteam64ToSteam32 }
