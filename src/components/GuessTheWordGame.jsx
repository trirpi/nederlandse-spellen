import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import easyWords from '../data/easy.json'
import hardWords from '../data/hard.json'

function GuessTheWordGame() {
  const navigate = useNavigate()
  const location = useLocation()
  const { category = 'easy', duration = 60 } = location.state || {}

  const [words] = useState(() => {
    const wordLists = {
      easy: easyWords,
      hard: hardWords
    }
    const list = wordLists[category] || wordLists.easy
    return [...list].sort(() => Math.random() - 0.5)
  })
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState(duration)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [answers, setAnswers] = useState([])
  const [notification, setNotification] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (gameOver || timeLeft <= 0) {
      setGameOver(true)
      navigate('/guess-the-word/results', {
        state: { answers, score, gameSettings: { category, duration } }
      })
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, gameOver, navigate, answers, score])

  useEffect(() => {
    inputRef.current?.focus()
  }, [currentWordIndex])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userAnswer.trim()) return

    const currentWord = words[currentWordIndex]
    const isCorrect = userAnswer.trim().toLowerCase() === currentWord.english.toLowerCase()
    
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    }
    setScore(newScore)

    const newAnswer = {
      dutch: currentWord.dutch,
      english: currentWord.english,
      userAnswer: userAnswer.trim(),
      isCorrect
    }

    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    // Show notification
    setNotification(isCorrect ? 'correct' : 'incorrect')
    setTimeout(() => setNotification(null), 1000)

    // Move to next word or end game
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setUserAnswer('')
    } else {
      // No more words, end game
      setTimeout(() => {
        setGameOver(true)
        navigate('/guess-the-word/results', {
          state: { answers: newAnswers, score: newScore, gameSettings: { category, duration } }
        })
      }, 1000)
    }
  }

  const handleEndGame = () => {
    navigate('/guess-the-word/results', {
      state: { answers, score, gameSettings: { category, duration } }
    })
  }

  if (gameOver) {
    return null
  }

  const currentWord = words[currentWordIndex]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={handleEndGame}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <span className="mr-2">←</span>
            Back to Games
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 relative">
          {/* Score and Timer */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg">
              <span className="font-semibold">Score: </span>
              <span className="text-orange-500">{score.correct}/{score.total}</span>
            </div>
            <div className="text-lg">
              <span className="font-semibold">Time: </span>
              <span className="text-orange-500">{timeLeft}s</span>
            </div>
          </div>

          {/* Notification */}
          {notification && (
            <div
              className={`absolute top-4 right-4 px-4 py-2 rounded-lg text-white font-semibold transition-opacity ${
                notification === 'correct' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {notification === 'correct' ? '✓ Correct!' : '✗ Incorrect'}
            </div>
          )}

          {/* Word Display */}
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-orange-500 mb-4">
              {currentWord.dutch}
            </h2>
            <p className="text-gray-600 text-lg">Type the English translation</p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter English word..."
              className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500 mb-4 text-lg"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Submit Answer
            </button>
          </form>

          {/* End Game Button */}
          <div className="text-right">
            <button
              onClick={handleEndGame}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              End Game Early
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GuessTheWordGame

