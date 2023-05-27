export async function LeaderboardsComponent() {
  const leaderboards = []
  try {
    const numData = 50
    const res = await fetch(`https://open.faceit.com/data/v4/leaderboards/hubs/${process.env.NEXT_PUBLIC_HUB_ID}/seasons/13?limit=${numData}`, {
      headers: {

        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        Accept: 'application/json'
      }
  leaderboards = await res.json()
    } catch (error) {
      console.error(error)
    }
    return (
      <ul>
     leaderboards.map(leaderboard => {
      return <p className="flex flex-col p-4 py-2 bg-gray-200">Hello</p>
    })
      </ul>
    )
  }