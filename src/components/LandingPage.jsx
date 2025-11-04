import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  const games = [
    {
      id: 'guess-the-word',
      title: 'Guess the Word',
      description: 'Translate Dutch nouns to English - see a Dutch word with its article and type the English meaning.',
      image: '📚',
      available: true
    },
    {
      id: 'numbers-to-words',
      title: 'Numbers to Words Game',
      description: 'See a number and type the Dutch word - perfect for learning Dutch number vocabulary.',
      image: '🔢',
      available: false
    },
    {
      id: 'words-to-numbers',
      title: 'Words to Numbers Game',
      description: 'Practice recognizing Dutch number words and converting them to digits.',
      image: '123',
      available: false
    },
    {
      id: 'dutch-time',
      title: 'Dutch Time Game',
      description: 'Learn to tell time in Dutch by reading analog clocks and typing time expressions.',
      image: '🕐',
      available: false
    },
    {
      id: 'time-short-form',
      title: 'Time Short Form Game',
      description: 'Practice Dutch time with short forms and time expressions.',
      image: '⏰',
      available: false
    },
    {
      id: 'guess-the-artikel',
      title: 'Guess the Artikel',
      description: 'Master Dutch articles (de, het) by guessing the correct artikel for each noun.',
      image: '📝',
      available: false
    }
  ]

  const handleGameClick = (game) => {
    if (game.available) {
      navigate(`/${game.id}/settings`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div>
          <h1 className="text-3xl font-bold text-orange-500">Nederlandse Spellen</h1>
          <p className="text-gray-500 text-sm mt-1">Learn Dutch through fun games</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50">
            Word Resources
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Choose Your Learning Adventure</h2>
          <p className="text-gray-600 text-lg">
            Select a game below and start mastering Dutch in an engaging, interactive way!
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-500">Filter by:</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-200 text-white rounded-lg">Verbs</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Nouns</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Numbers</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Mobile Friendly</button>
            </div>
          </div>
          <span className="text-gray-500">{games.length} games</span>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => handleGameClick(game)}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-transform hover:scale-105 ${
                game.available ? 'hover:shadow-lg' : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="text-6xl mb-4 text-center">{game.image}</div>
              <h3 className="text-xl font-bold mb-2">{game.title}</h3>
              <p className="text-gray-600 text-sm">{game.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default LandingPage

