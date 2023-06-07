import axios from 'axios'
// import { prisma } from './prisma'

export async function fetchMatches() {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    Accept: 'application/json',
  }
  const perPage = 100 // Number of results per page
  let page = 1 // Initial page number
  let allMatches = [] // Array to store all matches

  while (allMatches.length < 1000) {
    const response = await axios.get(
      `https://open.faceit.com/data/v4/hubs/${process.env.NEXT_PUBLIC_HUB_ID}/matches`,
      {
        headers,
        params: {
          offset: (page - 1) * perPage, // Calculate the offset based on the current page
          limit: perPage, // Specify the number of results per page
          status: 'FINISHED',
        },
      },
    )

    const matches = response.data

    // Add the current page's matches to the array
    allMatches = allMatches.concat(matches.items)

    // Break the loop if the current page doesn't contain the maximum number of results
    if (matches.items.length < perPage) {
      break
    }

    // Increment the page number for the next iteration
    console.log(matches)
    console.log(matches.items.length)
    console.log(allMatches.length)
    console.log(`Making the ${page} API CALL`)
    page++
  }
  // const filteredMatchesData = allMatches.filter(
  //   (item) => item.status === 'FINISHED',
  // )
  // const matchesData = filteredMatchesData.map((item) => {
  //   return {
  //     matchId: item.match_id,
  //     players: item.teams.faction1.roster
  //       .map((item) => item.player_id)
  //       .concat(item.teams.faction2.roster.map((item) => item.player_id)),
  //   }
  // })
  return allMatches
}
