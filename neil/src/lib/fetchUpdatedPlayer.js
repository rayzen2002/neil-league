import axios from 'axios'

export async function fetchUpdatedPlayerData(playerId) {
  try {
    const response = await axios.get(
      `https://open.faceit.com/data/v4/players/${playerId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      },
    )

    // Process the response data
    const { nickname, avatarUrl, email, name } = response.data
    return {
      updatedNickname: nickname,
      updatedAvatarUrl: avatarUrl,
      updatedEmail: email,
      updatedName: name,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
