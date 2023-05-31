'use client'
import { SwordsIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Arena() {
  const [inputA, setInputA] = useState('')
  const [inputB, setInputB] = useState('')
  const [playerDataA, setPlayerDataA] = useState('')
  const [playerDataB, setPlayerDataB] = useState('')
  const [win, setWin] = useState(0)
  const [lose, setLose] = useState(0)
  const [showDuel, setShowDuel] = useState(false)

  const [players, setPlayers] = useState([])

  useEffect(() => {
    let fetchedPlayers = []
    let page = 1
    const pageSize = 100

    const fetchPlayers = () => {
      fetch(
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
        .then((res) => res.json())
        .then((response) => {
          if (response.items.length === 0) {
            setPlayers(fetchedPlayers)
          } else {
            fetchedPlayers = [...fetchedPlayers, ...response.items]
            page++
            fetchPlayers()
          }
        })
        .catch((error) => {
          console.error(`Erro ao fazer requisição: ${error}`)
        })
    }

    fetchPlayers()
  }, []) // Empty dependency array ensures that the effect runs only once
  function convertSteam64ToSteam32(steam64) {
    const steam32Identifier = BigInt('76561197960265728')
    const steam64BigInt = BigInt(steam64)
    const steam32BigInt = steam64BigInt - steam32Identifier
    return steam32BigInt.toString()
  }
  const handleInputAChange = (e) => {
    setInputA(e.target.value)
  }
  const handleInputBChange = (e) => {
    setInputB(e.target.value)
  }
  const createDuel = () => {
    setShowDuel(!showDuel)
  }
  const duelButtonHandle = () => {
    handleButton()
    createDuel()
  }
  const handleButton = () => {
    // playerA data fetching
    if (
      players.some(
        (player) => player.nickname.toLowerCase() === inputA.toLowerCase(),
      )
    ) {
      const playerA = players.filter((player) => player.nickname === inputA)
      const playerAFaceitId = playerA.map((player) => {
        return player.user_id
      })
      console.log(playerAFaceitId)

      fetch(`https://open.faceit.com/data/v4/players/${playerAFaceitId}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          Accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPlayerDataA(data.steam_id_64)
          console.log(playerDataA)
        })
    } else {
      alert(`Jogador: ${inputA} nao encontrado`)
      setInputA('')
    }
    // playerB data fetching
    if (
      players.some(
        (player) => player.nickname.toLowerCase() === inputB.toLowerCase(),
      )
    ) {
      // playerB
      if (
        players.some(
          (player) => player.nickname.toLowerCase() === inputB.toLowerCase(),
        )
      ) {
        const playerB = players.filter((player) => player.nickname === inputB)
        const playerBFaceitId = playerB.map((player) => {
          return player.user_id
        })
        console.log(playerBFaceitId)

        fetch(`https://open.faceit.com/data/v4/players/${playerBFaceitId}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            Accept: 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setPlayerDataB(data.steam_id_64)
            console.log(playerDataB)
          })

        console.log(playerB)
      } else {
        alert(`Jogador: ${inputB} nao encontrado`)
        setInputB('')
      }
    } else {
      alert(`Jogador: ${inputB} nao encontrado`)
      setInputB('')
    }
  }
  useEffect(() => {
    if (playerDataA && playerDataB) {
      const steamA = convertSteam64ToSteam32(playerDataA)
      const steamB = convertSteam64ToSteam32(playerDataB)
      console.log(`Aqui esta: ${playerDataA} B: ${playerDataB}`)
      console.log(`Aqui esta: ${steamA} B: ${steamB}`)
      fetch(
        `https://api.opendota.com/api/players/${steamA}/matches?api_key=${process.env.NEXT_PUBLIC_API_KEY_OPEN_DOTA}&included_account_id=${steamB}&game_mode=2&lobby_type=1`,
      )
        .then((res) => res.json())
        .then((data) => {
          const winCount = data.reduce((count, match) => {
            const playerSlot = match.player_slot
            const radiantWin = match.radiant_win
            const isRadiantPlayer =
              (playerSlot < 128 && radiantWin) ||
              (playerSlot >= 128 && !radiantWin)
            if (isRadiantPlayer) {
              return count + 1
            }
            return count
          }, 0)
          setLose(data.length - win)
          console.log(data.length)
          setWin(winCount)
          console.log(winCount)
        })
        .catch((error) => {
          console.error(`Error fetching matches data: ${error}`)
        })
    }
  }, [playerDataA, playerDataB])
  console.log(`Ganhou: ${win} Perdeu: ${lose}`)

  return (
    <div className="flex flex-col">
      <div className="m-auto mt-14 flex h-2/5 w-2/3 flex-col rounded-xl border-4 border-blitz-200 bg-blitz-400">
        <div className="mx-auto  my-4 flex items-center justify-center">
          <SwordsIcon className="h-28 w-28" />
          <h1 className="mt-4  text-center text-5xl " style={{ color: 'red' }}>
            Arena
          </h1>
        </div>
        <p className="mb-8 px-28 text-2xl">
          Desafie seus amigos e mostre suas verdadeiras conquistas! Cansado de
          ouvir as incessantes proezas de Bigas? Agora é a sua chance de
          silenciar as bravatas e reinar como o verdadeiro campeão nos embates
          diretos da Arena. Entre na competição e deixe todos no grupo
          maravilhados com suas vitorias. A batalha começa agora. Você está
          pronto para conquistar a glória?
        </p>
      </div>
      <div className="mt-14 flex items-center justify-center gap-4">
        <span className="text-xl text-green-600">Digite seu nick: </span>
        <input
          onChange={handleInputAChange}
          value={inputA}
          type="text"
          className="rounded-full px-4 text-blitz-200"
        />
        <span className="text-xl text-orange-500">
          Digite nick do ditocujo:{' '}
        </span>
        <input
          onChange={handleInputBChange}
          value={inputB}
          type="text"
          className="rounded-full px-4 text-blitz-200"
        />
      </div>
      <button
        onClick={duelButtonHandle}
        className=" mx-auto  mt-12 w-36  rounded-lg bg-orange-500 p-4 text-3xl font-bold leading-snug text-blitz-200 hover:bg-red-200"
      >
        DUELAR
      </button>
      {showDuel && win > 0 && (
        <div className="mx-auto mt-12 flex flex-col">
          <h1 className="text-4xl font-bold text-gray-100">Resultado</h1>
          <p className="text-green-500">Ganhou: {win}</p>
          <p className="text-red-200">Perdeu: {lose}</p>
          <p>Winrate : {((win / (win + lose)) * 100).toFixed(2)} %</p>
        </div>
      )}
    </div>
  )
}
