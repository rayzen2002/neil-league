'use client'
import { Crown, Skull, SwordsIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Arena() {
  const [inputA, setInputA] = useState('')
  const [inputB, setInputB] = useState('')
  const [playerDataA, setPlayerDataA] = useState('')
  const [playerDataB, setPlayerDataB] = useState('')
  const [enemyName, setEnemyName] = useState('')
  const [name, setName] = useState('')
  const [win, setWin] = useState(0)
  const [lose, setLose] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)

  const [players, setPlayers] = useState([])

  useEffect(() => {
    let fetchedPlayers = []
    let page = 1
    const pageSize = 50

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

  const duelButtonHandle = () => {
    if (!isDataFetched && !isLoading) {
      setIsLoading(true)
      handleButton()
    } else if (isDataFetched) {
      // Reset the data and fetch again when inputs are changed
      setWin(0)
      setLose(0)
      setIsDataFetched(false)
      setIsLoading(true)
      handleButton()
    }
  }

  const handleButton = () => {
    const lowercaseInputA = inputA.toLowerCase();
    const lowercaseInputB = inputB.toLowerCase();
    setEnemyName(inputB.toUpperCase());
    setName(inputA.toUpperCase());
  
    // Define promises for fetching playerA and playerB data
    const fetchPlayerA = new Promise((resolve, reject) => {
      if (players.some((player) => player.nickname.toLowerCase() === lowercaseInputA)) {
        const playerA = players.find((player) => player.nickname.toLowerCase() === lowercaseInputA);
        const playerAFaceitId = playerA.user_id;
        fetch(`https://open.faceit.com/data/v4/players/${playerAFaceitId}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            Accept: 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            resolve(data.steam_id_64);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(`Jogador: ${inputA} nao encontrado`);
      }
    });
  
    const fetchPlayerB = new Promise((resolve, reject) => {
      if (players.some((player) => player.nickname.toLowerCase() === lowercaseInputB)) {
        const playerB = players.find((player) => player.nickname.toLowerCase() === lowercaseInputB);
        const playerBFaceitId = playerB.user_id;
        fetch(`https://open.faceit.com/data/v4/players/${playerBFaceitId}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            Accept: 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            resolve(data.steam_id_64);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(`Jogador: ${inputB} nao encontrado`);
      }
    });
  
    // Wait for both promises to resolve
    Promise.all([fetchPlayerA, fetchPlayerB])
      .then(([playerDataA, playerDataB]) => {
        setPlayerDataA(playerDataA);
        setPlayerDataB(playerDataB);
        setIsDataFetched(true);
      })
      .catch((error) => {
        alert(error);
        setInputA('');
        setInputB('');
        setIsLoading(false);
        setWin(0);
        setLose(0);
        setIsDataFetched(false);
        setPlayerDataA('');
        setPlayerDataB('');
      });
  };
  

  useEffect(() => {
    if (playerDataA && playerDataB) {
      const steamA = convertSteam64ToSteam32(playerDataA);
      const steamB = convertSteam64ToSteam32(playerDataB);
    
      // Fetch matches for playerA
      fetch(`https://api.opendota.com/api/players/${steamA}/matches?api_key=${process.env.NEXT_PUBLIC_API_KEY_OPEN_DOTA}`)
        .then((res) => res.json())
        .then((matchesA) => {
          // Fetch matches for playerB
          fetch(`https://api.opendota.com/api/players/${steamB}/matches?api_key=${process.env.NEXT_PUBLIC_API_KEY_OPEN_DOTA}`)
            .then((res) => res.json())
            .then((matchesB) => {
              // Find matches where playerA and playerB were on opposite teams
              const matchesAgainstEachOther = matchesA.filter((matchA) => {
                return matchesB.some((matchB) => {
                  return matchA.match_id === matchB.match_id &&
                    ((matchA.player_slot < 128 && matchB.player_slot >= 128) || (matchA.player_slot >= 128 && matchB.player_slot < 128));
                });
              });
    
              // Calculate winrate for playerA against playerB
              const winCount = matchesAgainstEachOther.reduce((count, match) => {
                if ((match.player_slot < 128 && match.radiant_win) || (match.player_slot >= 128 && !match.radiant_win)) {
                  return count + 1; // playerA won
                }
                return count; // playerB won
              }, 0);
    
              setWin(winCount);
              setLose(matchesAgainstEachOther.length - winCount);
              setIsDataFetched(true);
            })
            .catch((error) => {
              console.error(`Error fetching matches data for playerB: ${error}`);
            });
        })
        .catch((error) => {
          console.error(`Error fetching matches data for playerA: ${error}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [playerDataA, playerDataB, isDataFetched])
  console.log(`Ganhou: ${win} Perdeu: ${lose}`)

  return (
    <div className="flex flex-col">
      <div className="m-auto mt-14 flex h-2/5 w-2/3 flex-col rounded-xl border-4 border-blitz-200 bg-blitz-400">
        <div className="mx-auto  my-4 flex items-center justify-center gap-8">
          <SwordsIcon className="h-28 w-28 " />
          <h1 className="mt-4  text-center text-6xl font-bold">Arena</h1>
          <SwordsIcon className="h-28 w-28 " />
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
        <span className="text-2xl ">Digite seu nick: </span>
        <input
          onChange={handleInputAChange}
          value={inputA}
          type="text"
          className="rounded-full px-4 text-blitz-200"
        />
        <span className="text-2xl ">Digite nick do ditocujo: </span>
        <input
          onChange={handleInputBChange}
          value={inputB}
          type="text"
          className="rounded-full px-4 text-blitz-200"
        />
      </div>
      <button
        onClick={duelButtonHandle}
        className=" mx-auto  mt-12   w-96  bg-green-800 p-4 text-3xl font-bold leading-snug text-gray-50 hover:bg-red-200"
      >
        {isLoading ? 'LOADING ...' : 'FIND MATCH'}
      </button>
      {isDataFetched && (
        <div className="mx-auto mb-28 mt-12 flex h-full w-2/3 flex-col items-center justify-center rounded-lg border-blitz-400 bg-blitz-400 p-4">
          <div className="text-4xl font-bold text-gray-100 ">
            {(win / (win + lose)) * 100 >= 50 ? (
              <>
                <div className=" flex flex-col items-center gap-4 text-center text-4xl">
                  <div className="flex justify-center gap-4 ">
                    <div className="flex flex-col items-center ">
                      <Crown className="text-green-700" />
                      <span className="text-green-700">{`${name}`}</span>
                    </div>
                    <span className="flex items-end"> Espancou </span>
                    <div className="flex flex-col items-center">
                      <Skull className="text-red-200" />
                      <span className="text-red-200">{`${enemyName} `}</span>
                    </div>
                  </div>
                  <div className="mb-4 flex flex-col gap-4">
                    <span className="flex justify-center text-4xl">
                      na Arena
                    </span>
                  </div>
                  <div className="mx-auto flex w-full flex-col ">
                    <p className="text-2xl text-green-500">
                      Você Ganhou {win} partidas
                    </p>
                    <p className="text-2xl text-red-200">e Perdeu {lose} </p>
                    <p className="text-bold text-3xl text-green-500">
                      Winrate = {((win / (win + lose)) * 100).toFixed(2)} %
                    </p>
                  </div>
                  <span className="mt-4 flex h-20 items-center justify-center border-4 border-blitz-200 bg-blitz-200 p-11 text-2xl">
                    A vitória na Arena é o doce triunfo sobre o inimigo
                    derrotado, uma conquista para compartilhar com os amigos e
                    celebrar juntos.
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className=" flex flex-col items-center gap-4 text-center text-4xl">
                  <div className="flex justify-center gap-4 ">
                    <div className="flex flex-col items-center ">
                      <Crown className="text-green-700" />
                      <span className="text-green-700">{`${enemyName}`}</span>
                    </div>
                    <span className="flex items-end"> Espancou </span>
                    <div className="flex flex-col items-center">
                      <Skull className="text-red-200" />
                      <span className="text-red-200">{`${name} `}</span>
                    </div>
                  </div>
                  <div className="mb-4 flex flex-col gap-4">
                    <span className="flex justify-center text-4xl">
                      na Arena
                    </span>
                  </div>
                  <div className="mx-auto flex w-full flex-col ">
                    <p className="text-2xl text-green-500">
                    Você Ganhou {win} partidas
                    </p>
                    <p className="text-2xl text-red-200">e Perdeu {lose} </p>
                    <p className="text-bold text-3xl text-green-500">
                      Winrate = {((win / (win + lose)) * 100).toFixed(2)} %
                    </p>
                  </div>
                  <span className="mt-4 flex h-20 items-center justify-center border-4 border-blitz-200 bg-blitz-200 p-11 text-2xl">
                    A derrota na Arena é o doce triunfo sobre o inimigo
                    vencedor, uma conquista para compartilhar com os amigos e
                    celebrar juntos.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
