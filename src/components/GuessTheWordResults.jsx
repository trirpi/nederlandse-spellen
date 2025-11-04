import { useNavigate, useLocation } from 'react-router-dom'

function GuessTheWordResults() {
  const navigate = useNavigate()
  const location = useLocation()
  const { answers = [], score = { correct: 0, total: 0 } } = location.state || {}

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0

  const handlePlayAgain = () => {
    navigate('/guess-the-word/game', {
      state: location.state?.gameSettings || { duration: 60 }
    })
  }

  const handleNewConfiguration = () => {
    navigate('/guess-the-word/settings')
  }

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
        {/* Score Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
          <div className="text-6xl font-bold text-orange-500 mb-2">
            {score.correct}/{score.total}
          </div>
          <div className="text-xl text-gray-700">Accuracy: {accuracy}%</div>
        </div>

        {/* Answers Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Your Answers
            <span className="text-sm font-normal text-gray-500 ml-2">
              (Click to select words for your collection)
            </span>
          </h2>
          
          <div className="space-y-3 mt-4">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg flex items-center justify-between ${
                  answer.isCorrect ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex-1">
                  <span className="font-semibold text-lg">{answer.dutch}</span>
                </div>
                <div className="flex-1 text-right">
                  <span className="text-gray-700">
                    You: {answer.userAnswer}
                    {!answer.isCorrect && (
                      <span className="text-gray-500"> → {answer.english}</span>
                    )}
                  </span>
                </div>
                <div className="ml-4 text-2xl">
                  {answer.isCorrect ? '✓' : '✗'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handlePlayAgain}
            className="flex-1 bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={handleNewConfiguration}
            className="flex-1 bg-white text-gray-700 border-2 border-gray-300 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            New Configuration
          </button>
        </div>
      </main>
    </div>
  )
}

export default GuessTheWordResults

