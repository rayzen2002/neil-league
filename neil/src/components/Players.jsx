export const Players = async () => {
  let players = []
  let page = 1
  const pageSize = 100
  try {
    while (true) {
      const res = await fetch(
        `https://open.faceit.com/data/v4/hubs/${
          process.env.NEXT_PUBLIC_HUB_ID
        }/members?limit=${pageSize}&offset=${(page - 1) * pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            Accept: 'application/json',
          },
        },
      )
      const response = await res.json()
      if (response.items.length === 0) {
        break // No more players, exit the loop
      }
      players = [...players, ...response.items]
      page++
    }
  } catch (error) {
    console.error(`Erro ao fazer requisicao : ${error}`)
  }
  return (
    <ul>
      {players.map((player) => {
        return (
          <li key={player.user_id}>
            <div className="mt-5 flex flex-row gap-5">
              <img
                src={player.avatar !== '' ? player.avatar : '/neil.svg'}
                className="flex  h-40 w-40 rounded-xl border-4 border-orange-500 bg-orange-500"
                alt="avatar"
              />
              <div>
                <p className="text-6xl">{player.nickname}</p>
                <p>{player.user_id}</p>
                <p>Incoming ...</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
