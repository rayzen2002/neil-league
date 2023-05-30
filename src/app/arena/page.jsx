'use client'
import { SwordsIcon } from 'lucide-react'
import { useState } from 'react'

export default function Arena() {
  const [inputA, setInputA] = useState('')
  const [inputB, setInputB] = useState('')
  const handleInputAChange = (e) => {
    setInputA(e.target.value)
  }
  const handleInputBChange = (e) => {
    setInputB(e.target.value)
  }
  const handleButton = () => {
    console.log(inputA)
    console.log(inputB)
    setInputA('')
    setInputB('')
  }
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
        onClick={handleButton}
        className=" mx-auto  mt-12 w-36  rounded-lg bg-orange-500 p-4 text-3xl font-bold leading-snug text-blitz-200 hover:bg-red-200"
      >
        DUELAR
      </button>
    </div>
  )
}
