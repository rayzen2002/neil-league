export const Players = async () => {
  let players = []
  try {
    const res = await fetch(
      `https://open.faceit.com/data/v4/hubs/${process.env.NEXT_PUBLIC_HUB_ID}/members?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          Accept: 'application/json',
        },
        next: {
          revalidate: 30,
        },
      },
    )
    players = await res.json()
  } catch (error) {
    console.error(`Erro ao fazer requisicao : ${error}`)
  }
  return (
    <ul>
      {players && players.items && players.items.length > 0
        ? players.items.map((player) => {
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
          })
        : ''}
    </ul>
  )
}
