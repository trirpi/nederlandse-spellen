import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import easyWords from '../data/easy.json'
import hardWords from '../data/hard.json'

function GuessTheWordSettings() {
  const navigate = useNavigate()
  const [wordCategory, setWordCategory] = useState('easy')
  const [duration, setDuration] = useState(60)

  const handleStartGame = () => {
    navigate('/guess-the-word/game', {
      state: {
        category: wordCategory,
        duration: duration
      }
    })
  }

  const wordLists = {
    easy: easyWords,
    hard: hardWords
  }
  const wordCount = wordLists[wordCategory]?.length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <span className="mr-2">←</span>
            Back to Games
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">Guess the Word</h1>
        <p className="text-gray-600 mb-8">
          See a Dutch word and type the English translation! Build your Dutch vocabulary through fast-paced practice. Match is case-insensitive.
        </p>

        {/* Game Settings Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-4">
          <h2 className="text-2xl font-bold mb-6">Game Settings</h2>

          {/* Word Category */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">Word Category</label>
            <select
              value={wordCategory}
              onChange={(e) => setWordCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="easy">Easy</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Duration Slider */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">
              Duration: {duration} seconds
            </label>
            <input
              type="range"
              min="30"
              max="180"
              step="10"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>30s</span>
              <span>180s</span>
            </div>
          </div>

          {/* Start Game Button */}
          <button
            onClick={handleStartGame}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
          >
            Start Game
          </button>
        </div>

        <p className="text-gray-500">{wordCount} words available</p>
      </main>
    </div>
  )
}

export default GuessTheWordSettings

