'use client'
import { LeaderboardComponent } from '@/components/LeaderboardComponent'
import { Medal } from 'lucide-react'
import { useState } from 'react'

export default function Leaderboards() {
  const [selectedSeason, setSelectedSeason] = useState('')
  const [showLeaderBoard, setShowLeaderBoard] = useState(false)
  const handleSelectChange = (e) => {
    setSelectedSeason(e.target.value)
  }
  const handleButtonClick = (e) => {
    e.preventDefault()

    console.log(selectedSeason)
    setShowLeaderBoard(true)
  }

  return (
    <div>
      <form
        onSubmit={handleButtonClick}
        className="mt-16 flex flex-col items-center justify-center gap-4"
      >
        <div className="flex flex-col items-center gap-2">
          <Medal className="h-14 w-14 text-orange-500" />
          <label
            htmlFor="season"
            className="rounded-full border-4 border-blitz-100 bg-blitz-400 p-4 text-3xl"
          >
            Escolha a temporada
          </label>
        </div>
        <div className="flex gap-4">
          <select
            name="season"
            id="season"
            onChange={handleSelectChange}
            className="text-bold flex items-center justify-center rounded-xl bg-blitz-400 text-center text-xl"
          >
            <option value="general">All time</option>
            <option value="1">Season 1</option>
            <option value="2">Season 2</option>
            <option value="3">Season 3</option>
            <option value="4">Season 4</option>
            <option value="5">Season 5</option>
            <option value="6">Season 6</option>
            <option value="7">Season 7</option>
            <option value="8">Season 8</option>
            <option value="9">Season 9</option>
            <option value="10">Season 10</option>
            <option value="11">Season 11</option>
            <option value="12">Season 12</option>
            <option value="13">Season 13</option>
            <option value="13">Season 14</option>
            <option value="13">Season 15</option>
            {/* Add more options for different seasons */}
          </select>
          <button className="rounded-xl  border-blitz-400 bg-blitz-400 p-2 text-3xl hover:bg-gray-200">
            Mostrar{' '}
          </button>{' '}
        </div>
      </form>

      {/* Assign the handleButtonClick function to the onClick event */}
      {showLeaderBoard ? <LeaderboardComponent season={selectedSeason} /> : ''}
    </div>
  )
}
